var	nbrWeaponTypes = 0;

function WeaponType(maxAmunition, fire, rate, domage, bubbleType)
{
    this.maxAmunition = maxAmunition;
    this.fireType = fire;
    this.rate = rate;
    this.life = domage;
    this.bubbleType = bubbleType;
    this.id = nbrWeaponTypes;
    nbrWeaponTypes += 1;
}

function Weapon(type)
{
    this.oriantationShoot = 0;
    this.type = type;
    this.amunition = this.type.maxAmmunition;
    this.lastShoot = -this.type.rate;
    this.asignAt;
    this.fireType = this.type.fireType;
    this.fire = function(turn)
    {
	this.fireType(turn, this.type.bubbleType);
    }
}
