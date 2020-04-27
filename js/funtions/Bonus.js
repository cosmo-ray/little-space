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
    giveMachinGun();
    giveMachinGun();
    giveMachinGun();
}
