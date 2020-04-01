/* *
 * ----------------------------------------
 * JS du projet Little Space
 * V0.0.06 | 08052013
 *                                  ==> IN
 * ----------------------------------------
 * */

function background()
{
    drawing.fillStyle = "#000";
    drawing.fillRect(0, 0, current_screen["width"], current_screen["height"]);
    drawing.drawImage(img_background_testing, 0, 0,
    		      current_screen["width"],
    		      current_screen["height"]);
}

function write_all() // you change this if you want
{
    //drawing.clear()
    print("length: ", monsterManager.length, playerBulletManager.length,
	  bonusManager.length, effectManager.length)

    background();
    player_write();

    for (i = 0; i < monsterManager.length; ++i) {
	draw_entity(monsterManager[i].entity.x, monsterManager[i].entity.y,
		    monsterManager[i].type);
    }
    for (i = 0; i < playerBulletManager.length; ++i) {
	//print("WTF ", i)
	draw_entity(playerBulletManager[i].entity.x,
		    playerBulletManager[i].entity.y,
		    playerBulletManager[i].type);
    }
    for (i = 0; i < bonusManager.length; ++i) {
	draw_entity(bonusManager[i].entity.x, bonusManager[i].entity.y,
		    bonusManager[i].type);
    }
    for (i = 0; i < effectManager.length; ++i) {
	//console.log(effectManager[i].type);
	draw_entity(effectManager[i].entity.x, effectManager[i].entity.y,
		    effectManager[i].type);
    }
}

function draw_entity(x, y, type)
{
    //console.log(type.sprite);
    if (type.spritePos)
	drawing.drawImage(type.sprite
			  , type.spritePos.x, type.spritePos.y
			  , type.spritePos.w, type.spritePos.h
			  , x, y
			  , type.width, type.height);
    else
	drawing.drawImage(type.sprite, x, y, type.width, type.height);
}

function player_write()
{
    print("player: ", player.entity.x, player.entity.y, player.type,
	  current_screen["width"], current_screen["height"])
    draw_entity(player.entity.x, player.entity.y, player.type);
}
