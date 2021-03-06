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

var beamRifle = new WeaponType("Magic Arrow", null, simpleFire, 2, 3, beam);
var machinGun = new WeaponType("Windy Gatling", 100, spam2Fire, 1, 2, bubble_testing);
var machinGun2 = new WeaponType("Windy Gatling 2", 100, spam2Fire2, 1, 2, bubble_testing);
var machinGun3 = new WeaponType("Storm Gatling2", 30, oddFire, 1, 2, bubble_testing);

var player = new Player(player_testing, beamRifle);
player.giveWeapon(machinGun3);

var current_level = 0
var level_percent = 0

function GameLoop()
{
    var that = this;
    var audio = new Audio();
    var lenght = 20;
    this.turn = 0;
    this.exec = function () {
	audio.src = "./audio/" + map["audio"];
	audio.addEventListener('loadedmetadata', function() {
	    print("AUDIO DUATION: ", lenght, audio.duration)
	    lenght = audio.duration;
	    if (map.randomMap === true)
	    {
		map.length = lenght;
		//map.length = 3;
      		//console.log(map.length);
		map.genMap();
	    }
	    // if you want to stop the sound just comment the below line :)
	    audio.play();
	    animFrame(recursiveAnim);
	    return(!loose);
	});
    };
    player.score = 0

    var isEnd = false;
    var activateKey = new Array;
    var partTurnCounter = 0;
    var input = new Input;
    var loose = false;

    function initPlayerAction()
    {
	this.x = 0;
	this.y = 0;
	this.shoot = 0;
	this.boom = 0;
    }

    var timeDiff = 0;
    var lastDiff = 0;
    var totTime = 0
    var newPartTurn = false;
    var pourcentTurn = 0;
    /**
     * get pourcentage of the turn fron timeDiff
     */
    function tdGetPourcentTurn()
    {
	if (newPartTurn) {
	    pourcentTurn = timeDiff - lastDiff;
	    if (timeDiff >= 100)
		lastDiff = 0;
	    else
		lastDiff = timeDiff;
	    newPartTurn = false;
	}
	return pourcentTurn;
    }

    function getAvancement(value, other)
    {
	return ((value * other) / 100);
    }

    /**
     * fonction call at every partTime
     */
    function partExecPlayerAction()
    {
	var old = player.entity.x;
	player.entity.x += getAvancement(this.x, tdGetPourcentTurn())
	if ((player).checkCol())
	    player.entity.x = old;
	old = player.entity.y;
	player.entity.y += getAvancement(this.y, tdGetPourcentTurn());
	if ((player).checkCol())
	    player.entity.y = old;
	if (player.isDeath)
	    return (player.deathEffects());
    }

    function execPlayerAction()
    {
	if (player.isDeath)
	    return;
	if (this.shoot)
	{
	    player.fire(that.turn, 0);
	}
	if (this.boom && player.bombs) {
	    // My Very Best Friend
	    player.bombs -= 1;

	    for (var i = -1; i < 1; i += 0.1) {
		var pe = player.entity
		playerBulletManager.push(
		    new Bubble(bubble_testing, verticalLine,
			       pe.x + pe.w /  2 - bubble_testing.width / 2,
			       pe.y - bubble_testing.height,
			       2, new Oriantation(i, -1)
			      ));
		playerBulletManager.push(
		    new Bubble(slower_bb, verticalLine,
			       pe.x + pe.w /  2 - slower_bb.width / 2,
			       pe.y - slower_bb.height,
			       2, new Oriantation(i, -1)
			      ));
		playerBulletManager.push(
		    new Bubble(slow_bb, verticalLine,
			       pe.x + pe.w /  2 - slow_bb.width / 2,
			       pe.y - slow_bb.height,
			       2, new Oriantation(i, -1)
			      ));
	    }
	}
    }

    var playerAction = {
	x:0,
	y:0,
	shoot:false,
	boom:false,
	init: initPlayerAction,
	exec: execPlayerAction,
	partExec : partExecPlayerAction
    };

    /**
     * Wait for an input and store the input in key if there's one
     */
    function waitKeyDown(event)
    {
	if (event.keyCode === input.shift)
	    player.entity.speed += (player.entity.speed * 2);
	else if (event.keyCode === input.ctrl)
	    player.entity.speed -= (player.entity.speed / 2);
	else if (activateKey.indexOf(event.keyCode) === -1) {
	    activateKey.push(event.keyCode);
	}
    }

    function waitKeyUp(event)
    {
	var keyIdx = activateKey.indexOf(event.keyCode);
	if (event.keyCode === input.shift)
	    player.entity.speed = player.type.speed;
	else if (event.keyCode === input.ctrl)
	    player.entity.speed = player.type.speed;
	else
	{
	    if (keyIdx < 0)
		abort()
	    activateKey.splice(keyIdx, 1);
	}
    }

    function playerTurn(key, index, array)
    {
	switch (key)
	{
	    case input.left:
	    playerAction.x -= player.entity.speed;
	    break;

	    case input.right:
	    playerAction.x += player.entity.speed;
	    break;

	    case input.up:
	    playerAction.y -= player.entity.speed;
	    break;

	    case input.down:
	    playerAction.y += player.entity.speed;
	    break;

	    case input.space:
	    playerAction.shoot = true;
	    break;

	    case input.x:
	    playerAction.boom = true;
	    break;

	    default:
	    //console.log(key);
	    break;
	}
    }

    var monsterPartialMovementVal = 0;
    function mbPartTurn(monster, index, array)
    {
	var speed = getAvancement(monster.entity.speed, tdGetPourcentTurn());
	monsterPartialMovementVal += speed;
	if (monsterPartialMovementVal < 1)
	{
	    return ;
	}
	if (monsterPartialMovementVal > 1)
	{
	    speed = Math.floor(monsterPartialMovementVal);
	    monsterPartialMovementVal -= Math.floor(monsterPartialMovementVal);
	}
	monster.move(that.turn, speed);
	var domage = monster.checkCol();
	if (domage !== 0)
	{
	    //monster.removeLife(domage);
	    return;
	}
    }

    function monsterPartTurn(monster, index, array)
    {
	var speed = getAvancement(monster.entity.speed, tdGetPourcentTurn());
	monsterPartialMovementVal += speed;
	if (monsterPartialMovementVal < 1)
	{
	    return ;
	}

	if (monster.isBoss)
	    map.boss_life = monster.entity.life

	if (monsterPartialMovementVal > 1)
	{
	    speed = Math.floor(monsterPartialMovementVal);
	    monsterPartialMovementVal -= Math.floor(monsterPartialMovementVal);
	}
	monster.move(that.turn, speed);
	var domage = monster.checkCol();
	if (domage !== 0)
	{
	    monster.removeLife(domage);
	    return;
	}
    }

    function bonusPartTurn(bonus, index, array)
    {
	var speed = getAvancement(bonus.entity.speed, tdGetPourcentTurn());
	bonus.move(that.turn, speed);
	var domage = bonus.checkCol();
	if (domage !== 0)
	{
	    bonus.removeLife(domage, speed);
	    return;
	}
    }

    function effectTurn(effect, index, array)
    {
	effect.removeLife();
    }

    function playerBubblePartTurn(bubble, index, array)
    {
	var speed = getAvancement(bubble.entity.speed, tdGetPourcentTurn());
	bubble.move(that.turn, speed);
	if (bubble.checkCol() === true) {
	    bubble.deathEffects();
	}
    }

    function nullTurn()
    {
    }

    var entitysMovementsFunctions = new Array(nullTurn, nullTurn, nullTurn,
					      nullTurn, effectTurn);
    var entitysPartMovementsFunctions = new Array(mbPartTurn,
						  playerBubblePartTurn,
						  bonusPartTurn,
						  monsterPartTurn, nullTurn);

    this.loseGame = function()
    {
	audio.pause();
	loose = true;
	return 0;
    };
    player.deathEffect = this.loseGame;

    function doPartTurn(isTurn)
    {
	playerAction.init();
	activateKey.forEach(playerTurn);
	playerAction.partExec();
	for(var i = 0; i < entitysManager.length; ++i)
	{
	    entitysManager[i].forEach(entitysPartMovementsFunctions[i]);
	}
	if (isTurn)
	    return doTurn();
	else
	    write_all();
	return false
    }

    function doTurn()
    {
	if (loose)
	    return 2;
	totTime += ctime - beginTime
	if (totTime >= lenght * 1000 || map.win_boss) {
	    print("YOU WIN !!!!")
	    return 1;
	}
	level_percent = totTime * 100 / (lenght * 1000)
	/*player turn*/
	playerAction.exec();
	/*!player turn*/
	for(var i = 0; i < entitysManager.length; ++i)
	{
	    entitysManager[i].forEach(entitysMovementsFunctions[i]);
	}
	for (i2 = 0; i2 < map.monsterApparition[that.turn].length ;++i2) // check if ther's a monster to creat a this moment of the game
	{
	    var nm = new Monster(map.monsterApparition[that.turn][i2].x,
				 map.monsterApparition[that.turn][i2].y,
				 map.monsterApparition[that.turn][i2].type,
				 map.monsterApparition[that.turn][i2].move,
				 map.monsterApparition[that.turn][i2].isBoss,
				 map.monsterApparition[that.turn][i2].life)
	    monsterManager.push(nm);
	    if (nm.isBoss)
		map.boss_life = nm.entity.life
	}
	write_all();
    }

    document.addEventListener('keydown', waitKeyDown, true)
    document.addEventListener('keyup', waitKeyUp, true)

    var beginTime = null;
    var animFrame = window.requestAnimationFrame;
    var ctime = null

    var recursiveAnim = function(time) {
	//alert(Date.now());
	if (!beginTime) beginTime = time
	ctime = time
	newPartTurn = true;
	++partTurnCounter;
	timeDiff = (time - beginTime)
	if (timeDiff >= 100) {
	    ret = doPartTurn(true);
	    if (ret) {
		print("END ???", map.next, map);
		if (loose === false && map.next) {
		    print("THER's a NEXT !!!");
		    current_level += 1;
		    cleanManager();
		    map = map.next;
		    newLoop = new GameLoop;
		    newLoop.exec();
		    return false;
		}
		isEnd = true
		if (is_yirl) {
		    var qf = yeGet(attached_wid, "quit")
		    if (qf) {
			if (yeType(qf) == YSTRING )
			    qf = ygGet(yeGetString(qf));
			yesCall(qf, attached_wid)
		    } else {
			yesCall(ygGet("FinishGame"))
		    }
		}
		return ret;
	    }
	    beginTime += timeDiff;
	    that.turn += 1;
	}
	else
	    doPartTurn(false);
	return (animFrame(recursiveAnim));
    };

    /*var game = setInterval(doTurn, 100);*/
}

// Game Start
var gameLoop = new GameLoop;
gameLoop.exec();
console.log("out of exec");
