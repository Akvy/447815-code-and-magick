'use strict';

var CLOUD_START_X = 250;
var CLOUD_START_Y = 55;
var CLOUD_SHADOW_START_X = CLOUD_START_X - 10;
var CLOUD_SHADOW_START_Y = CLOUD_START_Y - 10;
var GAP = 10;
var WIN_FIRST_LINE_X = 295;
var WIN_FIRST_LINE_Y = 25;
var WIN_SECOND_LINE_X = WIN_FIRST_LINE_X - 10;
var WIN_SECOND_LINE_Y = WIN_FIRST_LINE_Y + 20;
var PLAYER_NAME_Y = 250;
var BAR_Y = PLAYER_NAME_Y - 10;
var BAR_WIDTH = 40;
var BAR_HEIGHT = -150;
var RESULT_GAP = 25;
var MIN_OPACITY = 0.1;

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};


window.renderStatistics = function (ctx, names, times) {
  // Выравниваем размер массивов с кол-ом игроков и временем
  if (times.length > names.length) {
    times.length = names.length;
  } else {
    names.length = times.length;
  }

  // Контуры тени облака и облака
  var coords = [[220, 30, 250, 20],
    [265, -5, 280, 20],
    [300, -15, 320, 20],
    [340, -15, 360, 20],
    [380, -15, 400, 20],
    [420, -15, 440, 20],
    [455, -5, 470, 20],
    [490, 35, 470, 50],
    [510, 75, 470, 95],
    [510, 125, 470, 145],
    [510, 175, 470, 195],
    [510, 225, 470, 245],
    [490, 260, 470, 270],
    [460, 290, 450, 270],
    [420, 310, 405, 270],
    [380, 310, 360, 270],
    [340, 310, 320, 270],
    [300, 310, 280, 270],
    [260, 300, 240, 270],
    [220, 255, 240, 240],
    [200, 215, 240, 195],
    [200, 175, 240, 155],
    [200, 135, 240, 115],
    [200, 95, 240, 75],
    [210, 55, 240, 45]];
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.beginPath();
  ctx.moveTo(CLOUD_START_X, CLOUD_START_Y);
  for (var i = 0; i < coords.length; i++) {
    var mas = coords[i];
    ctx.quadraticCurveTo(mas[0] + 10, mas[1] + 10, mas[2] + 10, mas[3] + 10);
  }
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.stroke();
  ctx.fill();

  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.moveTo(CLOUD_SHADOW_START_X, CLOUD_SHADOW_START_Y);

  for (i = 0; i < coords.length; i++) {
    mas = coords[i];
    ctx.quadraticCurveTo(mas[0], mas[1], mas[2], mas[3]);
  }

  // Текст в таблице результатов
  ctx.fill();
  ctx.font = '16px Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillStyle = 'black';
  ctx.fillText('Ура вы победили!', WIN_FIRST_LINE_X, WIN_FIRST_LINE_Y);
  ctx.fillText('Список результатов:', WIN_SECOND_LINE_X, WIN_SECOND_LINE_Y);

  // Построение гистаграм с именами и результатом
  var maxTime = getMaxElement(times);

  for (i = 0; i < names.length; i++) {
    var opacity = +Math.random().toFixed(2) + MIN_OPACITY;
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, ' + opacity + ')';
    }
    ctx.fillRect(CLOUD_START_X + GAP + (BAR_WIDTH + GAP) * i, BAR_Y, BAR_WIDTH, (BAR_HEIGHT * times[i]) / maxTime);
    ctx.fillStyle = 'black';
    ctx.fillText(names[i], CLOUD_START_X + GAP + (BAR_WIDTH + GAP) * i, PLAYER_NAME_Y);
    ctx.fillText(parseInt(times[i], 10), CLOUD_START_X + GAP + (BAR_WIDTH + GAP) * i, PLAYER_NAME_Y - RESULT_GAP + (BAR_HEIGHT * times[i]) / maxTime);
  }
};
