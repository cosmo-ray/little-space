/* *
 * ---------------------------------------- 
 * JS du projet Little Space 
 * V0.0.03 | 01052013 
 * 
 *                                  ==> IN
 * ---------------------------------------- 
 * */

/* ---------- Chargement background ---------- */

var img_background_testing = new Image();
img_background_testing.src = 'images/set_1080/background/background_set.png';

/* ---------- Chargement mods ---------- */

var img_ship_testing = new Image();
img_ship_testing.src = 'images/set_320/ia_ship/testing.png';

/* ---------- Chargement player ---------- */

var img_player_testing = new Image();
img_player_testing.src = 'images/set_320/player_ship/testing.png';

/* ---------- Chargement effets ---------- */

// --- Explosion
var img_explode_testing = new Image();
img_explode_testing.src = 'images/set_320/effects/Explode_testing.png';

/* ---------- Chargement armes ---------- */

// --- Lasers
var basicSheet = new Image();
basicSheet.src = 'images/set_1080/image_set.png';
var machin_gun_pos = new PosSprite(0,50,50,50);
var laser_gun_pos = new PosSprite(60,140,30,100);
var lgatlin_gun_pos = new PosSprite(0,100,50,50);
var first_boum_pos = new PosSprite(0, 0, 43, 42);

var img_bonus = new Image();
img_bonus.src = 'images/set_1080/effects/001.png';
