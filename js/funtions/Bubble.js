function Bubble(type, move, x, y, power)
{
    this.entity = new Entity(x,
                 y,
                 type.width,
                 type.height,
                 playerBubble_type,
                 type.speed,
                 power);
    this.type = type;
    this.move = move;
}

Bubble.prototype.removeLife = removeLife;
Bubble.prototype.deathEffects = function () {
    removePlayerBullet(playerBulletManager.indexOf(this));
}
