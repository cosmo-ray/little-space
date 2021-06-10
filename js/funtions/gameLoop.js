/* *
 * ----------------------------------------
 * JS du projet Little Space
 * V0.0.01 | 01052013
 * ----------------------------------------
 * */

var beamRifle = new WeaponType(20, simpleFire, 2, 3, beam);
var machinGun = new WeaponType(100, spam2Fire, 1, 2, bubble_testing);
var player = new Player(player_testing, new Weapon(beamRifle));

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
	    if (map.randomMap)
	    {
		map.length = lenght;
		//map.length = 3;
      		//console.log(map.length);
	    } else {
		lenght = map.length
	    }
	    map.genMap();
	    // if you want to stop the sound just comment the below line :)
	    audio.play();
	    animFrame(recursiveAnim);
	    return(!loose);
	});
    };

    var isEnd = false;
    var activateKey = new Array;
    this.activateKey = function() {
	return activateKey
    }
    this.setActivateKey = function(ak) {
	 activateKey = ak
    }
    var partTurnCounter = 0;
    var input = new Input;
    var mouse_on = false
    var mouse_x = 0
    var mouse_y = 0
    var loose = false;

    function initPlayerAction()
    {
	this.x = 0;
	this.y = 0;
	this.shoot = 0;
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
    }

    var playerAction = {
	x:0,
	y:0,
	shoot:false,
	init: initPlayerAction,
	exec: execPlayerAction,
	partExec : partExecPlayerAction
    };

    this.playerAction = function()
    {
	return playerAction;
    }

    this.setPlayerAction = function(pa)
    {
	playerAction.x = pa.x;
	playerAction.y = pa.y;
	playerAction.fire = pa.fire;
    }

    /**
     * Wait for an input and store the input in key if there's one
     */
    function waitKeyDown(event)
    {
	if (event.keyCode === input.shift)
	    player.entity.speed += (player.entity.speed * 2);
	else if (event.keyCode === input.ctrl)
	    player.entity.speed -= (player.entity.speed / 2);
	else if (activateKey.indexOf(event.keyCode) === -1)
	    activateKey.push(event.keyCode);
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
	    while (keyIdx !== -1)
	    {
		activateKey.splice(keyIdx, 1);
		keyIdx = activateKey.indexOf(event.keyCode);
	    }
	}
    }

    function playerTurn(key, index, array)
    {
	switch (key)
	{
	case input.left:
	    playerAction.x -= player.entity.speed;
	    print("playerAction.x: ", playerAction.x)
	    break;
	case input.right:
	    playerAction.x += player.entity.speed;
	    print("playerAction.x: ", playerAction.x)
	    break;
	case input.up:
	    playerAction.y -= player.entity.speed;
	    print("playerAction.y: ", playerAction.x)
	    break;
	case input.down:
	    playerAction.y += player.entity.speed;
	    break;
	case input.space:
	    playerAction.shoot = true;
	    break;
	case input.reorianteRight:
	    player.oriantationShoot = player.reorianteShoot(-10);
	    break;
	case input.reorianteLeft:
	    player.oriantationShoot = player.reorianteShoot(10);
	    break;
	default:
	    //console.log(key);
	    break;
	}
	if (mouse_on) {
	    var spdx = player.entity.speed;
	    var spdy = player.entity.speed;
	    var mv_x = (move_x - player.type.width / 2)
	    var mv_y = (move_y - player.type.height / 2)

	    if (yuiAbs(player.entity.x - mv_x) < spdx)
		spdx = yuiAbs(player.entity.x - mv_x)
	    if (yuiAbs(player.entity.y - mv_y) < spdy)
		spdy = yuiAbs(player.entity.y - mv_y)

	    if (player.entity.x < mv_x) {
		playerAction.x += spdx;
	    } else if (player.entity.x > mv_x) {
		playerAction.x += -spdx;
	    }

	    if (player.entity.y < mv_y) {
		playerAction.y += spdy;
	    } else if (player.entity.y > mv_y) {
		playerAction.y += -spdy;
	    }
	}
    }

    var monsterPartialMovementVal = 0;
    function monsterTurn(monster, index, array)
    {
    }

    function monsterPartTurn(monster, index, array)
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
	monster.move(this.turn, speed);
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
	bonus.move(this.turn, speed);
	var domage = bonus.checkCol();
	if (domage !== 0)
	{
	    bonus.removeLife(domage, speed);
	    return;
	}
    }

    function bonusTurn(bonus, index, array)
    {
    }

    function effectTurn(effect, index, array)
    {
	effect.removeLife();
    }

    function playerBubblePartTurn(bubble, index, array)
    {
	var speed = getAvancement(bubble.entity.speed, tdGetPourcentTurn());
	bubble.move(this.turn, speed);
	if (bubble.checkCol() === true) {
	    bubble.deathEffects();
	}
    }

    function playerBubbleTurn(bubble, index, array)
    {
    }

    function nullTurn()
    {
    }

    var entitysMovementsFunctions = new Array(nullTurn, playerBubbleTurn, bonusTurn, monsterTurn, effectTurn);
    var entitysPartMovementsFunctions = new Array(nullTurn, playerBubblePartTurn, bonusPartTurn, monsterPartTurn, nullTurn);

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
	//console.log(lenght* 1000);
	//console.log(beginTime + timeDiff);
	totTime += ctime - beginTime
	if (totTime >= lenght * 1000) {
	    print("YOU WIN !!!!")
	    return 1;
	}
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
				 map.monsterApparition[that.turn][i2].move)
	    monsterManager.push(nm);
	}
	write_all();
    }

    document.addEventListener('keydown', waitKeyDown, true)
    document.addEventListener('keyup', waitKeyUp, true)

    
    document.addEventListener('mousemove', function (event) {
	mouse_on = true
	move_x = event.offsetX
	move_y = event.offsetY
    });

    document.addEventListener('mousedown', function (event) {
	activateKey.push(input.space);
	move_x = event.offsetX
	move_y = event.offsetY
    });
    document.addEventListener('mouseup', function (event) {
	var keyIdx = activateKey.indexOf(input.space);

	mouse_on = false
	while (keyIdx !== -1)
	{
	    activateKey.splice(keyIdx, 1);
	    keyIdx = activateKey.indexOf(input.space);
	}
    });

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
		if (loose === false && map.next) {
                    print("THER's a NEXT !!!");
                    cleanManager();
                    map = map.next;
                    newLoop = new GameLoop;
		    let ak = gameLoop.activateKey()
		    newLoop.setActivateKey(ak)
		    print(ak)
                    newLoop.exec();
                    return false;
                }

		isEnd = true
		if (is_yirl)
		    var qf = yeGet(attached_wid, "quit")
		    if (qf) {
			yesCall(qf, attached_wid)
		    } else {
			yesCall(ygGet("FinishGame"))
		    }
		return ret;
	    }
	    beginTime += timeDiff;
	    ++that.turn;
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
