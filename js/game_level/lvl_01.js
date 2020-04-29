/* *
 * ----------------------------------------
 * JS du projet Little Space
 * V0.0.01 | 01052013
 *
 *                                  ==> IN
 * ----------------------------------------
 * */

/* ---------- LVL I Testing ---------- */

var map = new Map("battleThemeA.mp3", true, 2)
var map1 = new Map("battleThemeA.mp3", 2, boss0, boss0_attack)
var next_map = new Map("The Last Encounter (Extended Version).mp3", true);
map.next = map1
map1.next = next_map

/* *
 * ----------------------------------------
 *                                  <== OUT
 * ----------------------------------------
 * */
