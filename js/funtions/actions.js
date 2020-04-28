/* *
 * ----------------------------------------
 * JS du projet Little Space
 * V0.0.04 | 26042013
 * ----------------------------------------
 * */

/*"const" valure*/
var monster_type = 0;
var monsterBubble_type = 1;
var player_type = 2;
var playerBubble_type = 3;
var bonus_type = 4;
var effect_type = 5;

/*!"const" valure*/
var monsterManager = new Array();
var monsterBulletManager = new Array();
var playerBulletManager = new Array();
var bonusManager = new Array();
var effectManager = new Array();

var entitysManager = new Array(monsterBulletManager, playerBulletManager, bonusManager, monsterManager, effectManager);

function cleanManager()
{
    playerBulletManager.splice(0,playerBulletManager.length)
    monsterBulletManager.splice(0,monsterBulletManager.length)
    while(monsterManager.length > 0) {
	monsterManager[0].deathEffects()
    }
    for (i = 0; i < player.weapons.length; ++i)
	player.weapons[i].lastShoot = -player.weapons[i].type.rate;
}

function Entity(x, y, w, h, type, speed, life, oriantation)
{
    //print("new entity: ", x, y, w, h, type, speed, life, oriantation)
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.type = type;
    this.movementUtil = new Array;
    this.speed = speed;
    this.life = life;
    this.oriant = oriantation;
}

Entity.prototype.pCheckButomOutOfMap = function () {
    return ((this.y) > (current_screen["height"] - this.h));
};

Entity.prototype.pCheckTopOutOfMap = function () {
    return ((this.y) < 0);
};

Entity.prototype.pCheckLeftOutOfMap = function () {
    return ((this.x) < 0);
};

Entity.prototype.pCheckRightOutOfMap = function () {
    return ((this.x) > (current_screen["width"] - this.w));
};

Entity.prototype.checkButomOutOfMap = function () {
    return ((this.y) > current_screen["height"]);
};

Entity.prototype.checkTopOutOfMap = function () {
    return ((this.y + this.h) < 0);
};

Entity.prototype.checkLeftOutOfMap = function () {
    return ((this.x + this.w) < 0);
};

Entity.prototype.checkRightOutOfMap = function () {
    return ((this.x) > current_screen["width"]);
};


function decreaseAmunition(t, nb)
{
    if (t.amunition !== null) {
	t.amunition -= nb;
    }
    if (t.amunition < 0)
	t.amunition = 0;
}

function simpleFire(turn, typeBubble)
{
    if (!typeBubble)
	typeBubble = bubble_testing;
    if (this.amunition == 0)
	return;
    print(this.amunition, this.name)
    if ((turn - this.lastShoot) >  this.type.rate)
    {
	this.lastShoot = turn;
	decreaseAmunition(this, 1)
	if (this.asignAt.type == player_type)
            var line = inversVerticalLine;
	else
            var line = verticalLine;
	var bubble = new Bubble(typeBubble,
				line,
				this.asignAt.x + this.asignAt.w / 2 - typeBubble.width / 2,
				this.asignAt.y - typeBubble.height,
				this.type.life
			       )
	if (this.asignAt.type == player_type)
            playerBulletManager.push(bubble);
    }
}


function oddFire(turn, typeBubble)
{
    if (!typeBubble)
	typeBubble = bubble_testing;
    if (this.amunition == 0)
	return;
    print(this.amunition, this.name)
    if ((turn - this.lastShoot) >  this.type.rate)
    {
	this.lastShoot = turn;
	decreaseAmunition(this, 2)
	if (this.asignAt.type == player_type)
            var line = oddShoot;
	var bubble = new Bubble(typeBubble,
				line, this.asignAt.x + this.asignAt.w /
				2 - typeBubble.width / 2,
				this.asignAt.y - typeBubble.height,
				this.type.life, new Oriantation(-1, 1)
			       );
        playerBulletManager.push(bubble);
	var bubble = new Bubble(typeBubble,
				line, this.asignAt.x + this.asignAt.w /
				2 - typeBubble.width / 2,
				this.asignAt.y - typeBubble.height,
				this.type.life, new Oriantation(1, 1)
			       );
        playerBulletManager.push(bubble);
    }
}


function spam2Fire2(turn, typeBubble)
{
    if (this.amunition == 0)
	return;
    if ((turn - this.lastShoot) >  this.type.rate)
    {
	this.lastShoot = turn;
	decreaseAmunition(this, 2)

	if (this.asignAt.type != player_type)
	    abort();
	var lf = inversToUpLeft

	if (player.entity.speed < 20)
	    lf = inversToLeft
	playerBulletManager.push(
	    new Bubble(typeBubble, lf,
		       this.asignAt.x + this.asignAt.w / 2 - typeBubble.width / 2,
		       this.asignAt.y - typeBubble.height,
		       this.type.life));
	var rf = inversToUpRight

	if (player.entity.speed < 20)
	    rf = inversToRight
	playerBulletManager.push(
	    new Bubble(typeBubble,
		       rf,
		       this.asignAt.x + this.asignAt.w / 2 - typeBubble.width / 2,
		       this.asignAt.y - typeBubble.height,
		       this.type.life));
    }
}

function spam2Fire(turn, typeBubble)
{
    if (this.amunition == 0)
	return;
    if ((turn - this.lastShoot) >  this.type.rate)
    {
	this.lastShoot = turn;
	decreaseAmunition(this, 2)

	if (this.asignAt.type != player_type)
	    abort();
	var lf = inversToLeft

	if (player.entity.speed < 20)
	    lf = inversToUpLeft
	playerBulletManager.push(
	    new Bubble(typeBubble, lf,
		       this.asignAt.x + this.asignAt.w / 2 - typeBubble.width / 2,
		       this.asignAt.y - typeBubble.height,
		       this.type.life));
	var rf = inversToRight

	if (player.entity.speed < 20)
	    rf = inversToUpRight
	playerBulletManager.push(
	    new Bubble(typeBubble,
		       rf,
		       this.asignAt.x + this.asignAt.w / 2 - typeBubble.width / 2,
		       this.asignAt.y - typeBubble.height,
		       this.type.life));
    }
}

function removeLife(number) {
    this.entity.life -= number;
    if (this.entity.life <= 0)
	this.deathEffects();
};

/* *
 * ---------------------------------------- 
 *                                  <== OUT
 * ---------------------------------------- 
 * */
