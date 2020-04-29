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

function Monster(x, y, type, move, isBoss, life)
{
    if (!life)
	life = 2

    this.entity = new Entity(x, y, type.width, type.height,
			     monster_type, type.speed, life);
    this.type = type;
    this.move = move;
    this.isBoss = isBoss;
}

Monster.prototype.checkCol = monsterCheckCol;
Monster.prototype.removeLife = removeLife;

Monster.prototype.deathEffects = function () {
    if (this.bullet_hit === true)
	player.score += 1
    if (this.isBoss)
	map.win_boss = true;
    if (Math.floor((Math.random()*100)) < 10)
	createBonus(this);
    effectManager.push(new Effect(this.entity.x, this.entity.y, boum.copy()));
    removeMob(monsterManager.indexOf(this));
}

function createBonus(monster)
{
    // TODO upgrade here
    if (Math.floor((Math.random()*100)) < 70)
	bonusManager.push(new Bonus(bonus, giveMachinGun,
				    monster.entity.x, monster.entity.y));
    else
	bonusManager.push(new Bonus(bonus, giveGreaterBonus,
				    monster.entity.x, monster.entity.y));
}

function removeMob(index)
{
    monsterManager.splice(index, 1);
}
