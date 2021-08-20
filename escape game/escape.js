/**
 * escape
 * @authors Andy Zhu 
 * @date    2021-08-05 19:27:14
 * @version 1.0.0
 */

var dif;
var robot = [];
var move = 0;
var turn = 1;
var exit;
var player;

function rand() {
    return Math.floor(Math.random() * 9);
}

function setRobot(i) {
    while(true) {
        let x = rand();
        let y = rand();
        if(document.getElementById(id(x, y).toString()).style.backgroundColor == 'white') {
            console.log(x + " " + y);
            robot[i] = [x, y];
            document.getElementById(id(x, y).toString()).style.backgroundColor = 'red';
            break;
        } 
    }
}

document.getElementById("start").addEventListener("click", () => {
    dif = document.getElementById("dif").value;
    document.getElementById("setup").style.display = "none";
    document.getElementById("main").style.display = "grid";
    console.log(dif);
    let y = rand();
    matrix[y][0] = 'green';
    document.getElementById(id(y, 0).toString()).style.backgroundColor = 'green';
    exit = [y, 0];
    y = rand();
    matrix[y][9] = 'blue';
    player = [y, 9];
    document.getElementById(id(y, 9).toString()).style.backgroundColor = 'blue';
    for(var i = 0;i<dif;i++) {
        setRobot(i);
    }
});

document.getElementById("roll").addEventListener("click", () => {
    move = Math.floor(Math.random() * 6) + 1;
    document.getElementById("move").innerHTML = "Moves Left for Turn: " + move;
});

function playerMove(x, y) {
    if(move <= 0) return;
    console.log(player[0] + " " + player[1]);
    if(Math.abs(player[0] - x + player[1] - y) == 1 && document.getElementById(id(x, y)).style.backgroundColor != 'red') {
        console.log(document.getElementById(id(player[0], player[1]).toString()).backgroundColor);
        document.getElementById(id(player[0], player[1]).toString()).style.backgroundColor = "white";
        matrix[player[1]][player[0]] = "white";
        player[0] = x;
        player[1] = y;
        document.getElementById(id(player[0], player[1]).toString()).style.backgroundColor = "blue";
        move--;
        document.getElementById("move").innerHTML = "Moves Left for Turn: " + move; 
    }
    if(player[0] == exit[0] && player[1] == exit[1]) {
        document.getElementById(id(player[0], player[1]).toString()).style.backgroundColor = "green";
        document.getElementById('win').style.display = 'grid';
        return;
    }
    if(move == 0) {
        setTimeout(() => {
            moveRobot();
        }, 1000);
    }
}

function moveRobot() {
    document.getElementById('turn').innerHTML = "Current Turn: " + (++turn).toString();
    for(var i = 0;i<dif;i++) {
        document.getElementById(id(robot[i][0], robot[i][1]).toString()).style.backgroundColor = "white";
    }
    for(var i = 0;i<dif;i++) {
        var x = robot[i][0];
        var y = robot[i][1];
        if(robot[i][0] != player[0]) {
            x = robot[i][0] + (robot[i][0] > player[0] ? -1 : 1);
        }
        if(robot[i][1] != player[1]) {
            y = robot[i][1] + (robot[i][1] > player[1] ? -1 : 1);
        }
        // need to turn the red into the ones before instead of all red
        if(document.getElementById(id(x, y).toString()).style.backgroundColor == 'red'
        || document.getElementById(id(x, y).toString()).style.backgroundColor == 'green') {
            x = robot[i][0];
            y = robot[i][1];
            console.log("blocked")
        }
        document.getElementById(id(x, y).toString()).style.backgroundColor = "red";
        robot[i][0] = x;
        robot[i][1] = y;
    }
    var flag = false;
    for(var i = 0;i<dif;i++) {
        var x = robot[i][0];
        var y = robot[i][1];
        for(var j = 0;j<10;j++) {
            var cell = document.getElementById(id(x, j).toString());
            if(cell.style.backgroundColor == 'white') cell.style.backgroundColor = 'yellow';
            var cell = document.getElementById(id(j, y).toString());
            if(cell.style.backgroundColor == 'white') cell.style.backgroundColor = 'yellow';

            if((player[0] == x && player[1] == j) || (player[0] == j && player[1] == y)) {
                flag = true;
            }
        }
    }
    setTimeout(() => {
        for(var i = 0;i<10;i++) {
            for(var j = 0;j<10;j++) { 
                var cell = document.getElementById(id(i, j).toString());
                if(cell.style.backgroundColor == 'yellow') {
                    cell.style.backgroundColor = 'white';
                }
            }
        }
        if(flag) {
            document.getElementById('lose').style.display = 'grid';
        }
    }, 1000);
}