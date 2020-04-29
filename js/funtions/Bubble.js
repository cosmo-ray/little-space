function Bubble(type, move, x, y, power, o, isPjBb)
{
    if (o)
	print("x:", o.x, "y:", o.y)
    this.entity =
	new Entity(x, y, type.width, type.height, playerBubble_type,
                   type.speed, power, o);
    this.type = type;
    if (typeof(isPjBb) === 'undefined') {
	this.isPjBb = true
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
