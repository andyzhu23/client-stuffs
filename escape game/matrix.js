/**
 * make matrix in escape
 * @authors Andy Zhu 
 * @date    2021-08-05 19:31:43
 * @version 1.0.0
 */

var matrix = [
    ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
    ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
    ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
    ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
    ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
    ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
    ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
    ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
    ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
    ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
    
];

function id(x, y) {
    return x * 10 + y;
}

window.onload = () => {
    let ans = "";
    console.log("hello");
    for(var i = 0;i<=9;i++) {
        ans += "<div class = row>";
        for(var j = 0;j<=9;j++) {
            ans += "<span class = cell id = " + id(i, j) + "></span>"
        }
        ans += "</div>";
    }
    document.getElementById('cells').innerHTML = ans;
    for(var i = 0;i<=9;i++) {
        for(var j = 0; j<=9;j++) {
            var cur = document.getElementById(id(i, j).toString());
            cur.style.top = (j * 23 + 100).toString() + 'px';
            cur.style.left = (i * 23 + 100).toString() + 'px';
            cur.style.backgroundColor = 'white';
        }
    }
};

function handelclick(evt) {
    let x = evt.clientX - document.getElementById('cells').offsetLeft;
    let y = evt.clientY - document.getElementById('cells').offsetTop;
    x = parseInt((x - 1) / 23 - 4);
    y = parseInt((y - 1) / 23 - 4);
    console.log(x + " " + y);
    playerMove(x, y);
}

document.getElementById("cells").addEventListener("click", handelclick);