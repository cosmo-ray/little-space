function Monster(x, y, type, move)
{
    this.entity = new Entity(x, y, type.width, type.height,
			     monster_type, type.speed, 2);
    this.type = type;
    this.move = move;
}

Monster.prototype.checkCol = monsterCheckCol;
Monster.prototype.removeLife = removeLife;
Monster.prototype.deathEffects = function () {
    if (Math.floor((Math.random()*100)) < 10)
	createBonus(this);
    effectManager.push(new Effect(this.entity.x, this.entity.y, boum.copy()));
    removeMob(monsterManager.indexOf(this));
    player.score += 1
}

function createBonus(monster)
{
    if (Math.floor((Math.random()*100)) < 70)
	bonusManager.push(new Bonus(bonus, giveMachinGun,
				    monster.entity.x, monster.entity.y));
    else
	bonusManager.push(new Bonus(bonus, giveBeamRifle,
				    monster.entity.x, monster.entity.y));
}

function removeMob(index)
{
    monsterManager.splice(index, 1);
}
