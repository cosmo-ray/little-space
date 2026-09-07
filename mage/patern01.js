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

var patern1 = new Patern;
paterns["patern1"] = patern1;

//Vague I
patern1.addMob(0, ship1, verticalShooter, 70);
patern1.addMob(0, ship_testing, verticalLine, 120);
patern1.addMob(0, ship_testing, verticalLine, 170);
patern1.addMob(0, ship1, verticalShooter, 220);
//Vague II
patern1.addMob(10, fast_ship_testing, slow_zigzag, 100);
patern1.addMob(10, fast_ship_testing, slow_zigzag, 500);
patern1.addMob(10, ship1, zigzag, 300);
patern1.addMob(10, ship1, zigzag, 400);
//Vague III
patern1.addMob(20, ship1, verticalShooter, 270);
patern1.addMob(20, fast_ship_testing, verticalLine, 320);
patern1.addMob(20, fast_ship_testing, verticalLine, 370);
patern1.addMob(20, ship1, verticalShooter, 420);
//Vague IV
patern1.addMob(40, ship1, verticalShooter, 70);
patern1.addMob(40, ship_testing, verticalLine, 220);
patern1.addMob(40, ship_testing, verticalLine, 370);
patern1.addMob(40, ship1, verticalShooter, 520);
