
function PosSprite(x, y, w, h)
{
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.copy = function()
    {
	var ret = new PosSprite(this.x, this.y, this.w, this.h);
	return (ret);
    }
}

var img_background_testing = new Image();
img_background_testing.src = 'images/tilesetOpenGameBackground.png';

var img_ship_testing = new Image();
img_ship_testing.src = 'images/Spaceship004.png';

var img_player_testing = new Image();
img_player_testing.src = 'images/set_1080/witch.png'

// --- Explosion
var img_explode_testing = new Image();
img_explode_testing.src = 'images/explosions.png';
var first_boum_pos = new PosSprite(0, 0, 200, 150);

var spell0 = new Image();
spell0.src = 'images/blood-magic/Blood-Magic-Effect_04.png';
print(img_explode_testing.src)

var spell1 = new Image();
spell1.src = 'images/blood-magic/Blood-Magic-Effect_06.png';

var img_bonus = new Image();
img_bonus.src = 'images/crystal-qubodup-ccby3-32-blue.png';
var bonus_pos = new PosSprite(0,0,32,32);
