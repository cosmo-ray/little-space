/*           DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *                   Version 2, December 2004
 * 
 *Copyright (C) 2020 Matthias Gatto <uso.cosmo.ray@gmail.com>
 *
 *Everyone is permitted to copy and distribute verbatim or modified
 *copies of this license document, and changing it is allowed as long
 *as the name is changed.
 * 
 *           DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *  TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
 *
 * 0. You just DO WHAT THE FUCK YOU WANT TO.
 */

/*------------------- global function for movement -------------*/

function     initSpeed(speed)
{
    if (!speed)
	return (1);
    return (speed);
}

function	Oriantation(x, y)
{
    this.x = x;
    this.y = y;
}

/*------------------- movement function ------------------------*/

baseOrientation = new Oriantation(0, 1)

function checkOriantation(oriantation)
{
    if (!oriantation)
    {
	return (baseOrientation);
    }
    return oriantation
}

function inversVerticalLine(turn, speed)
{
    var oriantation = this.entity.oriant

    speed = initSpeed(speed);
    oriantation = checkOriantation(oriantation);
    this.entity.y -= speed * oriantation.y;
    this.entity.x -= speed * oriantation.x;
}

function inversToUpLeft(turn, speed)
{
    var oriantation = this.entity.oriant

    speed = initSpeed(speed);
    oriantation = checkOriantation(oriantation);
    this.entity.y -= speed * oriantation.y;
    this.entity.x += (speed * oriantation.y) / 2;
}

function inversToUpRight(turn, speed)
{
    var oriantation = this.entity.oriant

    speed = initSpeed(speed);
    oriantation = checkOriantation(oriantation);
    this.entity.y -= speed * oriantation.y;
    this.entity.x -= (speed * oriantation.y) / 2;
}


function inversToLeft(turn, speed)
{
    var oriantation = this.entity.oriant

    speed = initSpeed(speed);
    oriantation = checkOriantation(oriantation);
    this.entity.y -= speed * oriantation.y;
    this.entity.x += speed * oriantation.y;
}

function inversToRight(turn, speed)
{
    var oriantation = this.entity.oriant

    speed = initSpeed(speed);
    oriantation = checkOriantation(oriantation);
    this.entity.y -= speed * oriantation.y;
    this.entity.x -= speed * oriantation.y;
}

function verticalLine(turn, speed)
{
    var oriantation = this.entity.oriant

    speed = initSpeed(speed);
    oriantation = checkOriantation(oriantation);
    this.entity.y += speed * oriantation.y;
    this.entity.x += speed * oriantation.x;
}

function boss0_attack(turn, speed)
{
    var te = this.entity
    if (!this.acc_y) {
	this.acc_y = 0;
	turn = 0;
	this.dir = 0
    }

    if (this.acc_y < 200) {
	te.y += speed;
	this.acc_y += speed;
    } else if (this.dir == 0) {
	te.x += speed;
	if ((te.x + te.w) > (current_screen["width"]))
	    this.dir = 1
    } else {
	te.x -= speed;
	if (te.x < 0)
	    this.dir = 0
    }

    if ((turn & 7) == 0) {
	var bb = mbubble
	var b = new Bubble(bb, verticalLine,
			   te.x + te.w / 2 - bb.width / 2,
			   te.y + te.h - bb.height,
			   100, null, true)
	monsterBulletManager.push(b);
    }

    if (te.life < 50) {
	var bb = mbubble

	this.type = boss0_hurt
	var o = new Oriantation(0.5 * (turn & 15) , 1)
	var b = new Bubble(bb, verticalLine,
			   te.x + te.w / 2 - bb.width / 2,
			   te.y + te.h - bb.height, 100,
			   o, true)
	monsterBulletManager.push(b);
	var o = new Oriantation(-0.5 * (turn & 15) , 1)
	var b = new Bubble(bb, verticalLine,
			   te.x + te.w / 2 - bb.width / 2,
			   te.y + te.h - bb.height,
			   100, o, true)
	monsterBulletManager.push(b);
    }
}

function verticalShooter(turn, speed)
{
    var oriantation = this.entity.oriant
    var te = this.entity
    var bb = mbubble
    if (turn & 15) {
	var b = new Bubble(bb, verticalLine,
			   te.x + te.w / 2 - bb.width / 2,
			   te.y + te.h, 100, null, true)
	monsterBulletManager.push(b);
    }
    speed = initSpeed(speed);
    oriantation = checkOriantation(oriantation);
    te.y += speed * oriantation.y;
    te.x += speed * oriantation.x;
}

function oddShoot(turn, speed)
{
    var oriantation = this.entity.oriant

    speed = initSpeed(speed);
    oriantation = checkOriantation(oriantation);
    if (!this.entity.acc_x)
	this.entity.acc_x = 0;

    var yadd = speed * oriantation.y;
    this.entity.y -= yadd;

    if (this.entity.acc_x < 70) {
	this.entity.x += speed * oriantation.x;
	this.entity.acc_x += speed;
    }
}

function half_slow_zigzag(turn, speed)
{
    this.verticalLine = verticalLine
    this.zigzag = slow_zigzag
    if (this.entity.y < 200)
	this.verticalLine(turn, speed)
    else
	this.zigzag(turn, speed)
}

function half_zigzag(turn, speed)
{
    this.verticalLine = verticalLine
    this.zigzag = zigzag
    if (this.entity.y < 100)
	this.verticalLine(turn, speed)
    else
	this.zigzag(turn, speed)
}

function zigzag(turn, speed)
{
    var oriantation = this.entity.oriant

    oriantation = checkOriantation(oriantation);
    speed = initSpeed(speed);
    if (this.entity["movementUtil"].length == 0) {
	if ((this.entity.x + this.entity.w) > (current_screen["width"] / 2))
            this.entity["movementUtil"].push(1);
	else
            this.entity["movementUtil"].push(-1);
    }
    if ((this.entity.x + this.entity.w) >= (current_screen["width"] - this.entity.w / 2) ||
	this.entity.x <= this.entity.w / 2)
	this.entity["movementUtil"][0] *= -1;
    if (this.entity["movementUtil"][0] == -1)
	this.entity.x -= (speed * oriantation.y);
    else
	this.entity.x += (speed * oriantation.y);
    this.entity.y += (speed * oriantation.y);
}

function slow_zigzag(turn, speed, oriantation)
{
    var oriantation = checkOriantation(this.entity.oriant);

    speed = initSpeed(speed);
    if (this.entity["movementUtil"].length == 0)
    {
    if (this.entity.x > (current_screen["width"] / 2))
        this.entity["movementUtil"].push(1);
    else
        this.entity["movementUtil"].push(-1);
    }
    if ((this.entity.x + this.entity.w) >= (current_screen["width"] - this.entity.w / 2)  || this.entity.x <= this.entity.w / 2)
	this.entity["movementUtil"][0] *= -1;
    if (this.entity["movementUtil"][0] == -1)
	this.entity.x -= (speed * oriantation.y);
    else
	this.entity.x += (speed * oriantation.y);
    this.entity.y += (speed * oriantation.y) / 4;
}

/* *
 * ---------------------------------------- 
 *                                  <== OUT
 * ---------------------------------------- 
 * */
