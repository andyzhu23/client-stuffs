/**
 * Description
 * @authors Andy Zhu 
 * @date    2021-07-17 20:21:06
 * @version 1.0.0
 */

 var num = ["", "3.png","5.png","4.png","1.png","2.png","6.png"];
 var active = [false, false, false, false, false, false, false];
 var finish = [false, false, false, false, false, false, false];
 var tot = 0;


 function shuffle() {
    for(let cnt = 1;cnt<=10;cnt++) {
        for(let i = 1;i<=6;i++) {
            let tmp = num[i];
            let rnd = Math.floor(Math.random() * 6) + 1;
            num[i] = num[rnd];
            num[rnd] = tmp;
            finish[i] = false;
        }
    }
 }


 window.onload = shuffle();
 
 document.getElementById("restart").addEventListener("click", 
     () => {
         document.getElementById("1").src = "back.png";
         document.getElementById("2").src = "back.png";
         document.getElementById("3").src = "back.png";
         document.getElementById("4").src = "back.png";
         document.getElementById("5").src = "back.png";
         document.getElementById("6").src = "back.png";
         shuffle();
     }
 );
 
 function check() {
     for(var i = 1;i<=6;i++) {
         for(var j = 1;j<=6;j++) {
             if(active[i] && active[j]) {
                 if(num[i] == "1.png" && num[j] == "2.png") {
                     document.getElementById(String(i)).src = "clear.png";
                     document.getElementById(String(j)).src = "clear.png";
                     active[i] = active[j] = false;
                     finish[i] = finish[j] = true;
                 }else if(num[i] == "3.png" && num[j] == "4.png") {
                     document.getElementById(String(i)).src = "clear.png";
                     document.getElementById(String(j)).src = "clear.png";
                     active[i] = active[j] = false;
                     finish[i] = finish[j] = true;
                 }else if(num[i] == "5.png" && num[j] == "6.png") {
                     document.getElementById(String(i)).src = "clear.png";
                     document.getElementById(String(j)).src = "clear.png";
                     active[i] = active[j] = false;
                     finish[i] = finish[j] = true;
                 }
             }
         }
     }
 }
 
 document.getElementById("1").addEventListener("click", 
     () => {
         if(finish[1] || tot >= 2) return;
         tot++;
         document.getElementById("1").src = num[1];
         active[1] = true;
         setTimeout(function(){
             check();
             if(active[1]) document.getElementById("1").src = "back.png";
             active[1] = false;
             tot--;
         }, 1500);
     }
 );
 
 document.getElementById("2").addEventListener("click", 
     () => {
         if(finish[2] || tot >= 2) return;
         tot++;
         document.getElementById("2").src = num[2];
         active[2] = true;
         setTimeout(function(){
             check();
             if(active[2]) document.getElementById("2").src = "back.png";
             active[2] = false;
             tot--;
         }, 1500);
     }
 );
 
 document.getElementById("3").addEventListener("click", 
     () => {
         if(finish[3] || tot >= 2) return;
         tot++;
         document.getElementById("3").src = num[3];
         active[3] = true;
         setTimeout(function(){
             check();
             if(active[3]) document.getElementById("3").src = "back.png";
             active[3] = false;
             tot--;
         }, 1500);
     }
 );
 
 document.getElementById("4").addEventListener("click", 
     () => {
         if(finish[4] || tot >= 2) return;
         tot ++;
         document.getElementById("4").src = num[4];
         active[4] = true;
         setTimeout(function(){
             check();
             if(active[4]) document.getElementById("4").src = "back.png";
             active[4] = false;
             tot--;
         }, 1500);
     }
 );
 
 document.getElementById("5").addEventListener("click", 
     () => {
         if(finish[5] || tot >= 2) return;
         tot++;
         document.getElementById("5").src = num[5];
         active[5] = true;
         setTimeout(function(){
             check();
             if(active[5]) document.getElementById("5").src = "back.png";
             active[5] = false;
             tot--;
         }, 1500);
     }
 );
 
 document.getElementById("6").addEventListener("click", 
     () => {
         if(finish[6] || tot >= 2) return;
         tot++;
         document.getElementById("6").src = num[6];
         active[6] = true;
         setTimeout(function(){
             check();
             if(active[6]) document.getElementById("6").src = "back.png";
             active[6] = false;
             tot--;
         }, 1500);
     }
 );