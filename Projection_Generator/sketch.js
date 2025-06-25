let img;
let slider;
let sliderValueDisplay;
let fileInput;
let currentVal = 5;
let intervalID = null;

let exportFrames = [];
let zipExporter = new JSZip();

function preload() {
  // Load default image
  img = loadImage("land.jpg", (loadedImg) => {
    // let scale = 1080 / loadedImg.width;
    // loadedImg.resize(1080, loadedImg.height * scale); // Maintain aspect ratio
  });
}

function setup() {
  // Create canvas and UI
  const canvas = createCanvas(img.width, img.height);
  canvas.parent("canvas-container");
  noStroke();
  ellipseMode(RADIUS);
  noLoop(); // Controlled draw cycle

  // Slider setup
  slider = select("#sampleSlider");
  sliderValueDisplay = select("#sliderValue");

  slider.input(() => {
    sliderValueDisplay.html(slider.value() - 5); 
    redraw(); 
  });

  // Randomize button
  select("#Randomize").mousePressed(redraw);

  // File upload
  fileInput = createFileInput(handleFile);
  fileInput.hide();

  select(".upload").mousePressed(() => {
    fileInput.elt.click();
  });

  // Animate button: start/stop animation
  const anim = select("#Animate");
  anim.mousePressed(() => {
    if (intervalID === null) {
      currentVal = 5;
      startSliderAnimation(anim);
      anim.html("Reset");
    } else {
      clearInterval(intervalID);
      intervalID = null;
      slider.value(5);
      anim.html("Animate");
    }
  });

  // Export ZIP button
  select("#Export").mousePressed(() => {
    if (intervalID === null) {
      exportSliderAnimation();
    }
  });
}

// Handle image upload
function handleFile(file) {
  if (file.type === 'image') {
    loadImage(file.data, (loadedImg) => {
      let scale = 1080 / loadedImg.width;
      loadedImg.resize(1080, loadedImg.height * scale);
      img = loadedImg;
      resizeCanvas(img.width, img.height);
      redraw();
    });
  } else {
    alert("Please upload a valid image file.");
  }
}

// Animate slider for live visualization
function startSliderAnimation(animButton) {
  intervalID = setInterval(() => {
    slider.value(currentVal);
    sliderValueDisplay.html(currentVal - 5);
    if ((currentVal / 2) % 1 === 0) {
      redraw();
    }
    currentVal++;
    if (currentVal > 125) {
      clearInterval(intervalID);
      intervalID = null;
      animButton.html("Animate");
    }
  }, 100);
}

// Export all frames into a ZIP file
function exportSliderAnimation() {
  currentVal = 5;
  exportFrames = [];
  zipExporter = new JSZip();
  let frameNum = 0;

  const progressBar = select("#progressBar");
  const totalFrames = Math.floor((125 - 5) / 2) + 1;

  progressBar.elt.style.display = "block";
  progressBar.attribute("max", totalFrames);
  progressBar.value(0);

  intervalID = setInterval(() => {
    slider.value(currentVal);
    sliderValueDisplay.html(currentVal - 5);

    if ((currentVal / 2) % 1 === 0) {
      redraw();

      setTimeout(() => {
        let dataURL = canvas.toDataURL("image/png");
        zipExporter.file(`frame_${nf(frameNum, 3)}.png`, dataURL.split(',')[1], { base64: true });

        frameNum++;
        progressBar.value(frameNum);

        if (currentVal >= 125) {
          clearInterval(intervalID);
          intervalID = null;

          // Trigger ZIP download
          zipExporter.generateAsync({ type: "blob" }).then((content) => {
            saveAs(content, "star_animation.zip");
            progressBar.elt.style.display = "none";
            progressBar.value(0);
          });
        }
      }, 50);
    }

    currentVal++;
  }, 300);
}

// Star drawing function
function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

// Main drawing loop
function draw() {
  background(0);
  let g = slider.value();

  for (let i = g / 2; i < width; i += parseInt(g)) {
    for (let j = g / 2; j < height; j += parseInt(g)) {
      let pixColor = img.get(i, j);
      fill(pixColor);
      let rad = random(g * 0.01, g * 1);
      let angle = random(TWO_PI);

      push();
      translate(i, j);
      rotate(angle);
      star(0, 0, rad, 2 * rad, 5);
      pop();
    }
  }
}
