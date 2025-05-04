let cx, cy, r1x, r1y, r2x, r2y, canvas;
let hoveredIndex = -1;
let w_width, w_height;
let img_logo;
let clockAngles = [0, 40, 180 - 40, 180, 180 + 40, 270 + 50];

let logoHovered = false;

let sections = [
  {
    label: "Deep Learning Paradigms",
    url: "1_research.html#c_paradigms",
    iconPath: "img/icons/deeplearning.png"
  },
  {
    label: "Multimodal Data Integration",
    url: "1_research.html#c_multimodal",
    iconPath: "img/icons/med-vlm.png"
  },
  {
    label: "Trustworthy AI for Healthcare",
    url: "1_research.html#c_trustAI",
    iconPath: "img/icons/trustworthy.png"
  },
  {
    label: "Computational Microscopy",
    url: "1_research.html#c_micro",
    iconPath: "img/icons/microscopy.png"
  },
  {
    label: "Computational Histopathology",
    url: "1_research.html#c_hist",
    iconPath: "img/icons/histopathology.png"
  },
  {
    label: "Computational Neuroscience",
    url: "1_research.html#c_neru",
    iconPath: "img/icons/neuroscience.png"
  }
];

function preload() {
  img_logo = loadImage("img/icons/Ai4Health_.png");
  for (let i = 0; i < sections.length; i++) {
    sections[i].icon = loadImage(sections[i].iconPath);
  }
}

function setup() {
  w_width = windowWidth > 600 ? 600 : windowWidth * 0.9;
  w_height = windowHeight > 600 ? 600 : windowHeight * 0.9;
  canvas = createCanvas(w_width, w_height);
  canvas.parent("p5-sketch");

  angleMode(DEGREES);
  textAlign(CENTER, CENTER);
  imageMode(CENTER);

  updateCenterAndRadii();

  setInterval(() => mouseMoved(), 100);
}
function draw() {
  clear();

  for (let i = 0; i < sections.length; i++) {
    let angle = clockAngles[i];
    let isHovered = i === hoveredIndex;
    let scaleFactor = isHovered ? 1.2 : 1.0;

    let x = cx + r2x * 0.75 * cos(angle);
    let y = cy + r2y * 0.75 * sin(angle);

    let img = sections[i].icon;
    if (img) {
      let aspect = img.width / img.height;
      let imgH = 130 * scaleFactor;
      let imgW = imgH * aspect;
      image(img, x, y, imgW, imgH);

      // // optional label
      // fill(50);
      // noStroke();
      // textSize(14);
      // text(sections[i].label, x, y + imgH * 0.6);
    }
  }

  // draw center logo
  if (img_logo) {
    let ar = img_logo.height / img_logo.width;
    let logoW = 300;
    if (logoHovered) {
      logoW *= 1.1;  // 放大 1.2 倍
    }
    let logoH = logoW * ar;
    image(img_logo, cx, cy, logoW, logoH);
  }

}

function updateHoveredSection() {
  hoveredIndex = -1;
  for (let i = 0; i < sections.length; i++) {
    let angle = clockAngles[i];
    let x = cx + r2x * 0.75 * cos(angle);
    let y = cy + r2y * 0.75 * sin(angle);
    if (dist(mouseX, mouseY, x, y) < 60) {
      hoveredIndex = i;
      break;
    }
  }
}

function updateHoveredLogo() {
  logoHovered = false;
  if (img_logo) {
    let ar = img_logo.height / img_logo.width;
    let logoW = 300;
    let logoH = logoW * ar;
    if (
      mouseX >= cx - logoW / 2 &&
      mouseX <= cx + logoW / 2 &&
      mouseY >= cy - logoH / 2 &&
      mouseY <= cy + logoH / 2
    ) {
      logoHovered = true;
    }
  }
}


function mouseMoved() {
  updateHoveredSection();
  updateHoveredLogo();
}

function mousePressed() {
  // 点击图标
  if (hoveredIndex !== -1) {
    window.location.href = sections[hoveredIndex].url;
    //   window.open(sections[hoveredIndex].url, "_blank");
    return;
  }

  // 点击中间 logo
  if (img_logo) {
    let ar = img_logo.height / img_logo.width;
    let logoW = 300;
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
  w_width = windowWidth > 600 ? 600 : windowWidth * 0.9;
  w_height = windowHeight > 600 ? 600 : windowHeight * 0.9;
  resizeCanvas(w_width, w_height);
  updateCenterAndRadii();
}

function updateCenterAndRadii() {
  cx = width / 2;
  cy = height / 2;
  r1x = width * 0.15;
  r1y = height * 0.15;
  r2x = width * 0.5;
  r2y = height * 0.5;
}
