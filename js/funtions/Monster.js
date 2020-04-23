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
    if (this.bullet_hit === true)
	player.score += 1
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
