var userName = '';
var snakeGame;

var pickColor = function (x, y) {
       if (y%2 === 0 && x%2 === 0 || y%2 != 0 && x%2 != 0 ) return 'rgb(19,57,84)';
       else return 'rgb(28,78,107)';   
}

var createCanvas = function (width, height) {
        var canvas = document.createElement('canvas');
        canvas.id = 'myCanvas';
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext('2d');
        for (let i = 0; i < height/20 ; i++) {
                for (let j = 0; j < width/20; j++) {
                        ctx.fillStyle = pickColor(j, i);
                        ctx.fillRect(j * 20,  i * 20, 20, 20);
                }
        }
        ctx.stroke();
        return canvas;
}

var gameContainer = document.createElement('div');
var header = document.createElement('div');
var score = document.createElement('h5');
var scoreTitle = document.createElement('h5');
var time = document.createElement('h5');
var title = document.createElement('h3');
var logo = document.createElement('img');

var generateGameBoard = function () {
        gameContainer.id = 'gameContainer';
        score.innerText = 0;
        score.id = 'score';
        scoreTitle.id = 'scoreTitle';
        time.innerText = '00:00:00';
        time.id = 'time';
        title.innerText = 'PHYTONS';
        scoreTitle.innerText = 'Score: ';
        logo.src = './images/icon.png';

        header.appendChild(scoreTitle);
        header.appendChild(score);
        header.appendChild(logo);
        header.appendChild(title);
        header.appendChild(time);
        gameContainer.appendChild(header);
        gameContainer.appendChild(createCanvas(800, 600));

        return gameContainer;
}

$('#startGame').on('click', function () {
        userName = $('#userName').val();
        $('#userName').val('');
        $('body').empty();
        var html = generateGameBoard();
        $('body').append(html);

        snakeGame = new SnakeGame ([[20, 15],[20, 16],[20, 17],[20, 18]], 'myCanvas', score, time);
        snakeGame.printSnake();
        snakeGame.generateFood();
        snakeGame.startGame();
})


$(document).on('keypress', function (e) {
        if ((e.which === 107 || e.which == 75) && (snakeGame.direction != 'up' )) snakeGame.move('down');
        if ((e.which === 108 || e.which == 76) && (snakeGame.direction != 'left' )) snakeGame.move('right');
        if ((e.which === 106 || e.which == 74) && (snakeGame.direction != 'right' )) snakeGame.move('left');
        if ((e.which === 105 || e.which == 73) && (snakeGame.direction != 'down' )) snakeGame.move('up');
})

