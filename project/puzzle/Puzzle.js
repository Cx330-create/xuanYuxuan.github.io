window.onload = function () {
    var Encryption = new decode().decode("V293bnV1Xw==");
    while (true) {
        var password = prompt("请输入密码访问该页面.");
        if (password === null) {
            document.body.remove();
            document.documentElement.innerHTML = '<body><p style="font-size: 100px;text-align: center;">验证失败</p><body>';
            break;
        } else if (password != Encryption) {
            alert("密码错误！！请重新输入");
        }else{
            document.body.style.display = "block";
            break;
        }
    }
    var Puzzle = document.getElementById("Puzzle");
    var Puzzle1 = document.getElementById("Puzzle1");
    var Puzzle2 = document.getElementById("Puzzle2");
    var Puzzle3 = document.getElementById("Puzzle3");
    var Puzzle4 = document.getElementById("Puzzle4");
    var Puzzle5 = document.getElementById("Puzzle5");
    var Puzzle6 = document.getElementById("Puzzle6");
    var Puzzle7 = document.getElementById("Puzzle7");
    var Puzzle8 = document.getElementById("Puzzle8");
    var Puzzle9 = document.getElementById("Puzzle9");
    var index = 1;
    var imgArr = ["./Puzzle(6).png",
        "./Puzzle(9).png",
        "./Puzzle(5).png",
        "./Puzzle(4).png",
        "./Puzzle(3).png",
        "./Puzzle(1).png",
        "./Puzzle(8).png",
        "./Puzzle(7).png",
        "./Puzzle(2).png"];
    var imgArr_correct_order = ["./Puzzle(1).png",
        "./Puzzle(2).png",
        "./Puzzle(3).png",
        "./Puzzle(4).png",
        "./Puzzle(5).png",
        "./Puzzle(6).png",
        "./Puzzle(7).png",
        "./Puzzle(8).png",
        "./Puzzle(9).png"];
    var i, Elements_id, Start_left_distance, Start_top_distance;
    Puzzle.onmousedown = function (event) {
        //div的偏移量 鼠标.clientX - 元素.offsetLeft
        //div的偏移量 鼠标.clientY - 元素.offsetTop
        var ol = event.clientX - event.target.offsetLeft;
        var ot = event.clientY - event.target.offsetTop;
        if (Elements_id != event.target.id) {
            if (event.target.id == "Puzzle1") {
                Start_left_distance = "2px";
                Start_top_distance = "2px";
            }
            else if (event.target.id == "Puzzle2") {
                Start_left_distance = "206px";
                Start_top_distance = "2px";
            }
            else if (event.target.id == "Puzzle3") {
                Start_left_distance = "410px";
                Start_top_distance = "2px";
            }
            else if (event.target.id == "Puzzle4") {
                Start_left_distance = "2px";
                Start_top_distance = "206px";
            }
            else if (event.target.id == "Puzzle5") {
                Start_left_distance = "206px";
                Start_top_distance = "206px";
            }
            else if (event.target.id == "Puzzle6") {
                Start_left_distance = "410px";
                Start_top_distance = "206px";
            }
            else if (event.target.id == "Puzzle7") {
                Start_left_distance = "2px";
                Start_top_distance = "410px";
            }
            else if (event.target.id == "Puzzle8") {
                Start_left_distance = "206px";
                Start_top_distance = "410px";
            }
            else if (event.target.id == "Puzzle9") {
                Start_left_distance = "410px";
                Start_top_distance = "410px";
            }
            //使Start_left_distance Start_top_distance 只能被赋一次值
        }
        i = Number(event.target.id.substring(6)) - 1;
        event.target.style.zIndex = index;
        index++;
        document.onmousemove = function (event) {
            //当鼠标移动时被拖拽元素跟随鼠标移动
            //获取鼠标的坐标
            var left = event.clientX - ol;
            var top = event.clientY - ot;
            event.target.style.left = left + "px";
            event.target.style.top = top + "px";
        }
        /*
          当我拖拽一个网页中的内容时,浏览器会默认去搜索引擎中搜索该内容,
          此时会导致拖拽功能的异常,这是浏览器的默认行为,
          如果不希望发生这个行为,可以通过return false来取消默认行为
        */
        return false;
    }
    //鼠标松开事件
    Puzzle.onmouseup = function (event) {
        var left_distance = event.target.offsetLeft;
        var top_distance = event.target.offsetTop;
        var  swap;
        Elements_id = event.target.id;
        if (left_distance >= -8 && left_distance <= 12 && top_distance >= -8 && top_distance <= 12) {
            Puzzle1.src = event.target.src;
            event.target.src = imgArr[0];
            event.target.style.top = Start_top_distance;
            event.target.style.left = Start_left_distance;
            swap = imgArr[0];
            imgArr[0] = imgArr[i];
            imgArr[i] = swap;
        }
        else if (left_distance >= 196 && left_distance <= 216 && top_distance >= -8 && top_distance <= 12) {
            Puzzle2.src = event.target.src;
            event.target.src = imgArr[1];
            event.target.style.top = Start_top_distance;
            event.target.style.left = Start_left_distance;
            swap = imgArr[1];
            imgArr[1] = imgArr[i];
            imgArr[i] = swap;
        }
        else if (left_distance >= 400 && left_distance <= 420 && top_distance >= -8 && top_distance <= 12) {
            Puzzle3.src = event.target.src;
            event.target.src = imgArr[2];
            event.target.style.top = Start_top_distance;
            event.target.style.left = Start_left_distance;
            swap = imgArr[2];
            imgArr[2] = imgArr[i];
            imgArr[i] = swap;
        }
        else if (left_distance >= -8 && left_distance <= 12 && top_distance >= 196 && top_distance <= 216) {
            Puzzle4.src = event.target.src;
            event.target.src = imgArr[3];
            event.target.style.top = Start_top_distance;
            event.target.style.left = Start_left_distance;
            swap = imgArr[3];
            imgArr[3] = imgArr[i];
            imgArr[i] = swap;
        }
        else if (left_distance >= 196 && left_distance <= 216 && top_distance >= 196 && top_distance <= 216) {
            Puzzle5.src = event.target.src;
            event.target.src = imgArr[4];
            event.target.style.top = Start_top_distance;
            event.target.style.left = Start_left_distance;
            swap = imgArr[4];
            imgArr[4] = imgArr[i];
            imgArr[i] = swap;
        }
        else if (left_distance >= 400 && left_distance <= 420 && top_distance >= 196 && top_distance <= 216) {
            Puzzle6.src = event.target.src;
            event.target.src = imgArr[5];
            event.target.style.top = Start_top_distance;
            event.target.style.left = Start_left_distance;
            swap = imgArr[5];
            imgArr[5] = imgArr[i];
            imgArr[i] = swap;
        }
        else if (left_distance >= -8 && left_distance <= 12 && top_distance >= 400 && top_distance <= 420) {
            Puzzle7.src = event.target.src;
            event.target.src = imgArr[6];
            event.target.style.top = Start_top_distance;
            event.target.style.left = Start_left_distance;
            swap = imgArr[6];
            imgArr[6] = imgArr[i];
            imgArr[i] = swap;
        }
        else if (left_distance >= 196 && left_distance <= 216 && top_distance >= 400 && top_distance <= 420) {
            Puzzle8.src = event.target.src;
            event.target.src = imgArr[7];
            event.target.style.top = Start_top_distance;
            event.target.style.left = Start_left_distance;
            swap = imgArr[7];
            imgArr[7] = imgArr[i];
            imgArr[i] = swap;
        }
        else if (left_distance >= 400 && left_distance <= 420 && top_distance >= 400 && top_distance <= 420) {
            Puzzle9.src = event.target.src;
            event.target.src = imgArr[8];
            event.target.style.top = Start_top_distance;
            event.target.style.left = Start_left_distance;
            swap = imgArr[8];
            imgArr[8] = imgArr[i];
            imgArr[i] = swap;
        }
        var j, n = 0;
        var font = document.getElementById("font");
        var imgPathArr = ["." + Puzzle1.src.substring(Puzzle1.src.lastIndexOf("/")),
        "." + Puzzle2.src.substring(Puzzle2.src.lastIndexOf("/")),
        "." + Puzzle3.src.substring(Puzzle3.src.lastIndexOf("/")),
        "." + Puzzle4.src.substring(Puzzle4.src.lastIndexOf("/")),
        "." + Puzzle5.src.substring(Puzzle5.src.lastIndexOf("/")),
        "." + Puzzle6.src.substring(Puzzle6.src.lastIndexOf("/")),
        "." + Puzzle7.src.substring(Puzzle7.src.lastIndexOf("/")),
        "." + Puzzle8.src.substring(Puzzle8.src.lastIndexOf("/")),
        "." + Puzzle9.src.substring(Puzzle9.src.lastIndexOf("/"))
        ];
        for (j = 0; j < 9; j++) {
            if (imgPathArr[j] == imgArr_correct_order[j])
                n++;
            else
                break;
        }
        if (n == 9)
            font.innerText = new decode().decode("5oGt5Zac5L2gLOS9oOW3sue7j+aKiuayiOWtkOWQn+W4iOWnkOaLvOWHuuadpeS6hizlpZblirHluIjlp5DnmoR2eO+8mlppeWlueW8s5biI5aeQ5Zyo562J5L2g5ZOmLOi1tuW/q+ihjOWKqCEhIQ==")
        //想白嫖vx？ 不存在的 赶快去拼图
        //当鼠标松开时元素固定在当前位置
        //取消document的onmousemove事件
        document.onmousemove = null;
        //取消document的onmouseup事件
        document.onmouseup = null;
            
    }
};