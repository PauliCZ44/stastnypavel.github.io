function main()
{
//Start of KA program

// this will be copy if "fishy" game, where you are bron as a small fish, and have to eat smaller fish to grow. If you try to eat bigger fish you die.
// HOW TO PLAY:
// Move with arrows. If you go to the left or right edge you wil spawn at oposite edge.
// You cannot go below y=0 or y=400.
// By eating smaller enemies you grow.
// Eat bigger enemies to grow faster.
// Have fun, game is dificult. If you want to lover difficulty, change


//TO DO v0.9:
// MOVEMENT of Player               --  DONE
// ADD ENEMIES                      --  DONE
//  --- make infinite enemies       ----- DONE
// ADD Colision system              --  DONE
// ADD score system and size system --  DONE, + modofication DONE
// ADD start adn winnig screen      --  DONE

//TO DO v 1.01:
// Make enemies fo from left and also right  -- DONE
// Give every enemy unique speed  -- DONE
// Modifiy score system so that for bigger fish you gain more score and also grow more.
///-- DONE
// Add to score system for risky eating (eating nearly same fluff as you you gain more score
/// -- DONE
// add sounds - DONE
// add background - space - DONE

// changes to 1.01.02
// made restart with enter. No need to restart the whole game. Hope it wont get buggy :)

//TO DO v. 1.02
// Mobile support -
// restart better


////**** GLOBAL VARIABLES *******/////////
var difficulty = 2;  // 2 === easy ; 1 === normal;
var friction = 0.01;    // frcition slows ball after it stop moving
var moveX =random(0,1);
var moveY =2;
var P1size = 15 * difficulty/1.2;  // orig = 15;
var speed = 1.5;  //basic speed of red fluf - P1
constrain(moveY, -3,3);  //contraint on max speed
var EsizeMax = 85;
var EsizeMin = 2;
var Esize = 1;
var numOfEnemy = 17-(difficulty*2);
var Score = 0;
var LosingSizeEnemy = 0;
var LosingSizePlayer = 0;
var wasEaten = 0;
//time
var startMillis = millis();
var nowMillis = 0+startMillis;
//random number gauss
var generator = new Random(1);
//***    PLAYER    //****
var Player = function (x,y,size){
    this.x = x;
    this.y = y;
    this.img = getImage("avatars/mr-pink");
    this.size=P1size;
};

Player.prototype.draw = function() {
    this.y = constrain(this.y, 0-this.size/1.5, height-this.size/1.5);
    image(this.img, this.x,this.y,this.size,this.size);

};

Player.prototype.up = function(){
         moveY = moveY - 0.02*speed;
         this.y += moveY;
};
Player.prototype.down = function(){
         moveY +=0.02*speed;
         this.y += moveY;
};
Player.prototype.left = function(){
         moveX -=0.02*speed;
         this.x += moveX;
};
Player.prototype.right = function(){
         moveX +=0.02*speed;
         this.x += moveX;
};

Player.prototype.checkEat2 = function(Enemy) {
if (this.x < Enemy.x + Enemy.size*0.7 && this.x + this.size*0.7 > Enemy.x && this.y < Enemy.y + Enemy.size*0.7 && this.y + this.size*0.9 > Enemy.y && wasEaten === 0) {

    if (this.size > Enemy.size){
    playSound(getSound("rpg/battle-swing"));
    var riskadd = Enemy.size/this.size;
    Score = Score +floor((floor(random(1,3))+round(Enemy.size*random(0.8,1.2)))*riskadd*2);
    this.size = this.size+0.2*difficulty+(Enemy.size/this.size)*0.5;  // growing = 0.1 +

    // generating new enemy after eating :
    var nextNum = generator.nextGaussian();
    Enemy.Espeed = random(0.3,0.5)+ abs(nextNum)*0.8;
    Enemy.x = random (450,850);
    Enemy.y = random (20,380);
    Enemy.size = random(EsizeMin+(P1size/5), EsizeMax+(P1size*0.5)); //as                   you grow the enemys are geting bigger
    var LR = floor(random(0,2));
    Enemy.LR = LR;
    // end of generating new enemy

    } else {  //was eaten - die
            LosingSizeEnemy =(round((100*Enemy.size)))/100;      //info for losing screen
            LosingSizePlayer = (round((100*this.size)))/100;    //info for losing screen
            playSound(getSound("rpg/hit-splat"));
            this.size = 0.000001;   //disapearing of player
            this.x = 0;             //disapearing of player
            this.y=0;               //disapearing of player
            moveX = 0;
            moveY =0;
            wasEaten =1;
            }
            }
};
//for multiple keys presed;
var keys = [];

var keyPressed = function() {
  keys[keyCode] = true;
};

var keyReleased = function() {
  keys[keyCode] = false;
};

var player1 = new Player (random(100,300),0);

//***  END OF PLAYER  //****


//***     ENEMY      //****
var Enemy = function (x,y, size,Espeed){            //defining enemy
    this.x = x;
    this.y = y;
    this.size = size;
    if (this.size >  (0.75*EsizeMax)) {
    this.img= getImage("avatars/mr-pink-orange");
    }  else  {this.img = getImage("avatars/mr-pink-green");}
    this.Espeed = Espeed;
    this.LR = 1;
};

Enemy.prototype.draw = function() {
    image(this.img, this.x,this.y,this.size,this.size);
};


var enemy2 = [];                            //making array of enemies
for (var i = 0; i < numOfEnemy; i++) {
    var RandY = random (10,390);
    var RandSize = random (15,50);
    var RandX = random (-1000,-200);
    var Espeed = random (0.3,2.5);
    var nextNum = generator.nextGaussian();
    Espeed = random(0.3,0.5)+ abs(nextNum)*0.8;
    Esize = random(EsizeMin, EsizeMax);
    enemy2.push(new Enemy(RandX,RandY,Esize,Espeed));
}


Enemy.prototype.moveLeft = function() {
    this.x = this.x-this.Espeed;
};
Enemy.prototype.moveRight = function() {
     this.x = this.x+this.Espeed;
};
//*** END OF ENEMY   //****


///**********///**********///
///   DRAWING FUNCTION    /////
///**********///**********///
draw = function() {
            var Bimg=getImage("space/background");
            nowMillis+=1; /// counting milliseconds from start
            //*** TEXT variabless ///***
            var f2 = createFont("Serif");
            var f = createFont("fantasy");
            var f3 = createFont("cursive");
            image(Bimg,0,0,400,400);
            if (keyIsPressed){
            if (keys[UP]) {
                player1.up();
            }
            if (keys[DOWN]) {
                player1.down();
            }
            if (keys[LEFT] && moveX > -5) {
                player1.left();
            }
            if (keys[RIGHT]  && moveX < 5 ) {
                player1.right();
            }
        }
        //****
        //friction conditionals
        //****
        if (moveY > 0.001){
            player1.y += moveY;
            moveY -= friction;
        }
        if (moveY < -0.001){
            player1.y += moveY;
            moveY += friction;
        }
        if (moveX > 0.001){
            player1.x += moveX;
            moveX -= friction;
        }
        if (moveX < -0.001){
            player1.x += moveX;
            moveX += friction;
        }
        player1.draw();

        //RESETING the velocity when crash to UP or DOWN
        if (player1.y >= (400-player1.size/1.5)){
            moveY = -0.7;  // makes it bounce on Y = 400

        }
        if (player1.y <= (0-player1.size/1.5)){  // makes you stop at Y = 0
              moveY = 0.7;
        }
        // Here i should add snaking of player//
        if (player1.x > width+10) {
           player1.x = player1.x-(width+5)-player1.size;
        }
        if (player1.x < -10-player1.size) {
           player1.x = player1.x+(width+5)+player1.size;
        }
        ///////////////////////////////////////
        // Here is SNAKING of enemyes /////
        for (var i = 0; i < enemy2.length; i++){
            enemy2[i].draw();
            player1.checkEat2(enemy2[i]);
            if (enemy2[i].LR === 1) {
                enemy2[i].moveRight();
            } else {
                enemy2[i].moveLeft();
            }
            // SNAKING //
            if  (enemy2[i].x > 400 && enemy2[i].LR === 1){
                var nextNum = generator.nextGaussian();
                enemy2[i].Espeed = random(0.3,0.5)+ abs(nextNum)*0.8;
                enemy2[i].x = random (-550,-130);
                enemy2[i].y = random (-20,380);
                enemy2[i].size = random(EsizeMin+(P1size/5), EsizeMax+(P1size*0.5)); //as                   you grow the enemys are geting bigger
                var LR = floor(random(0,2));
                enemy2[i].LR = LR;
            }else if  (enemy2[i].x < 0-enemy2[i].size && enemy2[i].LR === 0 ){
                var nextNum = generator.nextGaussian();
                enemy2[i].Espeed = random(0.3,0.5)+ abs(nextNum)*0.8;
                enemy2[i].x = random (450,850);
                enemy2[i].y = random (-20,380);
                enemy2[i].size = random(EsizeMin+(P1size/5), EsizeMax+(P1size*0.5)); //as                   you grow the enemys are geting bigger
                var LR = floor(random(0,2));
                enemy2[i].LR = LR;
            }
             if (enemy2[i].size >  (0.75*EsizeMax)) {           // if enemy is big make him green - else orange (at the start its oposite
             enemy2[i].img= getImage("avatars/mr-pink-green");
            }  else  {enemy2[i].img = getImage("avatars/mr-pink-orange");}
        }
        fill(0, 0, 0);
        var sizeToWin = 300;  // SIZE NEEDED TO WIN
        if (player1.size>1 && player1.size<sizeToWin ) {
        textAlign(LEFT, BASELINE);
        fill(0, 0, 0);
        textFont(f2,13);
        text("Your score is: " + Score,5,15);}


     ///*******     W I N N I N G    S C R E E N   ***********////
    if (player1.size>EsizeMax*4) {
        fill(47, 0, 255);
        var finalScore = Score;
        for (var i = 0; i < enemy2.length; i++){
         enemy2[i].y =  -401;
        }
        player1.y = 100;
        player1.x = -50;
        textFont(f2,20);
        text("Your final score was: " + finalScore,150,50);
        fill (21, 0, 250);
        textFont(f);
        textAlign(CENTER, CENTER);
        textSize(80);
        text("YOU WON",200,120);
        textFont(f3,25);
        text("You destroyed the ecosystem and ate all your food. You will starve to death soon :(",0,135,400,140);
        textFont(f);
        textSize(60);
        text("PRESS SPACE\nTO TRY AGAIN !!!!",200,330);
        if(keyIsPressed && keyCode === 0){Program.restart();}
    }


    ///*******  STARTING SCREEN ***///
    //This is millis() when the program first starts up...
            if (nowMillis < startMillis+550 && player1.size>1){
            textAlign(CENTER, CENTER);
            fill(255, 251, 0);
            textFont(f3,20);
            text("Use arrow keys to move around\n\nEat smaller fluffers to GROW!\n\nWatch out for bigger fluffers because they can eat you.\n\n The bigger fluff you eat the more you will grow",0,0,400,350);
            }


    ///*******     L O S I N G     S C R E E N   ***********////
    if (player1.size<1) {

        textFont(f2,20);
        text("Your score was: " + Score,150,25);
        fill (252, 0, 0);
        textFont(f);
        textAlign(CENTER, CENTER);
        textSize(80);
        text("YOU DIED",200,120);
        textFont(f3,30);
        text("That mr.green was \n bigger than you :(",200,190);
        fill(255, 60, 0);
        textFont(f3,22);
        text("Your size: "+LosingSizePlayer+"   Enemy size: "+LosingSizeEnemy,200,245);
        fill (252, 0, 0);
        textFont(f);
        textSize(40);
        text("PRESS ENTER\nTO TRY AGAIN !!!!",200,330);
        fill (200, 200, 200);
        textFont(f);
        textSize(10);
        text("Made by Pavel S",350,390)
        //if(keyIsPressed && keyCode === 0){
          //  Program.restart();}
        if (keyIsPressed){
            if (keys[ENTER]) {
                player1.size=15 * difficulty/1.2;
                player1.x = random(100,300);
                player1.y = 0;
                moveX =random(0,1);
                moveY =2;
                Score = 0;
                wasEaten = 0;
                for (var i = 0; i < enemy2.length; i++){
                    enemy2[i].y = 200;
                    enemy2[i].x = 401;
                    enemy2[i].LR = 1;  //set enemies moving to the left - after that they will generate again
                }
            }
        }
    }
};

//End of KA program

}

createProcessing(main);
