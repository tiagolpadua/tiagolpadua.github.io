//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 13;
let raio = diametro / 2;
let jogarDe2 = true;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;
let jogadorComprimento = 10;
let jogadorAltura = 50;

//variáveis do jogador
let xZagueiro = 75;
let xAtacante = 400;
let yJogador = 150;
let corJogador;

//variáveis do oponente
let xZagueiroOponente = 525;
let xAtacanteOponente = 200;
let yOponente = 150;
let velocidadeYOponente;
let corOponente;

// variáveis do gol
let xGol = 2;
let yGol = 150;
let xGolOponente = 596;
let golLargura = 2;
let golAltura = 100;

let colidiu = false;

let fezGol = false;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo
let ponto;
let chute;
let trilha;

let chanceDeErrar = 0;

function preload() {
  trilha = loadSound("trilha.mp3");
  chute = loadSound("raquetada.mp3");
  ponto = loadSound("ponto.mp3");
}

function setup() {
  createCanvas(600, 400);
  corJogador = color(0, 255, 0);
  corOponente = color(255, 0, 0);
  // trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraJogador(xZagueiro, yJogador, corJogador);
  mostraJogador(xAtacante, yJogador, corJogador);

  mostraGol(xGol, yGol);

  movimentaMeuJogador();
  verificaColisaoJogador(xZagueiro, yJogador);
  verificaColisaoJogador(xAtacante, yJogador);
  mostraJogador(xZagueiroOponente, yOponente, corOponente);
  mostraJogador(xAtacanteOponente, yOponente, corOponente);

  mostraGol(xGolOponente, yGol);

  movimentaJogadoresOponente();
  verificaColisaoJogador(xZagueiroOponente, yOponente);
  verificaColisaoJogador(xAtacanteOponente, yOponente);
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
  if (xBolinha + raio > width ||
    xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height ||
    yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}

function mostraJogador(x, y, cor) {
  fill(cor);
  rect(x, y, jogadorComprimento,
    jogadorAltura);
}

// Código novo
function mostraGol(x) {
  fill(color(255, 0, 0));
  rect(x, yGol, golLargura, golAltura);
}

function movimentaMeuJogador() {
  if (keyIsDown(UP_ARROW)) {
    yJogador -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yJogador += 10;
  }
}

function verificaColisaoJogador(x, y) {
  colidiu = collideRectCircle(x, y, jogadorComprimento, jogadorAltura,
    xBolinha, yBolinha, raio);
  if (colidiu) {
    velocidadeXBolinha *= -1;
    // raquetada.play();
  }
}

function movimentaJogadoresOponente() {
  if (jogarDe2) {
    if (keyIsDown(87)) {
      yOponente -= 10;
    }
    if (keyIsDown(83)) {
      yOponente += 10;
    }
  } else {
    velocidadeYOponente = yBolinha - yOponente - jogadorComprimento / 2 - 30;
    yOponente += velocidadeYOponente + chanceDeErrar
    calculaChanceDeErrar()
  }
}

function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39) {
      chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35) {
      chanceDeErrar = 35
    }
  }
}

function incluiPlacar() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosDoOponente, 470, 26);
}

function marcaPonto() {
  fezGol = collideRectCircle(xGol, yGol, golLargura, golAltura,
    xBolinha, yBolinha, raio);

  if (fezGol) {
    meusPontos += 1;
    xBolinha = 300;
    yBolinha = 200;
    // ponto.play();
  }

  fezGol = collideRectCircle(xGolOponente, yGol, golLargura, golAltura,
    xBolinha, yBolinha, raio);
  if (fezGol) {
    pontosDoOponente += 1;
    xBolinha = 300;
    yBolinha = 200;
    // ponto.play();
  }
}