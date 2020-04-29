/* *
 * ----------------------------------------
 * JS du projet Little Space
 * V0.0.01 | 07052013
 *
 *                                  ==> IN
 * ----------------------------------------
 * */

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

function verticalShooter(turn, speed)
{
    var oriantation = this.entity.oriant
    var te = this.entity
    var bb = mbubble
    if (typeof(this.shoot_cnt) === 'undefined') {
	this.shoot_cnt = 0;
    } else {
	this.shoot_cnt += 1
    }
    if (this.shoot_cnt == 1) {
	print("Monster shoot !!!!!")
	var b = new Bubble(bb, verticalLine, te.x + te.w / 2 - bb.width / 2,
			   te.y - bb.height, 100, null, true)
	monsterBulletManager.push(b);
    }
    this.shoot_cnt = this.shoot_cnt & 15;
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

function zigzag(turn, speed)
{
    var oriantation = this.entity.oriant

    oriantation = checkOriantation(oriantation);
    speed = initSpeed(speed);
    if (this.entity["movementUtil"].length == 0)
    {
    if ((this.entity.x + this.entity.w) > (current_screen["width"] / 2))
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
