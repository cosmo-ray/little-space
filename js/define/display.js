/* *
 * JS du projet Little Space
 * V0.0.04 | 08052013
 * */

if (is_yirl) {
    document.mk_elem("drawing")
}
/* ---------- Coeur ---------- */

var canvas = document.getElementById("drawing");
if(!canvas)
{
    alert("Erreur avec le canvas");
}

var drawing = canvas.getContext('2d');
if(!drawing)
{
    alert("Erreur avec le context du canvas");
}

/* ---------- Recuperation du window ---------- */

var fenetre = new Array();
fenetre["width"] = (window.innerWidth);
fenetre["height"] = (window.innerHeight);

/* ---------- Affichage Keon ---------- */

var drawing_keon = new Array();

if (is_yirl) {
    drawing_keon["width"] = 400;
    drawing_keon["height"] = 600;
} else {
    drawing_keon["width"] = 480;
    drawing_keon["height"] = 800;
}

var current_screen = drawing_keon;

print("inside yirl: ", is_yirl)

// For fullScreen and center
if (!is_yirl) {
    var scale = scale_calc(fenetre, current_screen);
    var scaleCor = ((current_screen["width"] * scale) -
		    current_screen["width"]) / 2;
    var centerH = ((current_screen["height"] * scale) -
		   current_screen["height"]) / 2;
    var centerW = (fenetre["width"] - (current_screen["width"] * scale)) /
	2 + scaleCor;

    secCorp.style.cssText='transform: scale('+scale+'); -webkit-transform: scale('+scale+'); left: '+centerW+'px; top: '+centerH+'px; height: '+current_screen["height"]+'px; width: '+current_screen["width"]+'px;';

}

