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

/* ---------- LVL I Testing ---------- */

var map = new Map("battleThemeA.mp3", true, 2)
var map1 = new Map("battleThemeA.mp3", 2, boss0, boss0_attack)
var next_map = new Map("The Last Encounter (Extended Version).mp3", true);
map.next = map1
map1.next = next_map

