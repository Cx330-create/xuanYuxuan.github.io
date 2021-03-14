var keyNum = 38, accle = 38, wipeNum = 0, judNum = 0, interval = 300, myInterval = 300, borderNum = 30;
var snakeCoor = [], rains = [];
var snake = {};
var timer, context, score, pre_interval, run = false, flag = false;
var starCount = 300, rainCount = 20;
window.onload = function () {
    var table = document.querySelector("#gameBorder");
    var startBtn = document.querySelector("#startBtn");
    var stopBtn = document.querySelector("#stopBtn");
    var contiBtn = document.querySelector("#contiBtn");
    var sorceReco = document.querySelector("#sorce");
    var vx = document.querySelector("#vx");
    var musicBox = document.getElementById("musicBox");
    var music = document.getElementsByTagName("audio")[0];
    for (var i = 1; i <= borderNum; i++) {
        tr = document.createElement("tr");
        table.appendChild(tr);
        for (var j = 1; j <= borderNum; j++) {
            td = document.createElement("td");
            td.className = "grid";
            tr.appendChild(td);
        }
    }
    grid = document.getElementsByClassName("grid");
    init();
    starInit();
    starPosition();
    for (var i = 0; i < rainCount; i++) {
        var rain = new MeteorRain();
        rain.draw();
        rains.push(rain);
    }
    playRains();
    snakeBorder();
    if (music.paused)
        musicBox.style.backgroundImage = "url(./pauseMusic.png)";
    else
        musicBox.style.backgroundImage = "url(./playMusic.png)";
    startBtn.onclick = function () {
        vx.style.display = "none";
        keyNum = 38;
        score = 0;
        sorceReco.innerText = "你的得分是: " + score;
        for(var i = 0;i < borderNum * borderNum; i++){
            if(hasClass(grid[i], "food")){
                removeClass(grid[i], "food");
                break;
            }
        }
        foodGen();
        if (snakeCoor[0]) {
            for (var i = 0; i < snake.len; i++) {
                if (hasClass(grid[snakeCoor[i]], "border"));
                removeClass(grid[snakeCoor[i]], "border");
            }
            if (judNum == 1) {
                addClass(grid[snakeCoor[0]], "border");
                removeClass(grid[snake.tail], "border");
                judNum = 0;
            }
            else if (judNum == 2) {
                removeClass(grid[snake.tail], "border");
                judNum = 0;
            }
        }
        run = true;
        clearInterval(timer);
        timer = setInterval(move, interval);
        snakeProper();
        key();
        slowdown();
    }
    stopBtn.onclick = function () {
        run = false;
    }
    contiBtn.onclick = function () {
        run = true;
    }
    musicBox.onclick = function () {
        if (music.paused) {
            music.play();
            musicBox.style.backgroundImage = "url(./playMusic.png)";
        }
        else {
            music.pause();
            musicBox.style.backgroundImage = "url(./pauseMusic.png)";
        }
    }
};

function starInit() {
    var bg = document.getElementsByTagName("body")[0];
    for (var i = 0; i < starCount; i++) {
        var star = document.createElement("div");
        star.classList.add("star");
        bg.appendChild(star);
    }
}
function starPosition() {
    var stars = document.getElementsByClassName("star");
    for (var i = 0; i < starCount; i++) {
        stars[i].style.left = Math.random() * window.innerWidth + "px";
        stars[i].style.top = Math.random() * window.innerHeight + "px";
        stars[i].style.animationDelay = Math.random() * 10 + "s";
    }
}

function init() {
    var Meteor = document.getElementById("Meteor");
    Meteor.width = window.innerWidth;
    Meteor.height = window.innerHeight;
    context = Meteor.getContext("2d");
}

function MeteorRain() {
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight;
    this.length = Math.ceil(Math.random() * 80 + 150);
    this.angle = 30;
    this.cos = Math.cos((this.angle * 3.14) / 180);
    this.sin = Math.sin((this.angle * 3.14) / 180);
    this.width = this.length * this.cos;
    this.height = this.length * this.sin;
    this.speed = Math.ceil(Math.random() + 0.5);
    this.shifting_x = this.speed * this.cos;
    this.shifting_y = this.speed * this.sin;

    this.countPos = function () {
        this.x = this.x - this.shifting_x;
        this.y = this.y + this.shifting_y;
    };
    this.draw = function () {
        context.save();
        context.beginPath();
        context.lineWidth = 1;
        context.globalAlpha = this.alpha;
        var line = context.createLinearGradient(
            this.x,
            this.y,
            this.x + this.width,
            this.y - this.height
        );
        line.addColorStop(0, "white");
        line.addColorStop(0.5, "grey");
        line.addColorStop(1.0, "black");
        context.strokeStyle = line;
        context.moveTo(this.x, this.y);
        context.lineTo(this.x + this.width, this.y - this.height);
        context.closePath();
        context.stroke();
        context.restore();
    };
    this.move = function () {
        var x = this.x + this.width - this.shifting_x;
        var y = this.y - this.height + this.shifting_y;
        context.clearRect(
            x - 3,
            y - 3,
            this.shifting_x + 5,
            this.shifting_y + 5
        );
        this.countPos();
        this.alpha -= 0.002;
        this.draw();
    };
}
function playRains() {
    for (var n = 0; n < rainCount; n++) {
        var rain = rains[n];
        rain.move();
        if (rain.y > window.innerHeight) {
            context.clearRect(
                rain.x,
                rain.y - rain.height,
                rain.width,
                rain.height
            )
            rains[n] = new MeteorRain();
        }
    }
    setTimeout("playRains()", 2);
}

function selectFrom(lowerValue, upperValue) {
    let choices = upperValue - lowerValue + 1;
    return Math.floor(Math.random() * choices + lowerValue);
}

function snakeBorder() {
    for (var i = 0; i < borderNum; i++) {
        addClass(grid[i], "border");
        addClass(grid[i + borderNum * borderNum - borderNum], "border");
    }
    for (var i = borderNum; i < borderNum * borderNum - borderNum; i += borderNum) {
        addClass(grid[i], "border");
        addClass(grid[i + borderNum - 1], "border");
    }
}
function snakeProper() {
    snake.len = 3;
    interval = 200;
    this.num = 375;
    this.num1 = this.num;
    snakeCoor[0] = this.num;
    addClass(grid[this.num1], "border")
    for (var i = 1; i < snake.len; i++) {
        this.num += borderNum;
        addClass(grid[this.num], "border")
        snakeCoor[i] = this.num;
    }
}

function key() {
    var prev_key;
    document.onkeydown = function (event) {
        if (flag) {
            if (keyNum == 37 || keyNum == 38 || keyNum == 39 || keyNum == 40)
                prev_key = keyNum;
            keyNum = event.keyCode;
            accle = event.keyCode;
            if (prev_key == 37 && keyNum == 39)
                keyNum = prev_key;
            else if (prev_key == 39 && keyNum == 37)
                keyNum = prev_key;
            else if (prev_key == 38 && keyNum == 40)
                keyNum = prev_key;
            else if (prev_key == 40 && keyNum == 38)
                keyNum = prev_key;
            if (keyNum != 37 && keyNum != 38 && keyNum != 39 && keyNum != 40)
                keyNum = prev_key;
            if (accle == 17)
                interval = 100;
            flag = false;
        }
    }
}

function slowdown() {
    var slowNum;
    document.onkeyup = function (event) {
        slowNum = event.keyCode;
        if (slowNum == accle)
            interval = myInterval;
        accle = 0;
    }
}

var foodCoor, pre_foodCoor;
function foodGen() {
    var num;
    while (true) {
        num = 1;
        pre_foodCoor = foodCoor;
        foodCoor = Math.floor(Math.random() * borderNum * borderNum);
        for (var i = 0; i < borderNum; i++) {
            if (foodCoor == i || foodCoor == i + borderNum * borderNum - borderNum) {
                num = 0;
                break;
            }
        }
        for (var i = borderNum; i < borderNum * borderNum - borderNum; i += borderNum) {
            if (foodCoor == i || foodCoor == i + borderNum - 1) {
                num = 0;
                break;
            }
        }
        if (pre_foodCoor == foodCoor)
            num = 0;
        
        if (num == 1) {
            break;
        }
    }
    addClass(grid[foodCoor], "food");
}
function move() {
    if (run) {
        clearInterval(timer);
        timer = setInterval(move, interval)
        snake.tail = snakeCoor[snake.len - 1];
        for (var i = snake.len - 1; i > 0; i--) {
            snakeCoor[i] = snakeCoor[i - 1];
        }
        if (keyNum == 38) {
            this.num1 -= borderNum;
            snakeCoor[0] = this.num1;
            addClass(grid[this.num1], "border");
            flag = true;
            rec_Food();
            judge();
            if (wipeNum == 0) {
                removeClass(grid[snake.tail], "border");
            }
        }
        else if (keyNum == 37) {
            this.num1--;
            snakeCoor[0] = this.num1;
            addClass(grid[this.num1], "border");
            flag = true;
            rec_Food();
            judge();
            if (wipeNum == 0) {
                removeClass(grid[snake.tail], "border");
            }
        }
        else if (keyNum == 39) {
            this.num1++;
            snakeCoor[0] = this.num1;
            addClass(grid[this.num1], "border");
            flag = true;
            rec_Food();
            judge();
            if (wipeNum == 0) {
                removeClass(grid[snake.tail], "border");
            }
        }
        else if (keyNum == 40) {
            this.num1 += borderNum;
            snakeCoor[0] = this.num1;
            addClass(grid[this.num1], "border");
            flag = true;
            rec_Food();
            judge();
            if (wipeNum == 0) {
                removeClass(grid[snake.tail], "border");
            }
        }
        wipeNum = 0;
    }
}

function rec_Food() {
    var sorceReco = document.getElementById("sorce");
    if (snakeCoor[0] == foodCoor) {
        removeClass(grid[foodCoor], "food");
        var num;
        while (true) {
            num = 1;
            pre_foodCoor = foodCoor;
            foodCoor = Math.floor(Math.random() * borderNum * borderNum);
            for (var i = 0; i < borderNum; i++) {
                if (foodCoor == i || foodCoor == i + borderNum * borderNum - borderNum) {
                    num = 0;
                    break;
                }
            }
            for (var i = borderNum; i < borderNum * borderNum - borderNum; i += borderNum) {
                if (foodCoor == i || foodCoor == i + borderNum - 1) {
                    num = 0;
                    break;
                }
            }
            for (var i = 0; i < snake.len; i++) {
                if (foodCoor == snakeCoor[i]) {
                    num = 0;
                    break;
                }
            }
            if (foodCoor == pre_foodCoor)
                num = 0;
            if (num == 1) {
                break;
            }
        }
        grid[foodCoor].className += " food";
        if (interval > 100) {
            interval -= 10;
            interval = myInterval;
        }
        else
            interval = 100;
        wipeNum = 1;
        snake.len++;
        score += 10;
        snakeCoor[snake.len - 1] = snake.tail;
    }
    sorceReco.innerText = "你的得分是: " + score;
}
function judge() {
    for (var i = 0; i < borderNum; i++) {
        if (snakeCoor[0] == i || snakeCoor[0] == i + borderNum * borderNum - borderNum) {
            faiPro();
        }
    }
    for (var i = borderNum; i < borderNum * borderNum - borderNum; i += borderNum) {
        if (snakeCoor[0] == i || snakeCoor[0] == i + borderNum - 1) {
            faiPro();
        }
    }
    for (var i = 1; i < snake.len; i++) {
        if (snakeCoor[0] == snakeCoor[i]) {
            clearInterval(timer);
            judNum = 2;
            wipeNum = 1;
            vx.innerText = "很遗憾你失败了"
            vx.style.display = "block";
        }
    }
    if (snakeCoor[0] == snake.tail) {
        faiPro();
    }
}
function faiPro() {
    clearInterval(timer);
    judNum = 1;
    wipeNum = 1;
    vx.style.display = "block";
    if (score < 500)
        vx.innerText = "很遗憾你失败了"
    else
        vx.innerText = new decode().decode("K+W4iOWnkHZ4OlppeWlueW8=+aKiuayiOWtkOWQn+W4iOWnkOaLvOWHuuadpeS6hizlpZblirHluIjlp5DnmoR2eO+8mlppeWlueW8s5biI5aeQ5Zyo562J5L2g5ZOmLOi1tuW/q+ihjOWKqCEhIQ==")
}
//It's impossible to peek at vx

function addClass(obj, cn) {
    if (!hasClass(obj, cn))
        obj.className += " " + cn;
}

function hasClass(obj, cn) {
    var reg = new RegExp("\\b" + cn + "\\b");
    return reg.test(obj.className);
}

function removeClass(obj, cn) {
    var reg = new RegExp("\\b" + cn + "\\b");
    obj.className = obj.className.replace(reg, "");
}

function toggleClass(obj, cn) {
    if (hasClass(obj, cn))
        removeClass(obj, cn);
    else
        addClass(obj, cn);
}
