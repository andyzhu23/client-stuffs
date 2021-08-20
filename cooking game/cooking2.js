/**
 * cooking 
 * @authors Andy Zhu 
 * @date    2021-08-05 14:45:13
 * @version 1.0.0
 */

var drag = false;
var running = false;
var score = 0;
var finish = true;
var idx;
var moveidx;
var cnt;
var Max = 2;
var vis = []

function random() {
    return Math.floor(Math.random() * recipes.length);
}

function iniRecipes() {
    finish = false;
    cnt = 0;
    vis = [];
    idx = random();
    console.log("idx: " + idx);
    document.getElementById('Recipe').innerHTML = recipes[idx].name;    
    let ans = "";
    for(var i = 0;i<recipes[idx].ingredients.length;i++) {
        let pos
        for(var j = 0;j<ingredients.length;j++) {
            if(recipes[idx].ingredients[i] === ingredients[j]) {
                pos = j;
                break;
            }
        }
        console.log(pos);
        ans += "<div id = -" + pos + ">" + recipes[idx].ingredients[i] + "</div>";
    }
    document.getElementById("list").innerHTML = ans;
}

function finishround() {
    cnt = 0;
    score++;
    document.getElementById('score').innerHTML = score.toString();
    finish = true;
    iniRecipes();
}

document.getElementById("start").addEventListener('click', 
    () => {
        document.getElementById("start").disabled = true;
        let timesRun = 20;
        score = 0;
        document.getElementById('score').innerHTML = score.toString();
        if(running) return;
        iniRecipes();
        let count = setInterval(() => {
            running = true;
            timesRun --;
            document.getElementById("remain").innerHTML = timesRun.toString() + " seconds";
            if(timesRun === 0){
                clearInterval(count);
                running = false;
                document.getElementById("start").disabled = false;
            }
            if(finish) iniRecipes();
        }, 1000); 
    }
);

var ox, oy, x, y;

function inSkillet(x, x1, y) {
    var skillet = document.getElementById('Skillet');
    return (x >= skillet.offsetLeft && x <= skillet.offsetLeft + skillet.offsetWidth
        && y >= skillet.offsetTop && y <= skillet.offsetTop + skillet.offsetHeight) ||
        (x1 >= skillet.offsetLeft && x1 <= skillet.offsetLeft + skillet.offsetWidth
            && y >= skillet.offsetTop && y <= skillet.offsetTop + skillet.offsetHeight);
}

function inBox(x, y) {
    cur = document.getElementById(moveidx.toString());
	return (x >= ox && x <= ox + cur.offsetWidth
        && y >= oy && y <= oy + cur.offsetHeight);
}

function handelup(evt) {
    evt.preventDefault();
    if(!drag) return;
    cur = document.getElementById(moveidx.toString());
    cur.style.left = (ox).toString() + 'px';
    cur.style.top = (oy - 5).toString() + 'px';
    drag = false;

    if(document.getElementById('Skillet').style.backgroundColor == 'red') {
        let flag = true;
        var a = recipes[idx].ingredients;
        for(let j = 0;j<a.length;j++) {
            let i = ingredients.indexOf(recipes[idx].ingredients[j]);
            console.log(i);
            if(i == cur.id) {
                if(!vis[i]){
                    vis[i] = true;
                    cnt++;
                }
                flag = false
                document.getElementById('-' + i.toString()).style.textDecoration = "line-through";
                
                if(cnt == recipes[idx].ingredients.length) finishround();
            }
        }
        console.log(flag);
        if(flag) iniRecipes();
    }
    document.getElementById('Skillet').style.backgroundColor = 'white';
}

function handelmove(evt) {
    if(!running) return;
    if(!drag) return;
    var cur = document.getElementById(moveidx.toString());
    cur.style.left = (ox + evt.clientX - x).toString() + 'px';
    cur.style.top = (oy + evt.clientY - y).toString() + 'px';
    evt.preventDefault();
    if(!running) return;
    if(inSkillet(cur.offsetLeft, cur.offsetLeft + cur.offsetWidth, cur.offsetTop)) {
        document.getElementById('Skillet').style.backgroundColor = 'red';
    } else {
        document.getElementById('Skillet').style.backgroundColor = 'white';
    }
}

function handeldown(evt) {
    if(!running) return;
    evt.preventDefault();
    x = evt.clientX;
    y = evt.clientY;
    for(var i = 0;i<ingredients.length;i++) {
        moveidx = i;
        var cur = document.getElementById(moveidx.toString());
        cur.style.zIndex = (++Max).toString();
        ox = cur.offsetLeft;
        oy = cur.offsetTop;
        if(inBox(evt.clientX, evt.clientY)) {
            console.log("ok")
            drag = true;
            return;
        }
    }
}

document.addEventListener('mousedown', handeldown, false);
document.addEventListener('mouseup', handelup, false);
document.addEventListener('mousemove', handelmove, false);

window.onload = () => {
    let ans = "";
    let top = 85;
    for(var i = 0;i<ingredients.length;i++) {
        ans += "<div class = 'content' id = '" + i.toString() + "'>"
         + ingredients[i] + "</div>";
    }
    document.getElementById('ingredients').innerHTML = ans;
    for(var i = 0;i<ingredients.length;i++, top += 45) {
        document.getElementById(i.toString()).style.top = top.toString() + 'px';
    }
    console.log(document.getElementById('Skillet').offsetLeft);
    console.log(document.getElementById('Skillet').offsetTop);
}
