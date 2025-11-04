let canvas;
let w_width = 700;
let w_height = 400;

let cx = w_width * 0.5;
let cy = w_height * 0.5;

let half_w = w_width * 0.5;
let half_h = w_height * 0.5;
let icon_size = 120;
let logo_size = 300;
let hoveredIndex = -1;
let clockAngles = [0, 0, 45, 180 - 45, 180, 180 + 45, 0 - 45];

let logoHovered = false;

let sections = [
  {
    label: "AI4Health",
    url: "1_research.html#page_top",
    iconPath: "img/icons/Ai4Health_.png"
  },

  {
    label: "Foundational Vision and Learning Systems",
    url: "1_research_foundation.html",
    iconPath: "img/icons/deeplearning.png"
  },
  {
    label: "Medical Visual Language AI",
    url: "1_research_multimodal.html",
    iconPath: "img/icons/med-vlm.png"
  },
  {
    label: "Trustworthy AI for Healthcare",
    url: "1_research_trustAI.html",
    iconPath: "img/icons/trustworthy.png"
  },
  {
    label: "Computational Microscopy",
    url: "1_research_micro.html",
    iconPath: "img/icons/microscopy.png"
  },
  {
    label: "Computational Histopathology",
    url: "1_research_hist.html",
    iconPath: "img/icons/histopathology.png"
  },
  {
    label: "Computational Neuroscience",
    url: "1_research_neru.html",
    iconPath: "img/icons/neuroscience.png"
  }
];

function preload() {
  for (let i = 0; i < sections.length; i++) {
    sections[i].icon = loadImage(sections[i].iconPath);
  }
}

function setup() {
  canvas = createCanvas(w_width, w_height);
  canvas.parent("p5-sketch");
  canvas.style('display', 'block');
  canvas.style('margin', '0 auto');

  angleMode(DEGREES);
  textAlign(CENTER, CENTER);
  imageMode(CENTER);

  setInterval(() => mouseMoved(), 100);
}


function draw() {
  clear();
  let x, y;

  for (let i = 0; i < sections.length; i++) {
    let angle = clockAngles[i];
    let isHovered = i === hoveredIndex;
    let scaleFactor = isHovered ? 1.1 : 1.0;

    if (i == 0) {
      x = cx;
      y = cy;
      img_size = logo_size;
    }
    else {
      x = cx + half_w * 0.78 * cos(angle);
      y = cy + half_h * 0.78 * sin(angle);
      img_size = icon_size;
    }

    let img = sections[i].icon;
    if (img) {
      let aspect = img.width / img.height;
      let imgH = img_size * scaleFactor;
      let imgW = imgH * aspect;
      image(img, x, y, imgW, imgH);

      // // optional label
      // fill(50);
      // noStroke();
      // textSize(14);
      // text(sections[i].label, x, y + imgH * 0.6);
    }
  }

}

function updateHoveredSection() {
  hoveredIndex = -1;
  let x, y, threshold;

  for (let i = 0; i < sections.length; i++) {
    let angle = clockAngles[i];

    if (i == 0) {
      x = cx;
      y = cy;
      threshold = logo_size * 0.5;
    }
    else {
      x = cx + half_w * 0.78 * cos(angle);
      y = cy + half_h * 0.78 * sin(angle);
      threshold = icon_size * 0.5;
    }
    if (dist(mouseX, mouseY, x, y) < threshold) {
      hoveredIndex = i;
      break;
    }

  }
}


function mouseMoved() {
  updateHoveredSection();
}

function mousePressed() {
  // 点击图标
  if (hoveredIndex !== -1) {
    window.location.href = sections[hoveredIndex].url;
    return;
  }

  // 点击中间 logo
  if (img_logo) {
    let ar = img_logo.height / img_logo.width;
    let logoW = img_logo_size;
    let logoH = logoW * ar;

    // 判断鼠标是否落在 logo 区域
    if (
      mouseX >= cx - logoW / 2 &&
      mouseX <= cx + logoW / 2 &&
      mouseY >= cy - logoH / 2 &&
      mouseY <= cy + logoH / 2
    ) {
      // 跳转到页面顶部锚点
      window.location.href = "1_research.html#page_top";
    }
  }
}

function windowResized() {
  resizeCanvas(w_width, w_height);
  updateCenterAndRadii();
}

