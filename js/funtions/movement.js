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

function reoriante(entity, newOriantation)
{
    var c = entity.type.sprite;
    var ctx=c.getContext("2d");
    //oposite aka sin
    var nX = entity.oriantation.x - newOriantation.x;
    //adj aka cos
    var nY = entity.oriantation.y - newOriantation.y;
    var hyp = Math.sqrt((nX * nX) + (nY * nY));
    //var sin = nX / hyp;
    // i hope it's that
    var cos = nY / hyp;
    var rad = math.acos(cos);
    console.log(rad);
    ctx.rotate(rad);
}

function checkOriantation(oriantation)
{
    if (!oriantation)
    {
	return (new Oriantation(0, 1));
    }
}

function inversVerticalLine(turn, speed, oriantation)
{
    speed = initSpeed(speed);
    oriantation = checkOriantation(oriantation);
    this.entity.y -= speed * oriantation.y;
    this.entity.x -= speed * oriantation.x; 
}

function verticalLine(turn, speed, oriantation)
{
    speed = initSpeed(speed);
    oriantation = checkOriantation(oriantation);
    this.entity.y += speed * oriantation.y;
    this.entity.x += speed * oriantation.x; 
}

function zigzag(turn, speed, oriantation)
{
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
    oriantation = checkOriantation(oriantation);
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
