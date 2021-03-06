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

var nbPatern = 4;
var maxSize = 10000;
var paterns = new Object();

function    allocAnimation(w_frame, h_frame, number_frame, image, fps)
{
    var sx = 0;
    var sy = 0;
    for (t = 0; t < number_frame ; ++t)
    {
        drawing.drawImage(image, sx, sy, w_frame, h_frame,
			  0, 0, w_frame, h_frame);
        sx = sx + w_frame;
        sy = sy + h_frame;
    }
}

function    addType(width, height, sprite, speed, spritePos)
{
    var ret = new Object();

    ret["width"] = width;
    ret["height"] = height;
    ret["sprite"] = sprite;
    if (spritePos)
	ret["spritePos"] = spritePos;
    else
	ret["spritePos"] = null;
    ret["speed"] = speed;
    ret["copy"] = function()
    {
	return (addType(this.width, this.height, this.sprite,
			this.speed, this.spritePos.copy()));
    }
    return ret;
}

function    Patern()
{
    this.length = 0;
    this.firstApparition = 0;
    this.lastApparition = 0;
    this.monsterApparition = new Array();
    var that = this;
    this.addMob = function(moment, type, movementFunction, x, y)
    {
	if (that.monsterApparition.length == 0 || moment < that.firstApparition)
	    that.firstApparition = moment;
	else (moment > that.lastApparition)
	    that.lastApparition = moment;
	that.length = that.lastApparition - that.firstApparition;
        apparition = new Object();
        apparition["type"] = type;
        apparition["x"] = x;
        apparition['y'] = y;
        apparition['move'] = movementFunction;
        apparition['moment'] = moment;
        that.monsterApparition.push(apparition);
    };
}

function	getPaternFromInt(nbr)
{
    return getPaternFromString("patern" + nbr);
}

function	getPaternFromString(str)
{
    return (paterns[str]);
}

/* ----------
 * Partie : "Map Define"
 * Generation des apparitions
 * ---------- */
function    Map(audio, randomMap, paternFirst, paternLast)
{
    this.randomMap = randomMap;
    this.length;
    this.audio = audio;
    this.monsterApparition = new Array();
    for (i = 0; i < maxSize; ++i)
    {
        this.monsterApparition.push(new Array);
    }

    var that = this;

    this.genMap = function()
    {
	var curTime = 0;
	var totTime = that.length * 10;
	if (!paternFirst)
	    paternFirst = 0
	if (!paternLast)
	    paternLast = nbPatern + 1
	while (curTime < totTime)
	{
	    //console.log(curTime);
	    var patern_id = 0
	    do {
		patern_id = Math.floor((Math.random()*nbPatern)+1)
	    } while (patern_id < paternFirst || patern_id >= paternLast);
	    var patern = getPaternFromInt(patern_id);
	    that.addPatern(curTime, patern);
	    curTime += patern.length;
	}
	//console.log(curTime + " " + totTime);
    }

    this.addMob = function(moment, type, movementFunction, x, y, life, isBoss)
    {
	var apparition = new Object;

	if(typeof(y)==='undefined') y = 0;
	apparition["type"] = type;
	apparition["x"] = x;
	apparition['y'] = y;
	apparition['move'] = movementFunction;
	apparition["isBoss"] = isBoss
	apparition["life"] = life

	this.monsterApparition[moment].push(apparition);
    };

    this.addPatern = function(moment, patern)
    {
	for (i = 0; i < patern.monsterApparition.length; ++i)
	{
	    that.addMob(patern.monsterApparition[i].moment + moment
			, patern.monsterApparition[i].type
			, patern.monsterApparition[i].move
			, patern.monsterApparition[i].x
			, patern.monsterApparition[i].y);
	}
    };
    if (randomMap === 2) {
	var t = paternFirst
	var boss = this.addMob(0, t, paternLast,
			       current_screen["width"] / 2 - (t.width / 2),
			       0, 200, true)
    }

}

/* ---------- ! ---------- */



/* *
 * ---------------------------------------- 
 *                                  <== OUT
 * ---------------------------------------- 
 * */
