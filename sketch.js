let f
let bg
let logo1
let logo2
let g
let p
'use strict';

let n_input, r_input, a_slider,S_slider, I_slider;
function preload(){
  f = loadFont("f.ttf")
  g= loadImage("kembang.png")
  logo1= loadImage("itera.png")
  logo2= loadImage("math.png")
  bg= loadImage("bg.png")
  p=loadImage("pers.png")
}

let n = 14;
let r = 0.00218;
let a = 0.5;
let dt = 1;
let iter = n / dt;

let S = [];
let I = [];
let R = [];
let t = [];

function setup() {
  createCanvas(700, 1300);
  background(0); // Set background color to black
  
  let boxWidth = 600;
  let boxHeight = 400;
  let boxX = (width - boxWidth) / 2;
  let boxY = height - boxHeight - 50; // Draw the box at the bottom
  
  a_input = createInput();
  a_input.position(boxX +20, boxY - 90); 
  a_input.value(a);
  a_input.changed(updateParameters);
  
  n_input = createInput();
  n_input.position(boxX +20, boxY - 30); 
  n_input.value(n);
  n_input.changed(updateParameters);
  
  r_input = createInput();
  r_input.position(boxX+20  , boxY - 60); 
  r_input.value(r);
  r_input.changed(updateParameters);
  
  S_slider = createSlider(0, 1000, 762);
  S_slider.position(boxX +280, boxY - 60); 
  S_slider.style('width', '100px');
  S_slider.input(updateGraph);
  
  I_slider = createSlider(0, 100, 1);
  I_slider.position(boxX  + 280, boxY - 30); 
  I_slider.style('width', '100px');
  I_slider.input(updateGraph);

  updateGraph(); // memanggil fungsi update graph
}

function updateParameters() {
  n = parseFloat(n_input.value());
  r = parseFloat(r_input.value());
  a = parseFloat(a_input.value());
  
  iter = n / dt;
  updateGraph();
}

function updateGraph() {
  let S_val = S_slider.value();
  let I_val = I_slider.value();
  
  S = [];
  I = [];
  R = [];
  t = [];
  
  S.push(S_val);
  I.push(I_val);
  R.push(0);
  t.push(0);
  
  for (let i = 0; i < iter - 1; i++) {
    let t_new = t[i] + dt;
    t.push(t_new);
    let S_new = S[i] - r * S[i] * I[i] * dt;
    S.push(S_new);
    let I_new = I[i] + (r * S[i] * I[i] - a * I[i]) * dt;
    I.push(I_new);
    let R_new = R[i] + a * I[i] * dt;
    R.push(R_new);
  }
  
  redraw(); // Redraw the graph after slider values change
}

function draw() {
  // Set background color to black
  background(0);
  stroke("white")
  
  image(bg,0,0,700,400)
  image(g,-80+windowWidth/2,130,165,115)
  image(logo1,640,8,50,50)
  image(logo2,580,5,58,58)
  image(p,240,510,200,60)
  
  textSize(40)
  textStyle(BOLD)
  fill("black")
  textFont(f)
  text("SIMULASI SIR",windowWidth/2,70)
  
  textSize(25)
  text("SUSPECTIBLE-INFECTED-RECOVERED",windowWidth/2,110)
  
  textSize(18)
  stroke("white")
  fill("black")
  text("Anggota Kelompok 8: ",windowWidth/2,260)
 
  textSize(15)
  text("mata kuliah: visualisasi dalam sains",150,10)
  text("Anggi Sephia Febriyani-122160018 ",windowWidth/2,290)
  text("Nazwa Wulan Dini-122160020 ",windowWidth/2,306)
  text("Imelda Nurul Alfiah-122160025 ",windowWidth/2,322)
  text("Melza Kurnia Fadhila-122160026 ",windowWidth/2,338)
  text("Fauziah Ana Nabila-122160027 ",windowWidth/2,354)
  text("Matematika-itera",windowWidth/2,375)
  
  fill("white")
  noStroke()
  textWrap(WORD);
  textAlign(CENTER)
  text("Simulasi SIR merupakan model matematika yang membagi populasi menjadi kelompok rentan terhadap infeksi suatu penyakit(Suspectible), kelompok individu terinfeksi(Infective), dan kelompok individu sembuh dari infeksi(Recovered). persamaan beda dari model SIR diatas adalah: ", 20,455,660)
  text("dengan n sebagai panjang simulasi, S sebagai nilai populasi yang tidak memiliki imunitas dari penyakit(Susceptible), I sebagai nilai populasi yang memiliki penyakit dan berpotensi menularkan(Infected), R sebagai nilai populasi yang telah menjalani pemulihan dari penyakit dan memiliki imunitas untuk infeksi selanjutnya(Recovered), r sebagai konstanta transmisi penularan dan a sebagai konstanta laju recovery",20,630,660)
  text("Berikut merupakan hasil simulasi dengan nilai awal masing-masing yakni a=0.5, r=0.00218, n=14, S=762, I=1, dan R=0",40,720,600)
  
  let yOffset = 100; // Vertical offset for centering the graphs
  
  // Draw box
  let boxWidth = 600;
  let boxHeight = 400;
  let boxX = (width - boxWidth) / 2;
  let boxY = height - boxHeight - 50; // Draw the box at the bottom
  noFill();
  stroke(255);
  rect(boxX, boxY, boxWidth, boxHeight);
  
  // label sumbu y
  fill(255);
  textAlign(RIGHT, CENTER);
  textSize(12);
  for (let i = 0; i <= 1000; i += 100) {
    let yLabel = map(i, 0, 1000, boxY + boxHeight, boxY);
    text(round(i), boxX - 5, yLabel);
    stroke(100);
    line(boxX - 3, yLabel, boxX + 3, yLabel); 
  }

  // label sumbu x
  textAlign(CENTER, TOP);
  for (let i = 0; i < iter; i += 1) {
    let xLabel = map(i, 0, iter , boxX, boxX + boxWidth);
    text(round(t[i]), xLabel, boxY + boxHeight + 5);
    stroke(100);
    line(xLabel, boxY + boxHeight, xLabel, boxY + boxHeight + 6); 
  }

  // gambar kisi pada box
  stroke(100); 
  for (let i = 0; i <= 1000; i += 100) {
    let y = map(i, 0, 1000, boxY + boxHeight, boxY);
    line(boxX, y, boxX + boxWidth, y); // garis horizontal
  }
  for (let i = 0; i < iter; i += 2) {
    let x = map(i, 0, iter - 1, boxX, boxX + boxWidth);
    line(x, boxY, x, boxY + boxHeight); // garis vertikal
  }

  // grafik dalam box
  stroke(255, 0, 0); // Red for Susceptibles
  drawGraph(S, boxX, boxY, boxWidth, boxHeight, 'Susceptibles');
  
  stroke(0, 255, 0); // Green for Infectious
  drawGraph(I, boxX, boxY, boxWidth, boxHeight, 'Infectious');
  
  stroke(0, 0, 255); // Blue for Recovereds
  drawGraph(R, boxX, boxY, boxWidth, boxHeight, 'Recovereds');
  
  // legend
 textSize(14);
  textAlign(LEFT, TOP);
  fill(255);
  textSize(12);
  fill(255, 0, 0);
  text("Susceptibles", boxX + 10, boxY + 10);
  fill(0, 255, 0);
  text("Infectious", boxX + 10, boxY + 30);
  fill(0, 0, 255);
  text("Recovereds", boxX + 10, boxY + 50);
  
  // Display nilai dari slider
  fill(255);
  textSize(16);
  text("Susceptibles: " + S_slider.value(), S_slider.x  + S_slider.width+10, S_slider.y );
  text("Infectious: " + I_slider.value(), I_slider.x  + I_slider.width+10, I_slider.y);

  // Display nilai dari input
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(18);
  text("n:", n_input.x -10, n_input.y + 7);
  text("r:", r_input.x -10, r_input.y + 7);
  text("a:", a_input.x -10, a_input.y + 7);
}
  
function drawGraph(data, boxX, boxY, boxWidth, boxHeight, label) {
  beginShape();
  
  noFill();
  for (let i = 0; i < iter; i++) {
    
    let x = map(i, 0, iter - 1, boxX, boxX + boxWidth);
    let y = map(data[i], 0, 1000, boxY + boxHeight, boxY);
   
    if (x >= boxX && x <= boxX + boxWidth && y >= boxY && y <= boxY + boxHeight) {
      vertex(x, y);
    }
  }
  endShape();
}
