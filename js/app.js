"use strict()";

// Enemies our player must avoid
var Enemy = function() {

    // Instance variables for positioning in 2D
    this.x = this.getInitPositionX();
    this.y = this.getInitPositionY();

    // Movement speed
    this.base_speed = 20;
    this.speed = this.getNewSpeed();
    this.scored = false;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

/**
 * @description Get initial position x value form predefined list
 * of values
 * @return integer value for the x starting position
 * */
Enemy.prototype.getInitPositionX = function() {
   // Acceptable starting positions
   this.x_start_positions = [-180, 140, -90];
   let x_index = Math.floor(Math.random() * 3);

   return this.x_start_positions[x_index];
};

/**
 * @description Get initial position y value from a predefined list
 * of values
 * @returns interget value for the y starting position
 */
Enemy.prototype.getInitPositionY = function() {
    // Acceptable starting y positions
    this.y_start_positions = [45, 135, 220];
    let y_index = Math.floor(Math.random() * 3);

    return this.y_start_positions[y_index];
 };

/**
 * @description Update the enemy's position, required method for game
 * @param dt, a time delta between ticks
 */
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // Reposition sprite to left of the screen
    if(this.x > 505) {
        this.x = (Math.floor(Math.random() * 30) + 10) * -1;
        this.y = this.getInitPositionY();

        this.speed = this.getNewSpeed();
    }
};

/**
 * @description Allows the enemy to change speed to
 * 8-25 times as fast as first trek across screen
 * @returns A value representing the new speed for the Enemy object
 */
Enemy.prototype.getNewSpeed = function() {
    return this.base_speed * (Math.floor(Math.random() * 25) + 8);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/** @description Defines the Player and relevant attributes
 *  @param x_init the initial x position of the player: Default 202
 *  @param y_init the initial y position of the player: Default 300
 */
var Player = function(x_init=202, y_init=300) {

    // Remember the startng x,y position
    this.start_x = x_init;
    this.start_y = y_init;

    // Position values for 2D context
    this.x = this.start_x;
    this.y = this.start_y;

    // Number of pixels the character moves per click in x & y direction
    // These values help keep the player centered on the tiles
    this.x_stride = 101;
    this.y_stride = 86;

    // Players Score
    this.score = 0;

    // image used for the player
    this.sprite = 'images/char-boy.png';
};

// Puts the player back to the starting position
Player.prototype.ResetPosition = function() {
    this.x = this.start_x;
    this.y = this.start_y;
};

// Updates player position
Player.prototype.update = function(dt) {

    // Reached the water
    if(this.y <= -1) {
        this.scored = true;
        this.y = this.start_y;
        this.score += 10;
    }

    // Reposition sprite to stay in bounds
    if(this.y >= 386) {
        this.y = 386;
    }

    // Right side of screen
    if(this.x > 400) {
        this.x = 400;
    }

    // Left side of screen
    if(this.x < 0) {
        this.x = 0;
    }
};

// Draws the player image
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Moves the player based on accepted input values
Player.prototype.handleInput = function(keypressed) {

   switch(keypressed) {
       case 'up':
            this.y -= this.y_stride;
       break;

       case 'down':
            this.y += this.y_stride;
       break;

       case 'left':
            this.x -= this.x_stride;
       break;

       case 'right':
            this.x += this.x_stride;
       break;
   }
};

// Create player and enemies
let allEnemies = [new Enemy(), new Enemy(), new Enemy()];
const player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});