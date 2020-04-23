/* *
 * ---------------------------------------- 
 * JS du projet Little Space 
 * V0.0.01 | 10052013 
 * 
 *                                  ==> IN
 * ---------------------------------------- 
 * */

function checkOutBorder(that) {
    return (that.entity.checkButomOutOfMap()
        || that.entity.checkTopOutOfMap()
        || that.entity.checkLeftOutOfMap()
        || that.entity.checkRightOutOfMap());
}

function pCheckOutBorder(that) {
    return (that.entity.pCheckButomOutOfMap()
        || that.entity.pCheckTopOutOfMap()
        || that.entity.pCheckLeftOutOfMap()
        || that.entity.pCheckRightOutOfMap());
}

function checkColWithMidlePlayer(monster, other) {
    return (((monster.entity.x + monster.entity.w) > (other.entity.x + other.entity.w / 2))
	    && (monster.entity.x < (other.entity.x + other.entity.w / 2))
	    && ((monster.entity.y + monster.entity.h) > (other.entity.y + other.entity.h / 2))
	    && (monster.entity.y < (other.entity.y + other.entity.h / 2)));
}

function checkColWithPlayer(monster, other) {
    return (((monster.entity.x + monster.entity.w) > (other.entity.x))
	    && (monster.entity.x < (other.entity.x + other.entity.w))
	    && ((monster.entity.y + monster.entity.h) > (other.entity.y + other.entity.h / 2))
	    && (monster.entity.y < (other.entity.y + other.entity.h / 2)));
}

function playerCheckCol() {
    if (pCheckOutBorder(this))
        return (true);
    return (false);
}

function bonusCheckCol() {
    if (checkOutBorder(this))
	return (1);
    if (checkColWithPlayer(this, player))
    {
	return (2);
    }
    return (0);
}

function monsterCheckCol() {
    if (checkOutBorder(this))
	return (1000);
    if (checkColWithMidlePlayer(this, player))
    {
	player.removeLife(this.entity.life);
	return (player.entity.life);
    }
    for (i = 0; i < playerBulletManager.length; ++i)
    {
	if (checkColWithMidlePlayer(this, playerBulletManager[i]))
	{
	    ret = playerBulletManager[i].entity.life;
	    playerBulletManager[i].removeLife(this.entity.life);
	    this.bullet_hit = true
	    return (ret);
	}
    }
    return (0);
}
