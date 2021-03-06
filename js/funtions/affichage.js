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

function background()
{
    drawing.fillStyle = "#000";
    drawing.fillRect(0, 0, current_screen["width"], current_screen["height"]);
    drawing.drawImage(img_background_testing, 0, 0,
    		      current_screen["width"],
    		      current_screen["height"]);
}

function draw_text_top(str, pos)
{
    drawing.font="22px Georgia";
    drawing.fillStyle="#FFFFFF";
    drawing.fillText(str, 10, 20 + (18 * pos));
}

function write_all() // you change this if you want
{
    //drawing.clear()
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
    for (i = 0; i < monsterBulletManager.length; ++i) {
	draw_entity(monsterBulletManager[i].entity.x,
		    monsterBulletManager[i].entity.y,
		    monsterBulletManager[i].type);
    }

    draw_text_top("Score: " + player.score, 0);

    draw_text_top("----- Spell -----", 1);
    var i;
    for (i = 0; player.weapons[i]; ++i) {
        if (player.weapons[i].amunition !== null)
            draw_text_top(player.weapons[i].type.name +
			  ": " + player.weapons[i].amunition,
                          2 + i);
        else
            draw_text_top(player.weapons[i].type.name +
			  ": unlimited :)",
                          2 + i);

    }
    draw_text_top("----- Spell -----", 2 + i);
    draw_text_top("My Very Best Friend: " + player.bombs, 3 + i);
    drawing.fillStyle = "#000";
    drawing.fillRect(current_screen["width"] - 200, 10,
		     150, 20);
    var bl = (level_percent * 146 / 100)
    if (map.randomMap === 2) {
	drawing.fillText("Boss !(lvl" + current_level +  "): ",
			 current_screen["width"] - 300, 10);
	bl = map.boss_life * 146 / 200;
    } else {
	drawing.fillText("Level " + current_level +  ": ",
			 current_screen["width"] - 300, 10);
    }
    drawing.fillStyle = "#ffffff";
    drawing.fillRect(current_screen["width"] - 198, 12,
		     bl, 16);
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
    draw_entity(player.entity.x, player.entity.y, player.type);
}
