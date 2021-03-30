//variáves da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro /2;

//velocidade da bolinha
let velocidadeXBolinha = 5;
let velocidadeYBolinha = 5;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let wRaquete = 10;
let hRaquete = 70;

//variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

let chanceDeErrar = 0;

//sons do jogo
let raquetada;
let meuPonto;
let pontoOponente;
let trilha;


function preload(){
  trilha = loadSound("trilha.wav")
  meuPonto = loadSound("ponto.wav")
  pontoOponente = loadSound("pontooponente.wav")
  raquetada = loadSound("raquetada.wav")
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente)
  incluiPlacar();
 marcaPonto();
  calculaChanceDeErrar();
  

}
function mostraBolinha(){
  circle(xBolinha,yBolinha,diametro);
}
function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}
function verificaColisaoBorda(){
  if (xBolinha + raio > width ||
     xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height ||
     yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}
function mostraRaquete(x, y){
  rect(x, y, wRaquete, hRaquete);
}
function movimentaMinhaRaquete(){
  if(keyIsDown(UP_ARROW)){
     yRaquete -= 10;
     }
  if(keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

function verificaColisaoRaquete(x, y){
  colidiu =
collideRectCircle(x, y, wRaquete, hRaquete, xBolinha, yBolinha, raio);
  if(colidiu){
    velocidadeXBolinha *= -1
    raquetada.play();
  }
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - wRaquete /2 - 35;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar();
}
function incluiPlacar(){
  stroke(255)
  textAlign(CENTER)
  textSize(20)
  fill(color(255, 140, 0))
  rect(150, 10, 40, 20)
  fill(255)
  text(meusPontos, 170, 26)
  fill(color(255, 140, 0))
  rect(450, 10, 40, 20)
  fill(255)
  text(pontosOponente, 470, 26)
}
function marcaPonto(){
  if(xBolinha > 590){
    meusPontos += 1
    meuPonto.play();
  }
  if(xBolinha < 10){
    pontosOponente += 1
    pontoOponente.play();
  }
}
function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}
