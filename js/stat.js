'use strict';

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
var CLOUD_1_COORDINATE = [220, 30, 250, 20];
var CLOUD_2_COORDINATE = [265, -5, 280, 20];
var CLOUD_3_COORDINATE = [300, -15, 320, 20];
var CLOUD_4_COORDINATE = [340, -15, 360, 20];
var CLOUD_5_COORDINATE = [380, -15, 400, 20];
var CLOUD_6_COORDINATE = [420, -15, 440, 20];
var CLOUD_7_COORDINATE = [455, -5, 470, 20];
var CLOUD_8_COORDINATE = [490, 35, 470, 50];
var CLOUD_9_COORDINATE = [510, 75, 470, 95];
var CLOUD_10_COORDINATE = [510, 125, 470, 145];
var CLOUD_11_COORDINATE = [510, 175, 470, 195];
var CLOUD_12_COORDINATE = [510, 225, 470, 245];
var CLOUD_13_COORDINATE = [490, 260, 470, 270];
var CLOUD_14_COORDINATE = [460, 290, 450, 270];
var CLOUD_15_COORDINATE = [420, 310, 405, 270];
var CLOUD_16_COORDINATE = [380, 310, 360, 270];
var CLOUD_17_COORDINATE = [340, 310, 320, 270];
var CLOUD_18_COORDINATE = [300, 310, 280, 270];
var CLOUD_19_COORDINATE = [260, 300, 240, 270];
var CLOUD_20_COORDINATE = [220, 255, 240, 240];
var CLOUD_21_COORDINATE = [200, 215, 240, 195];
var CLOUD_22_COORDINATE = [200, 175, 240, 155];
var CLOUD_23_COORDINATE = [200, 135, 240, 115];
var CLOUD_24_COORDINATE = [200, 95, 240, 75];
var CLOUD_25_COORDINATE = [210, 55, 240, 45];
var CLOUD_COLOR = 'rgba(0, 0, 0, 0.7)';
var COLOR_WHITE = '#fff';
var COLOR_BLACK = 'black';
var COLOR_RED = 'rgba(255, 0, 0, 1)';
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
  var paintCloud = function () {
    var coords = [CLOUD_1_COORDINATE,
      CLOUD_2_COORDINATE,
      CLOUD_3_COORDINATE,
      CLOUD_4_COORDINATE,
      CLOUD_5_COORDINATE,
      CLOUD_6_COORDINATE,
      CLOUD_7_COORDINATE,
      CLOUD_8_COORDINATE,
      CLOUD_9_COORDINATE,
      CLOUD_10_COORDINATE,
      CLOUD_11_COORDINATE,
      CLOUD_12_COORDINATE,
      CLOUD_13_COORDINATE,
      CLOUD_14_COORDINATE,
      CLOUD_15_COORDINATE,
      CLOUD_16_COORDINATE,
      CLOUD_17_COORDINATE,
      CLOUD_18_COORDINATE,
      CLOUD_19_COORDINATE,
      CLOUD_20_COORDINATE,
      CLOUD_21_COORDINATE,
      CLOUD_22_COORDINATE,
      CLOUD_23_COORDINATE,
      CLOUD_24_COORDINATE,
      CLOUD_25_COORDINATE];
    var OFFSET = GAP;

    ctx.fillStyle = CLOUD_COLOR;
    ctx.beginPath();
    ctx.moveTo(CLOUD_START_X, CLOUD_START_Y);
    for (var i = 0; i < coords.length; i++) {
      var mas = coords[i];
      var coordX = mas[0];
      var coordY = mas[1];
      var coordWidth = mas[2];
      var coordHeigth = mas[3];

      ctx.quadraticCurveTo(coordX + OFFSET, coordY + OFFSET, coordWidth + OFFSET, coordHeigth + OFFSET);
    }

    ctx.fill();
    ctx.fillStyle = COLOR_WHITE;
    ctx.beginPath();
    var cloudSdadoxStartX = CLOUD_START_X - OFFSET;
    var cloudSdadoxStartY = CLOUD_START_Y - OFFSET;
    ctx.moveTo(cloudSdadoxStartX, cloudSdadoxStartY);

    for (i = 0; i < coords.length; i++) {
      mas = coords[i];
      coordX = mas[0];
      coordY = mas[1];
      coordWidth = mas[2];
      coordHeigth = mas[3];
      ctx.quadraticCurveTo(coordX, coordY, coordWidth, coordHeigth);
    }
  };

  paintCloud();
  ctx.fill();

  // Заголовок в таблице результатов
  var TEXT_TITLE = ['Ура вы победили!', 'Список результатов:'];

  var writeTitle = function (arr) {
    for (i = 0; i < arr.length; i++) {
      if (arr.length > 2) {
        arr.length = 2;
      }

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

    ctx.fillStyle = names[i] === 'Вы' ? COLOR_RED : 'rgba(0, ' + greenRandom + ', 255, ' + opacity + ')';
    ctx.fillRect(CLOUD_START_X + GAP + (BAR_WIDTH + GAP) * i, barY, BAR_WIDTH, (BAR_HEIGHT * times[i]) / maxTime);
    ctx.fillStyle = COLOR_BLACK;
    ctx.fillText(names[i], CLOUD_START_X + GAP + (BAR_WIDTH + GAP) * i, PLAYER_NAME_Y);
    ctx.fillText(parseInt(times[i], 10), CLOUD_START_X + GAP + (BAR_WIDTH + GAP) * i, PLAYER_NAME_Y - RESULT_GAP + (BAR_HEIGHT * times[i]) / maxTime);
  }
};
