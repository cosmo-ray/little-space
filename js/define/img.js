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

function PosSprite(x, y, w, h)
{
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.copy = function()
    {
	var ret = new PosSprite(this.x, this.y, this.w, this.h);
	return (ret);
    }
}

var img_background_testing = new Image();
img_background_testing.src = 'images/tilesetOpenGameBackground.png';

var img_ship_testing = new Image();
img_ship_testing.src = 'images/Spaceship004.png';

var img_ship1 = new Image();
img_ship1.src = 'images/Spaceship005.png';

var img_boss = new Image();
img_boss.src = 'images/boss0.png';
var img_boss_hurt = new Image();
img_boss_hurt.src = 'images/boss0-1.png';

var img_player_testing = new Image();
img_player_testing.src = 'rms.png'

// --- Explosion
var img_explode_testing = new Image();
img_explode_testing.src = 'images/explosions.png';
var first_boum_pos = new PosSprite(0, 0, 190, 150);

var spell0 = new Image();
spell0.src = 'images/blood-magic/Blood-Magic-Effect_04.png';

var spell1 = new Image();
spell1.src = 'images/blood-magic/Blood-Magic-Effect_06.png';

var m_spell = new Image();
m_spell.src = 'images/blood-magic/Blood-Magic-Effect_22.png';

var img_bonus = new Image();
img_bonus.src = 'gnu_icon.png';
