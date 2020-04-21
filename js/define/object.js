/* *
 * ----------------------------------------
 * JS du projet Little Space
 * V0.0.01 | 01052013
 *
 *                                  ==> IN
 * ----------------------------------------
 * */

/* ---------- Mob Testing ---------- */

var ship_testing = addType(27, 30, img_ship_testing, 20);
var fast_ship_testing = addType(27, 30, img_ship_testing, 30);

/* ---------- Player Testing ---------- */

var player_testing = addType(30, 60, img_player_testing, 25);

/* ----------- bubble testing  ----------*/

var bubble_testing = addType(34, 37, basicSheet, 35, machin_gun_pos);
var beam = addType(14, 34, basicSheet, 35, laser_gun_pos);


/* ----------- bonus --------------------*/

var bonus = addType(24, 24, img_bonus, 35, bonus_pos);

/*------------ Weapon Type ---------------*/

/*--------------- Effect -----------------*/

var boum = addType(27, 30, img_explode_testing, 10, first_boum_pos.copy());
