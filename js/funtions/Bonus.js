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

function Bonus(type, bonus, x, y)
{
    this.entity = new Entity
    (
        x,
        y,
        type.width,
        type.height,
        bonus_type,
        type.speed,
    1
    );
    this.type = type;
    this.bonus = bonus;
}

function removeBonus(index)
{
    bonusManager.splice(index, 1);
}

Bonus.prototype.move = verticalLine;
Bonus.prototype.checkCol = bonusCheckCol;
Bonus.prototype.removeLife = function (type) {
    if (type == 2)
	this.bonus();
    removeBonus(bonusManager.indexOf(this));
}

function giveMachinGun()
{
    if (player.nbAmmo(machinGun) > 70)
	player.giveWeapon(machinGun3);
    if (player.nbAmmo(machinGun) > 300)
	player.giveWeapon(machinGun2);
    else
	player.giveWeapon(machinGun);
}

function giveGreaterBonus()
{
    if (Math.floor((Math.random()*100)) < 70) {
	giveMachinGun();
	giveMachinGun();
	giveMachinGun();
    } else {
	player.bombs += 1
    }
}
