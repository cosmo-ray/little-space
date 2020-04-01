/**
 * creat the player and pos it at the middle fo the screen
 */
function Player(type, weapon)
{
    var that = this;

    this.entity = new Entity
    (
        current_screen["width"] / 2 - (type.width / 2), // X
        current_screen["height"] - (type.height), //Y
        type.width,
        type.height,
        player_type,
        type.speed,
	1
    );

    this.type = type;
    this.checkCol = playerCheckCol;
    this.isDeath = false;
    this.weapons = new Array();
    this.deathEffect = null;

    this.reorianteShoot = function(pourcent)
    {
	for (i = 0; i < that.weapons.length; ++i)
	{
	    that.weapons[i].oriantationShoot += pourcent;
	}
    }

    this.fire = function(turn, dispatchShoot)
    {
	for (i = 0; i < that.weapons.length; ++i)
	{
	    that.weapons[i].fire(turn);
	}
    }

    this.giveWeapon = function(weapon)
    {
	weapon.asignAt = this.entity;
	for (i = 0; i < this.weapons.length; ++i)
	{
	    if (this.weapons[i].type.id == weapon.type.id)
	    {
		delete this.weapons[i];
		this.weapons[i] = weapon;
		return;
	    }
	}
	this.weapons.push(weapon);
    }
    this.giveWeapon(weapon);
}

Player.prototype.removeLife = removeLife;
Player.prototype.deathEffects = function () {
    var x = this.entity.x - ((this.type.height - this.type.width) / 2);

    print("DEAD EFFECT !!!")
    if (!this.isDeath) {
	var playerBoum = new Effect(x, this.entity.y, boum.copy(),
				    this.deathEffect);
	this.isDeath = true;
    }
    else
	var playerBoum = new Effect(x, this.entity.y, boum.copy());
    playerBoum.type.width = this.type.height;
    playerBoum.type.height = this.type.height;
    effectManager.push(playerBoum);
}

function removePlayerBullet(index)
{
    playerBulletManager.splice(index, 1);
}
