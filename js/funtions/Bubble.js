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

function Bubble(type, move, x, y, power, o, isPjBb)
{
    this.entity =
	new Entity(x, y, type.width, type.height, playerBubble_type,
                   type.speed, power, o);
    this.type = type;
    if (typeof(isPjBb) === 'undefined') {
	this.isPjBb = true
	this.checkCol = playerCheckCol
    } else {
	this.isPjBb = false
	this.checkCol = monsterCheckCol
    }
    this.move = move;
}

Bubble.prototype.removeLife = removeLife;
Bubble.prototype.deathEffects = function () {
    if (this.isPjBb)
	removePlayerBullet(playerBulletManager.indexOf(this));
    else
	monsterBulletManager.splice(index, monsterBulletManager.indexOf);
}
