function Effect(x, y, type, sideEffect)
{
    this.entity = new Entity(x, y, type.width, type.height, effect_type, type.speed, 2);
    this.type = type;
    this.spriteDuration = 2;
    this.curSpDuration = this.spriteDuration;
    this.nbSprites = 6;
    this.curNbSprites = 1;
    if (sideEffect)
	this.sideEffect = sideEffect;
    else
	this.sideEffect = null;
    this.removeLife = function()
    {
	this.curSpDuration -= 1;
	if (this.curSpDuration == 0)
	{
	    this.curSpDuration = this.spriteDuration;
	    this.curNbSprites += 1;
	    this.type.spritePos.x += this.type.spritePos.w;
	    if (this.curNbSprites > this.nbSprites)
	    {
		effectManager.splice(effectManager.indexOf(this), 1);
		if (this.sideEffect != null)
		    this.sideEffect()
	    }
	}
    }
}
