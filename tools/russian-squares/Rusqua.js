var square = [], pre_square = [], array = [], isRusqua = [];
var gameHeight = 35, gameWidth = 25, transNum = 0, pre_judgeNum = 1, speed = 300;
var Judge, signNum, judgeNum, pre_transNum, num;
var stop, staticx, timer, run = true;
var img = new Image();
window.onload = function () {
    img.src = "./cherry.png";
    function Sakura(x, y, s, r, fn) {
        this.x = x;
        this.y = y;
        this.s = s;
        this.r = r;
        this.fn = fn;
    }

    Sakura.prototype.draw = function (cxt) {
        cxt.save();
        var xc = 40 * this.s / 4;
        cxt.translate(this.x, this.y);
        cxt.rotate(this.r);
        cxt.drawImage(img, 0, 0, 40 * this.s, 40 * this.s)
        cxt.restore();
    }

    Sakura.prototype.update = function () {
        this.x = this.fn.x(this.x, this.y);
        this.y = this.fn.y(this.y, this.y);
        this.r = this.fn.r(this.r);
        if (this.x > window.innerWidth ||
            this.x < 0 ||
            this.y > window.innerHeight ||
            this.y < 0
        ) {
            this.r = getRandom('fnr');
            if (Math.random() > 0.4) {
                this.x = getRandom('x');
                this.y = 0;
                this.s = getRandom('s');
                this.r = getRandom('r');
            } else {
                this.x = window.innerWidth;
                this.y = getRandom('y');
                this.s = getRandom('s');
                this.r = getRandom('r');
            }
        }
    }

    SakuraList = function () {
        this.list = [];
    }
    SakuraList.prototype.push = function (sakura) {
        this.list.push(sakura);
    }
    SakuraList.prototype.update = function () {
        for (var i = 0, len = this.list.length; i < len; i++) {
            this.list[i].update();
        }
    }
    SakuraList.prototype.draw = function (cxt) {
        for (var i = 0, len = this.list.length; i < len; i++) {
            this.list[i].draw(cxt);
        }
    }
    SakuraList.prototype.get = function (i) {
        return this.list[i];
    }
    SakuraList.prototype.size = function () {
        return this.list.length;
    }

    function getRandom(option) {
        var ret, random;
        switch (option) {
            case 'x':
                ret = Math.random() * window.innerWidth;
                break;
            case 'y':
                ret = Math.random() * window.innerHeight;
                break;
            case 's':
                ret = Math.random();
                break;
            case 'r':
                ret = Math.random() * 6;
                break;
            case 'fnx':
                random = -0.5 + Math.random() * 1;
                ret = function (x, y) {
                    return x + 0.5 * random - 1.7;
                };
                break;
            case 'fny':
                random = 1.5 + Math.random() * 0.7
                ret = function (x, y) {
                    return y + random;
                };
                break;
            case 'fnr':
                random = Math.random() * 0.03;
                ret = function (r) {
                    return r + random;
                };
                break;
        }
        return ret;
    }

    function startSakura() {
        requestAnimationFrame = window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            window.oRequestAnimationFrame;
        var canvas = document.createElement('canvas'),
            cxt;
        staticx = true;
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
        canvas.setAttribute('style', 'position: fixed;left: 0;top: 0;pointer-events: none;');
        canvas.setAttribute('id', 'canvas_sakura');
        document.getElementsByTagName('body')[0].appendChild(canvas);
        cxt = canvas.getContext('2d');
        var sakuraList = new SakuraList();
        for (var i = 0; i < 50; i++) {
            var sakura, randomX, randomY, randomS, randomR, randomFnx, randomFny;
            randomX = getRandom('x');
            randomY = getRandom('y');
            randomR = getRandom('r');
            randomS = getRandom('s');
            randomFnx = getRandom('fnx');
            randomFny = getRandom('fny');
            randomFnR = getRandom('fnr');
            sakura = new Sakura(randomX, randomY, randomS, randomR, {
                x: randomFnx,
                y: randomFny,
                r: randomFnR
            });
            sakura.draw(cxt);
            sakuraList.push(sakura);
        }
        stop = requestAnimationFrame(function () {
            cxt.clearRect(0, 0, canvas.width, canvas.height);
            sakuraList.update();
            sakuraList.draw(cxt);
            stop = requestAnimationFrame(arguments.callee);
        })
    }
    //获取一定范围的随机数
    function selectFrom(lowerValue, upperValue) {
        let choices = upperValue - lowerValue + 1;
        return Math.floor(Math.random() * choices + lowerValue);
    }

    function gameBorder() {
        for (let i = 0; i < gameWidth; i++) {
            addClass(grid[i], "border");
            addClass(grid[i + gameHeight * gameWidth], "border");
        }
        for (let i = 1; i < gameHeight; i++) {
            addClass(grid[i * gameWidth], "border");
            addClass(grid[i * gameWidth + gameWidth - 1], "border");
        }
    }
    function shape() {
        for (let i = 0; i < 16; i++) {
            removeClass(Tip[i], "runColor");
        }

        judgeNum = selectFrom(1, 7);
        switch (judgeNum) {
            case 1:
                for (let i = 0; i < 4; i++)
                    addClass(Tip[i * 4 + 1], "runColor");
                break;
            case 2:
                for (let i = 0; i < 3; i++)
                    addClass(Tip[i + 8], "runColor");
                addClass(Tip[5], "runColor");
                break;
            case 3:
                for (let i = 0; i < 2; i++) {
                    addClass(Tip[i + 5], "runColor");
                    addClass(Tip[i + 9], "runColor");
                }
                break;
            case 4:
                for (let i = 0; i < 3; i++)
                    addClass(Tip[i + 4], "runColor");
                addClass(Tip[10], "runColor");
                break;
            case 5:
                for (let i = 0; i < 2; i++) {
                    addClass(Tip[i + 4], "runColor");
                    addClass(Tip[i + 9], "runColor");
                }
                break;
            case 6:
                for (let i = 0; i < 3; i++)
                    addClass(Tip[i + 4], "runColor");
                addClass(Tip[8], "runColor");
                break;
            case 7:
                for (let i = 0; i < 2; i++) {
                    addClass(Tip[i + 5], "runColor");
                    addClass(Tip[i + 8], "runColor");
                }
                break;
        }
    }
    function rand_Gen() {
        switch (pre_judgeNum) {
            case 1:
                for (let i = 0; i < 4; i++)
                    square[i] = parseInt(gameWidth / 2) + gameWidth + i * gameWidth;
                break;
            case 2:
                for (let i = 0; i < 3; i++)
                    square[i + 1] = parseInt(gameWidth / 2) + gameWidth - 1 + gameWidth + i;
                square[0] = parseInt(gameWidth / 2) + gameWidth;
                break;
            case 3:
                for (let i = 0; i < 2; i++) {
                    square[i] = parseInt(gameWidth / 2) - 1 + gameWidth + i;
                    square[i + 2] = parseInt(gameWidth / 2) - 1 + gameWidth * 2 + i;
                }
                break;
            case 4:
                for (let i = 0; i < 3; i++)
                    square[i] = parseInt(gameWidth / 2) - 1 + gameWidth + i;
                square[3] = parseInt(gameWidth / 2) + 1 + gameWidth * 2;
                break;
            case 5:
                for (let i = 0; i < 2; i++) {
                    square[i] = parseInt(gameWidth / 2) - 1 + gameWidth + i;
                    square[i + 2] = parseInt(gameWidth / 2) + gameWidth * 2 + i;
                }
                break;
            case 6:
                for (let i = 0; i < 3; i++)
                    square[i] = parseInt(gameWidth / 2) - 1 + gameWidth + i;
                square[3] = parseInt(gameWidth / 2) - 1 + gameWidth * 2;
                break;
            case 7:
                for (let i = 0; i < 2; i++) {
                    square[i] = parseInt(gameWidth / 2) + gameWidth + i;
                    square[i + 2] = parseInt(gameWidth / 2) - 1 + gameWidth * 2 + i;
                }
                break;
        }
        for (let i = 0; i < 4; i++)
            addClass(grid[square[i]], "runColor");
        Judge = 0;
        shape();
    }
    function Deformation() {
        num = 0;
        pre_transNum = transNum;
        if (pre_judgeNum == 1 && transNum == 0) {
            square[0] = square[0] - 2 + gameWidth;
            square[1] = square[1] - 1;
            square[2] = square[2] - gameWidth;
            square[3] = square[3] + 1 - gameWidth * 2;
            transNum++;
        } else if (pre_judgeNum == 1 && transNum == 1) {
            square[0] = square[0] + 2 - gameWidth;
            square[1] = square[1] + 1;
            square[2] = square[2] + gameWidth;
            square[3] = square[3] - 1 + gameWidth * 2;
            transNum = 0;
        }
        if (pre_judgeNum == 2 && transNum == 0) {
            square[1] = square[1] + 1 + gameWidth;
            transNum++;
        } else if (pre_judgeNum == 2 && transNum == 1) {
            square[0] = square[0] - 1 + gameWidth;
            transNum++;
        } else if (pre_judgeNum == 2 && transNum == 2) {
            square[3] = square[3] - 1 - gameWidth;
            transNum++;
        } else if (pre_judgeNum == 2 && transNum == 3) {
            square[0] = square[0] + 1 - gameWidth;
            square[1] = square[1] - 1 - gameWidth;
            square[3] = square[3] + 1 + gameWidth;
            transNum = 0;
        }
        if (pre_judgeNum == 4 && transNum == 0) {
            square[0] = square[0] + 1 - gameWidth;
            square[2] = square[2] - 1 + gameWidth;
            square[3] = square[3] - 2;
            transNum++;
        } else if (pre_judgeNum == 4 && transNum == 1) {
            square[0] = square[0] + 1 + gameWidth;
            square[2] = square[2] - 1 - gameWidth;
            square[3] = square[3] - gameWidth * 2;
            transNum++;
        } else if (pre_judgeNum == 4 && transNum == 2) {
            square[0] = square[0] - 1 + gameWidth;
            square[2] = square[2] + 1 - gameWidth;
            square[3] = square[3] + 2;
            transNum++;
        } else if (pre_judgeNum == 4 && transNum == 3) {
            square[0] = square[0] - 1 - gameWidth;
            square[2] = square[2] + 1 + gameWidth;
            square[3] = square[3] + gameWidth * 2;
            transNum = 0;
        }
        if (pre_judgeNum == 5 && transNum == 0) {
            square[0] = square[0] + 2;
            square[1] = square[1] + 1 + gameWidth;
            square[3] = square[3] + gameWidth - 1;
            transNum++;
        } else if (pre_judgeNum == 5 && transNum == 1) {
            square[0] = square[0] - 2;
            square[1] = square[1] - 1 - gameWidth;
            square[3] = square[3] - gameWidth + 1;
            transNum = 0;
        }
        if (pre_judgeNum == 6 && transNum == 0) {
            square[0] = square[0] + 1 + gameWidth;
            square[2] = square[2] - 1 - gameWidth;
            square[3] = square[3] - gameWidth * 2;
            transNum++;
        } else if (pre_judgeNum == 6 && transNum == 1) {
            square[0] = square[0] - 1 - gameWidth;
            square[2] = square[2] + 1 + gameWidth;
            square[3] = square[3] + 2;
            transNum++;
        } else if (pre_judgeNum == 6 && transNum == 2) {
            square[0] = square[0] + 1 - gameWidth;
            square[2] = square[2] - 1 + gameWidth;
            square[3] = square[3] + 2 * gameWidth;
            transNum++;
        } else if (pre_judgeNum == 6 && transNum == 3) {
            square[0] = square[0] - 1 + gameWidth;
            square[2] = square[2] + 1 - gameWidth;
            square[3] = square[3] - 2;
            transNum = 0;
        }
        if (pre_judgeNum == 7 && transNum == 0) {
            square[1] = square[1] + gameWidth * 2;
            square[2] = square[2] + 2;
            transNum++;
        } else if (pre_judgeNum == 7 && transNum == 1) {
            square[1] = square[1] - gameWidth * 2;
            square[2] = square[2] - 2;
            transNum = 0;
        }
        for (let i = 0; i < 4; i++) {
            for (let t = 1; t < gameHeight; t++) {
                if (square[i] == t * gameWidth + gameWidth - 1 || square[i] == t * gameWidth || isRusqua[square[i]] == 1) {
                    for (let j = 0; j < 4; j++) {
                        square[j] = pre_square[j];
                    }
                    num = 1;
                    transNum = pre_transNum;
                    break;
                }
            }
            for (let t = gameWidth * gameHeight + 1; t < gameWidth * gameHeight + gameWidth - 1; t++) {
                if (square[i] == t) {
                    for (let j = 0; j < 4; j++) {
                        square[j] = pre_square[j];
                    }
                    num = 1;
                    transNum = pre_transNum;
                    break;
                }
            }
            if (num == 1)
                break;
        }
    }

    function Key() {
        document.onkeydown = function (event) {
            for (let i = 0; i < 4; i++)
                pre_square[i] = square[i];
            this.key = event.keyCode;
            switch (this.key) {
                case 37:
                    num = 0;
                    for (let i = 0; i < 4; i++)
                        square[i]--;
                    for (let i = 0; i < 4; i++) {
                        for (let t = 1; t < gameHeight; t++) {
                            if (square[i] == t * gameWidth || isRusqua[square[i]] == 1) {
                                for (let j = 0; j < 4; j++) {
                                    square[j] = pre_square[j];
                                }
                                num = 1;
                                break;
                            }
                        }
                        if (num == 1)
                            break;
                    }
                    break;
                case 39:
                    num = 0;
                    for (let i = 0; i < 4; i++)
                        square[i]++;
                    for (let i = 0; i < 4; i++) {
                        for (let t = 1; t < gameHeight; t++) {
                            if (square[i] == t * gameWidth + gameWidth - 1 || isRusqua[square[i]] == 1) {
                                for (let j = 0; j < 4; j++) {
                                    square[j] = pre_square[j];
                                }
                                num = 1;
                                break;
                            }
                        }
                        if (num == 1)
                            break;
                    }
                    break;
                case 38:
                    Deformation();
                    break;
                case 40:
                    speed = 100;
                    break;
            }
            for (let i = 0; i < 4; i++)
                array[i] = 1;
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    if (pre_square[j] == square[i])
                        array[i] = 0;
                }
            }
            for (let i = 0; i < 4; i++) {
                this.k = 1;
                for (let j = 0; j < 4; j++) {
                    if (pre_square[i] == square[j]) {
                        this.k = 0;
                    }
                }
                if (array[i] == 1)
                    addClass(grid[square[i]], "runColor");
                if (this.k == 1)
                    removeClass(grid[pre_square[i]], "runColor");
            }
        }
    }

    Key.prototype.slowdown = function () {
        document.onkeyup = function (event) {
            this.slow = event.keyCode;
            if (this.slow == 40)
                speed = 300;
        }
    }

    function move() {
        if (run) {
            signNum = 1;
            for (let i = 0; i < 4; i++)
                pre_square[i] = square[i];
            for (let i = 0; i < 4; i++)
                array[i] = 1;
            for (let i = 0; i < 4; i++) {
                square[i] += gameWidth;
                for (let j = 0; j < 4; j++) {
                    if (pre_square[j] == square[i])
                        array[i] = 0;
                }
            }
            clearInterval(timer);
            timer = setInterval(move, speed);
            judge();
            if (signNum == 1) {
                for (let i = 0; i < 4; i++) {
                    this.q = 1;
                    for (let j = 0; j < 4; j++) {
                        if (pre_square[i] == square[j]) {
                            this.q = 0;
                        }
                    }
                    if (array[i] == 1)
                        addClass(grid[square[i]], "runColor");
                    if (this.q == 1)
                        removeClass(grid[pre_square[i]], "runColor");
                }
            }
        }
    }

    function judge() {
        num = 0;
        for (let i = 0; i < 4; i++) {
            for (let j = gameWidth * gameHeight + 1; j < gameWidth * gameHeight + gameWidth - 1; j++) {
                if (square[i] == j) {
                    signNum = 0;
                    clearInterval(timer);
                    num = 1;
                    break;
                }
            }
            for (let j = 0; j < 4; j++) {
                if (isRusqua[square[j]] == 1) {
                    signNum = 0;
                    clearInterval(timer);
                    num = 1;
                    break;
                }
            }
            if (num == 1) {
                for (let t = 0; t < 4; t++) {
                    isRusqua[pre_square[t]] = 1;
                    addClass(grid[pre_square[t]], "stopColor");
                    removeClass(grid[pre_square[t]], "runColor");
                }
                transNum = 0;
                Judge = 1;
                pre_judgeNum = judgeNum;
                eliminate();
                timer = setInterval(function () {
                    if (Judge == 1)
                        rand_Gen();
                    else
                        move();
                }, speed);
                end();
                break;
            }
        }
    }
    function eliminate() {
        let canElirow = [];
        this.canEliminate = false;
        this.index = 0;
        for (let i = gameHeight - 1; i >= 1; i--) {
            this.judgeEliminate = true;
            for (let j = i * gameWidth + 1; j <= i * gameWidth + gameWidth - 2; j++) {
                if (isRusqua[j] != 1) {
                    this.judgeEliminate = false;
                    break;
                }
            }
            if (this.judgeEliminate) {
                canElirow[this.index] = i;
                this.canEliminate = true;
                this.index++;
            }
        }
        if (this.canEliminate) {
            for (let i = 0; i < this.index; i++) {
                for (let j = (canElirow[i] + i) * gameWidth + 1; j <= (canElirow[i] + i) * gameWidth + gameWidth - 2; j++) {
                    removeClass(grid[j], "stopColor");
                    isRusqua[j] = 0;
                }
                for (let t = canElirow[i] + i - 1; t >= 1; t--) {
                    for (let k = t * gameWidth + 1; k <= t * gameWidth + gameWidth - 2; k++) {
                        if (isRusqua[k] == 1) {
                            removeClass(grid[k], "stopColor");
                            isRusqua[k] = 0;
                            isRusqua[k + gameWidth] = 1;
                            if (isRusqua[k + gameWidth] == 1 && k + gameWidth < gameWidth * gameHeight)
                                addClass(grid[k + gameWidth], "stopColor");
                        }
                    }
                }
            }
        }
    }

    function end() {
        for (let i = gameWidth + 1; i < gameWidth * 2; i++) {
            if (isRusqua[i] == 1) {
                clearInterval(timer);
                break;
            }
        }
    }

    function addClass(obj, cn) {
        if (!hasClass(obj, cn))
            obj.className += " " + cn;
    }
    function hasClass(obj, cn) {
        let exp = new RegExp("\\b" + cn + "\\b");
        return exp.test(obj.className);
    }
    function removeClass(obj, cn) {
        let exp = new RegExp("\\b" + cn + "\\b");
        obj.className = obj.className.replace(exp, "");
    }

    function btnEffect (obj){
        addClass(obj, "btn-left-top-shadow")
        removeClass(obj, "btn-right-bottom-shadow");
        obj.onmouseup = function () {
            removeClass(obj, "btn-left-top-shadow");
            addClass(obj, "btn-right-bottom-shadow");
        }     
    }

    img.onload = function () {
        startSakura();
    }

    let gameborder = document.getElementById("gameBorder");
    let tip = document.getElementById("tip");
    let begin = document.getElementById("begin");
    let stopContinue = document.getElementById("stop-continue");
    let musicBox = document.getElementById("musicBox");
    let music = document.getElementsByTagName("audio")[0];
    for (let i = 1; i <= gameHeight + 1; i++) {
        tr = document.createElement("tr");
        gameborder.appendChild(tr);
        for (let j = 1; j <= gameWidth; j++) {
            td = document.createElement("td");
            td.className = "grid";
            tr.appendChild(td);
        }
    }
    for (let i = 1; i <= 4; i++) {
        tr = document.createElement("tr");
        tip.appendChild(tr);
        for (let j = 1; j <= 4; j++) {
            td = document.createElement("td");
            td.className = "Tip";
            tr.appendChild(td);
        }
    }
    let grid = document.getElementsByClassName("grid");
    let Tip = document.getElementsByClassName("Tip");
    let keys = new Key();
    gameBorder();
    Judge = 1;
    if (music.paused)
        musicBox.style.backgroundImage = "url(./pauseMusic.png)";
    else
        musicBox.style.backgroundImage = "url(./playMusic.png)";
    begin.onmousedown = function () {
        if (!timer)
            timer = setInterval(function () {
                if (Judge == 1)
                    rand_Gen();
                else
                    move();
            }, speed);
        Key();
        keys.slowdown();
        btnEffect(begin);
    }
    stopContinue.onmousedown = function () {
        if (run)
            run = false;
        else
            run = true;
            btnEffect(stopContinue);
    }
    musicBox.onmousedown = function () {
        if (music.paused) {
            music.play();
            musicBox.style.backgroundImage = "url(./playMusic.png)";
        }
        else {
            music.pause();
            musicBox.style.backgroundImage = "url(./pauseMusic.png)";
        }
    }
}

