'use strict';

var coords = [[230, 40, 260, 30],
  [275, 5, 290, 30],
  [310, -5, 330, 30],
  [350, -5, 370, 30],
  [390, -5, 410, 30],
  [430, -5, 450, 30],
  [465, 5, 480, 30],
  [500, 45, 480, 60],
  [520, 85, 480, 105],
  [520, 135, 480, 155],
  [520, 185, 480, 205],
  [520, 235, 480, 255],
  [500, 270, 480, 280],
  [470, 300, 460, 280],
  [430, 320, 415, 280],
  [390, 320, 370, 280],
  [350, 320, 330, 280],
  [310, 320, 290, 280],
  [270, 310, 250, 280],
  [230, 265, 250, 250],
  [210, 225, 250, 205],
  [210, 185, 250, 165],
  [210, 145, 250, 125],
  [210, 105, 250, 85],
  [220, 65, 250, 55]];
var CLOUD_START_X = 250;
var CLOUD_START_Y = 55;
var GAP = 10;
var WIN_FIRST_LINE_X = 290;
var WIN_FIRST_LINE_Y = 25;
var LINE_HEIGHT = 20;
var PLAYER_NAME_Y = 250;
var BAR_WIDTH = 40;
var BAR_HEIGHT = -150;
var RESULT_GAP = 25;
var MIN_OPACITY = 0.1;
var CLOUD_COLOR = 'rgba(0, 0, 0, 0.7)';
var COLOR_WHITE = '#fff';
var COLOR_BLACK = 'black';
var COLOR_RED = 'rgba(255, 0, 0, 1)';
var cloudColors = [CLOUD_COLOR, COLOR_WHITE];
var FONT_STYLE = '16px Mono';

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var getMinMaxRandom = function (max) {
  var randomNumber = Math.random() * max;

  return randomNumber;
};

window.renderStatistics = function (ctx, names, times) {
  // Выравниваем размер массивов с кол-ом игроков и временем
  if (times.length > names.length) {
    times.length = names.length;
  } else {
    names.length = times.length;
  }

  // Рисует контуры тени облака и облака
  var renderCloud = function (figure, offset, renderColor) {

    ctx.beginPath();
    ctx.moveTo(CLOUD_START_X - offset, CLOUD_START_Y - offset);
    for (var i = 0; i < figure.length; i++) {
      var mas = figure[i];
      var coordX = mas[0];
      var coordY = mas[1];
      var coordWidth = mas[2];
      var coordHeigth = mas[3];
      ctx.quadraticCurveTo(coordX - offset, coordY - offset, coordWidth - offset, coordHeigth - offset);
    }
    ctx.fillStyle = renderColor;
    ctx.fill();
  };

  for (i = 0; i < cloudColors.length; i++) {
    renderCloud(coords, 10 * i, cloudColors[i]);
  }

  // Заголовок в таблице результатов
  var TEXT_TITLE = ['Ура вы победили!', 'Список результатов:'];

  var writeTitle = function (arr) {
    for (i = 0; i < arr.length; i++) {
      ctx.fillStyle = COLOR_BLACK;
      ctx.font = FONT_STYLE;
      ctx.textBaseline = 'hanging';
      ctx.fillText(arr[i], WIN_FIRST_LINE_X, WIN_FIRST_LINE_Y + LINE_HEIGHT * i);
    }
  };

  writeTitle(TEXT_TITLE);

  // Построение гистаграм с именами и результатом
  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var opacity = +Math.random().toFixed(2) + MIN_OPACITY;
    var greenRandom = Math.round(getMinMaxRandom(255));
    var barY = PLAYER_NAME_Y - 10;
    var barX = CLOUD_START_X + GAP + (BAR_WIDTH + GAP) * i;
    var barHeight = (BAR_HEIGHT * times[i]) / maxTime;
    var resultY = PLAYER_NAME_Y - RESULT_GAP + (BAR_HEIGHT * times[i]) / maxTime;

    ctx.fillStyle = names[i] === 'Вы' ? COLOR_RED : 'rgba(0, ' + greenRandom + ', 255, ' + opacity + ')';

    ctx.fillRect(barX, barY, BAR_WIDTH, barHeight);
    ctx.fillStyle = COLOR_BLACK;
    ctx.fillText(names[i], barX, PLAYER_NAME_Y);
    ctx.fillText(parseInt(times[i], 10), barX, resultY);
  }
};
