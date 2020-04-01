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
    player.giveWeapon(new Weapon(machinGun));
}

function giveBeamRifle()
{
    player.giveWeapon(new Weapon(beamRifle));
}
