---

---




## AI4Health Lab
The AI4Health Lab, in the School of Information Communication and Technology at Griffith University, stands at the forefront of AI applications in the biomedical and health fields. Committed to excellence and innovation, we strive to address major challenges in contemporary medicine and public health through the deep integration of AI and health sciences. Our research spans computational pathology, computational neuroscience, computational microscopy imaging, bio-health multimodal data integration, deep learning paradigms, and trustworthy AI for healthcare. We are dedicated to tackling core challenges in precision and intelligent medicine, enhancing the accuracy of disease diagnosis, optimizing personalized treatment plans, and advancing the fairness and explainability of medical decisions. With our interdisciplinary research team and exceptional innovation capabilities, the AI4Health Lab aims to become a global leader in AI and health research. We believe that artificial intelligence will reshape the future of healthcare, and we are committed to leading this transformation, ushering in a new era of technological advancement and human well-being.


<div id="p5-sketch"></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
<script>
let sections = [];
let cx, cy, r1x, r1y, r2x, r2y, canvas;
let hoveredIndex = -1;
let w_width,w_height;
let img_logo;

function preload() {
  // Load the image
  img_logo = loadImage('/img/Lab_logo_v2.svg');
}

function setup() {
  w_width = windowWidth>1000 ? 1000 : windowWidth*0.8;
  w_height = windowHeight>600 ? 600 : windowHeight*0.8;
  canvas = createCanvas(w_width, w_height); // Adjust the canvas size
  canvas.parent('p5-sketch');
//centerCanvas();
  angleMode(DEGREES); // 使用度数为单位的角度
  textAlign(CENTER, CENTER);
  // noLoop(); // 只在需要时重绘
  updateCenterAndRadii(); // 更新中心点和半径
  
  cx = width / 2;
  cy = height / 2;
  r1x = 130; // 内椭圆的x轴半径
  r1y = 70;  // 内椭圆的y轴半径
  r2x = 380; // 外椭圆的x轴半径
  r2y = 220; // 外椭圆的y轴半径

  sections = [
    { label: "Deep learning paradigms", color: '#C0504D', start: 0, end: 50, url: "../pages/c_paradigms" },
    { label: "Multimodal data integration", color: '#8064A2', start: 50, end: 130, url: "../pages/c_multimodal" },
    { label: "Trustworthy AI for healthcare", color: '#F79646', start: 130, end: 180, url: "../pages/c_trustAI" },
    { label: "Computational microscopy", color: '#9BBB59', start: 180, end: 230, url: "../pages/c_micro" },
    { label: "Computational histopathology", color: '#5A9BD3', start: 230, end: 310, url: "../pages/c_hist" },
    { label: "Computational neuroscience", color: '#4BACC6', start: 310, end: 360, url: "../pages/c_neru" },
  ];
  
  setInterval(function() {
    mouseMoved();
  }, 100);

}

function draw() {
  clear(); 
translate(0, -35);
  for (let i = 0; i < sections.length; i++) {
    let isHovered = (i === hoveredIndex); 
    let scaleFactor = isHovered ? 1.2 : 1.0;
    let adjustedR2x = r2x * scaleFactor;
    let adjustedR2y = r2y * scaleFactor;
    textSize(17 * scaleFactor); 
    fill(sections[i].color);
    arc(cx, cy, adjustedR2x * 2, adjustedR2y * 2, sections[i].start, sections[i].end, PIE);
    fill(0);
    let angle = (sections[i].start + sections[i].end) / 2;
    let x = cx + adjustedR2x * 0.7 * cos(angle);
    let y = cy + adjustedR2y * 0.7 * sin(angle);
    text(sections[i].label, x, y);
  }

  // 绘制中心的椭圆
  fill('#4472C4'); // 专业的深蓝色
  ellipse(cx, cy, r1x * 2, r1y * 2);
  fill(255);
  textSize(20);
  //text("AI4Health", cx, cy);
    // Calculate the aspect ratio of the image
  let aspectRatio = img_logo.height / img_logo.width;

  let imgWidth = 200;
  // Set height based on the aspect ratio to maintain proportions
  let imgHeight = imgWidth * aspectRatio;

  // Replace text with the image, center it
  imageMode(CENTER);
  image(img_logo, cx, cy, imgWidth, imgHeight); // Draw the i
}

function mouseMoved() {
 updateHoveredSection();
}

function mousePressed() {
  if (hoveredIndex !== -1) {
    window.open(sections[hoveredIndex].url);
    
  }

}

function updateHoveredSection(){
  
  let dx = mouseX - cx;
  let dy = mouseY - cy;

  // 计算相对中心的角度（以度为单位）
  let angle = atan2(dy, dx); // 弧度转度
  if (angle < 0) angle += 360;

  // 归一化鼠标位置距离（用于椭圆）
  let factor_inner = sqrt((dx * dx) / (r2x * r2x) + (dy * dy) / (r2y * r2y));
  
  let factor_outer = sqrt((dx * dx) / (r1x * r1x) + (dy * dy) / (r1y * r1y));

  hoveredIndex = -1; // 默认没有悬停在任何部分

  // 如果鼠标在外椭圆内且不在内椭圆内，检查悬停部分
  if (factor_inner <= 1 && factor_outer >1) {
    for (let i = 0; i < sections.length; i++) {
      if (angle >= sections[i].start && angle < sections[i].end) {
        hoveredIndex = i; // 更新悬停索引
        break;
      }
    }
  }
} 

function windowResized() {
  w_width = windowWidth>1000 ? 1000 : windowWidth*0.8;
  w_height = windowHeight>600 ? 600 : windowHeight*0.8;

  resizeCanvas(w_width, w_height); // 调整画布大小
  //centerCanvas();
  updateCenterAndRadii(); // 更新中心点和半径
  
}

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  canvas.position(x, y);
}

function updateCenterAndRadii() {
  cx = width / 2;
  cy = height / 2;
  r1x = width * 0.15; // 根据页面宽度动态设置内椭圆的x轴半径
  r1y = height * 0.1; // 根据页面高度动态设置内椭圆的y轴半径
  r2x = width * 0.35; // 根据页面宽度动态设置外椭圆的x轴半径
  r2y = height * 0.3; // 根据页面高度动态设置外椭圆的y轴半径
}

</script>

