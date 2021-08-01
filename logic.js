function SnakeGame(snake, canvasId, scoreEl, timeEl) {
    this.snake = snake; // the snake coords (matrices)
    this.canvas = document.getElementById(canvasId);
    this.scoreEl = scoreEl;
    this.time = timeEl;
    this.startTime;
    this.endTime;
    this.isOver = false;
    this.direction;
    this.foodCoords = {};
    this.timeInterval;
    this.moveInterval;
}

SnakeGame.prototype.toHHMMSS = function (secs) {
    var sec_num = parseInt(secs, 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    this.time.innerText = hours + ':' + minutes + ':' + seconds;
}

SnakeGame.prototype.calculateTime = function () {
    this.timeInterval = setInterval(() => {
        this.endTime = Date.now();
        var time = this.endTime - this.startTime;
        var sec = Math.round(time / 1000);
        this.toHHMMSS(sec)
    }, 1000);
}

SnakeGame.prototype.startGame = function () {
    this.startTime = Date.now();
    this.calculateTime();
}

SnakeGame.prototype.isGameOver = function (x, y) {
    if (x > 39 || y > 29 || x < 0 || y < 0) {
        this.isOver = true;
        clearInterval(this.timeInterval);
        clearInterval(this.moveInterval);
    }
    for (let i = 0; i < this.snake.length; i++) {
        if (this.snake[i][0] === x && this.snake[i][1] === y) {
            this.isOver = true;
            clearInterval(this.timeInterval);
            clearInterval(this.moveInterval);
        }
    }
}

SnakeGame.prototype.move = function (direction) {
    clearInterval(this.moveInterval);
    this.direction = direction;
    if (direction === 'right') {
        this.moveInterval = setInterval(() => this.moveRight(), 100);
    }
    if (direction === 'left') {
        this.moveInterval = setInterval(() => this.moveLeft(), 100);
    }
    if (direction === 'up') {
        this.moveInterval = setInterval(() => this.moveUp(), 100);
    }
    if (direction === 'down') {
        this.moveInterval = setInterval(() => this.moveDown(), 100);
    }
}

SnakeGame.prototype.moveRight = function () {
    this.isGameOver(this.snake[0][0] + 1, this.snake[0][1]);
    if (!this.isOver) {
        this.snake.unshift([this.snake[0][0] + 1, this.snake[0][1]]);
        if (this.snake[0][0] === this.foodCoords.x && this.snake[0][1] === this.foodCoords.y) {
            this.printSnake();
            this.scoreEl.innerText++;
            this.generateFood();
        }
        else {
            var deleted = this.snake.splice(this.snake.length - 1, 1);
            this.printSnake(deleted[0]);
        }
    }
}

SnakeGame.prototype.moveLeft = function () {
    this.isGameOver(this.snake[0][0] - 1, this.snake[0][1]);
    if (!this.isOver) {
        this.snake.unshift([this.snake[0][0] - 1, this.snake[0][1]]);
        if (this.snake[0][0] === this.foodCoords.x && this.snake[0][1] === this.foodCoords.y) {
            this.printSnake();
            this.scoreEl.innerText++;
            this.generateFood();
        }
        else {
            var deleted = this.snake.splice(this.snake.length - 1, 1);
            this.printSnake(deleted[0]);
        }
    }
}

SnakeGame.prototype.moveUp = function () {
    this.isGameOver(this.snake[0][0], this.snake[0][1] - 1);
    if (!this.isOver) {
        this.snake.unshift([this.snake[0][0], this.snake[0][1] - 1]);
        if (this.snake[0][0] === this.foodCoords.x && this.snake[0][1] === this.foodCoords.y) {
            this.printSnake();
            this.scoreEl.innerText++;
            this.generateFood();
        }
        else {
            var deleted = this.snake.splice(this.snake.length - 1, 1);
            this.printSnake(deleted[0]);
        }
    }
}

SnakeGame.prototype.moveDown = function () {
    this.isGameOver(this.snake[0][0], this.snake[0][1] + 1);
    if (!this.isOver) {
        this.snake.unshift([this.snake[0][0], this.snake[0][1] + 1]);
        if (this.snake[0][0] === this.foodCoords.x && this.snake[0][1] === this.foodCoords.y) {
            this.printSnake();
            this.scoreEl.innerText++;
            this.generateFood();
        }
        else {
            var deleted = this.snake.splice(this.snake.length - 1, 1);
            this.printSnake(deleted[0]);
        }
    }
}



SnakeGame.prototype.generateFood = function () {
    var ctx = this.canvas.getContext('2d');
    ctx.fillStyle = 'white';
    var randomX = Math.floor(Math.random() * 40);
    var randomY = Math.floor(Math.random() * 30);
    var coords = [randomX, randomY];
    var isSnake = false;
    for (let i = 0; i < this.snake.length; i++) {
        if (coords[0] === this.snake[i][0] && coords[1] === this.snake[i][1]) {
            isSnake = true;
        }
    }
    if (!isSnake) {
        ctx.fillRect(randomX * 20, randomY * 20, 20, 20);
        ctx.stroke();
        this.foodCoords = { x: randomX, y: randomY }
    }
}

SnakeGame.prototype.pickColor = function (x, y) {
    if (y % 2 === 0 && x % 2 === 0 || y % 2 != 0 && x % 2 != 0) return 'rgb(19,57,84)';
    else return 'rgb(28,78,107)';
}

SnakeGame.prototype.printSnake = function (deletedCoords) {
    var ctx = this.canvas.getContext('2d');
    ctx.fillStyle = 'yellow';
    for (let i = 0; i < this.snake.length; i++) {
        ctx.fillRect(this.snake[i][0] * 20, this.snake[i][1] * 20, 20, 20);
    }
    if (deletedCoords) {
        ctx.fillStyle = this.pickColor(deletedCoords[0], deletedCoords[1]);
        ctx.fillRect(deletedCoords[0] * 20, deletedCoords[1] * 20, 20, 20);
    }
    ctx.stroke();
}
