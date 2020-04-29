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

var	nbrWeaponTypes = 0;

function WeaponType(name, maxAmunition, fire, rate, domage, bubbleType)
{
    this.maxAmunition = maxAmunition;
    this.fireType = fire;
    this.name = name;
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
    this.amunition = this.type.maxAmunition;
    this.lastShoot = -this.type.rate;
    this.asignAt;
    this.fireType = this.type.fireType;
    this.fire = function(turn)
    {
	this.fireType(turn, this.type.bubbleType);
    }
}
