window.addEventListener("load",function() {
var level = 1;
 //Costanti
 var GAME_WIDTH = 640;
 var GAME_HEIGHT = 360;

 //Il gioco è vivo
 var gameLive = true;

 //I nemici
 var enemies = [
   {
     x: 100, //x coordinate
     y: 100, //y coordinate
     speedY: 2, //speed in Y
     w: 40, //width
     h: 40 //heght
   },
   {
     x: 200,
     y: 0,
     speedY: 2,
     w: 40,
     h: 40
   },
   {
     x: 330,
     y: 100,
     speedY: 3,
     w: 40,
     h: 40
   },
   {
     x: 450,
     y: 100,
     speedY: 5,
     w: 40,
     h: 40
   }
 ];



 var player = {
   x: 10,
   y: 130,
   speedX: 2.5,
   isMoving: 0,
   w: 40,
   h: 40
 };

 //Il cibo
 var goal = {
   x: 530,
   y: 130,
   w: 50,
   h: 36
 }

 var sprites = {};

 var movePlayer = function() {
   player.isMoving = true;
 }

 var stopPlayer = function() {
   player.isMoving = false;
 }

 //Creiamo l'ambiente
 var canvas = document.getElementById("mycanvas");
 var ctx = canvas.getContext("2d");

 //Muoviamo la cloe
 canvas.addEventListener('mousedown', movePlayer);
 canvas.addEventListener('mouseup', stopPlayer);
 canvas.addEventListener('touchstart', movePlayer);
 canvas.addEventListener('touchend', stopPlayer);

 var load = function() {
   sprites.player = new Image();
   sprites.player.src = 'images/cane.jpg';

   sprites.background = new Image();
   sprites.background.src = 'images/floor.png';

   sprites.enemy = new Image();
   sprites.enemy.src = 'images/gatto.jpg';

   sprites.goal = new Image();
   sprites.goal.src = 'images/osso.jpg';
 };

//logica del programma
 var update = function() {

   //controlliamo se collidiamo
   if(checkCollision(player, goal)) {
     //stoppiamo il gioco
       gameLive = false;

       alert("La Cloe potrà mangiare");
 level = level +1;
document.getElementById("level").innerHTML= "Livello " + level;
player.x=10;
player.y=130;
   update();

   }

   //aggiorniamo il giocatore
   if(player.isMoving) {
     player.x = player.x + player.speedX;
   }

   //aggiorniamo nemici
   var i = 0;
   var n = enemies.length;

   enemies.forEach(function(element, index){

     //controlliamo la collisione con i nemici
     if(checkCollision(player, element)) {

       gameLive = false;

       alert('La Cloe è morta di fame!');


       window.location = "";
     }

     //Muoviamo nemici
     element.y += element.speedY;

     //controlliamo i bordi
     if(element.y <= 10) {
       element.y = 10;
                  element.speedY *= -1;
     }
     else if(element.y >= GAME_HEIGHT - 50) {
       element.y = GAME_HEIGHT - 50;
       element.speedY *= -1;
     }
   });
 };

 //Disegna il mondo
 var draw = function() {
   //Pulisce
   ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);

   //background
   ctx.drawImage(sprites.background, 0, 0);

   //giocatore
   ctx.drawImage(sprites.player, player.x, player.y);

   //nemici
   enemies.forEach(function(element, index){
     ctx.drawImage(sprites.enemy, element.x, element.y);
   });

   //cibo
   ctx.drawImage(sprites.goal, goal.x, goal.y);
 };

 //esecuzione
 var step = function() {

   update();
   draw();

   if(gameLive) {
     window.requestAnimationFrame(step);
   }
 };

//Controlla collisione
 var checkCollision = function(rect1, rect2) {

   var closeOnWidth = Math.abs(rect1.x - rect2.x) <= Math.max(rect1.w, rect2.w);
   var closeOnHeight = Math.abs(rect1.y - rect2.y) <= Math.max(rect1.h, rect2.h);
   return closeOnWidth && closeOnHeight;
 }

//inizio
 load();
 step();
});
