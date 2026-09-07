function ctx2d()
{
}

var cur_ctx2d = new ctx2d()
var ctx2d_stack = {}
var ctx2d_i = 0

ctx2d.prototype.strokeRect = function(x, y, w, h)
{
    print("stroke rect: ", x, y, w, h, this.strokeStyle)
}

ctx2d.prototype.fillRect = function(x, y, w, h)
{
    var ycanvas = js_emu_canvas()
    ywCanvasMergeRectangle(ycanvas, x, y, w, h, this.fillStyle)
}

ctx2d.prototype.fillText = function(txt, x, y, w, h)
{
    var ycanvas = js_emu_canvas()
    var r = 0

    r = ywCanvasMergeText(ycanvas, x, y, w, h,  txt);
}

function js_emu_canvas()
{
    return yeGet(yeGet(attached_wid, "entries"), 0)
}

function checkOB(img, x, y, w, h)
{
    if (x + w < 0)
	return true
    if (y + h < 0)
	return true
    if (y > yWindowHeight())
	return true
    if (x > yWindowWidth())
	return true
    return false
}

ctx2d.prototype.save = function()
{
    var saved_ctx = new ctx2d()
    ctx2d_stack[ctx2d_i] = saved_ctx
    saved_ctx.fillStyle = this.fillStyle
    saved_ctx.strokeStyle = this.strokeStyle
    saved_ctx.globalAlpha = this.globalAlpha
    ++ctx2d_i
}

ctx2d.prototype.restore = function()
{
    --ctx2d_i
    cur_ctx2d = ctx2d_stack[ctx2d_i]

    this.fillStyle = cur_ctx2d.fillStyle
    this.strokeStyle = cur_ctx2d.strokeStyle
    this.globalAlpha = cur_ctx2d.globalAlpha

    ctx2d_stack[ctx2d_i] = null // I guess it might help MR GC
}

ctx2d.prototype.drawImage = function(img, x, y, w, h, sx, sy, sw, sh)
{
    if (sx != undefined) {
	var tmp = sx

	sx = x
	x = tmp

	tmp = sy
	sy = y
	y = tmp

	tmp = w
	w = sw
	sw = tmp

	tmp = h
	h = sh
	sh = tmp
    }

    if (checkOB(img, x, y, w, h)) {
	return
    }

    var ycanvas = js_emu_canvas()
    var src_rect = null
    var size = ywSizeCreate(w, h)
    var src_rect = null
    var yobj = null

    if (img.ytext == null) {
	img.ytext = ywTextureNewImg(img.src, null,
				    yeGet(attached_wid, "textures"));
    }

    if (sx != undefined) {
	src_rect = ywRectCreateInts(sx, sy, sw, sh);
    }

    dst_rect = ywRectCreateInts(x, y, w, h);
    yobj = ywCanvasMergeTexture(ycanvas, img.ytext, src_rect, dst_rect);
    ywCanvasForceSize(yobj, size);
}

function pageElem()
{
}

pageElem.prototype.getContext = function(ctx)
{
    if (ctx === '2d')
	return cur_ctx2d
    return null
}

function document_type()
{
    this.elems = {}
}

document_type.prototype.getElementById = function(id)
{
    return this.elems[id]
}

document_type.prototype.mk_elem = function(id)
{
    this.elems[id] = new pageElem()
}

var event_listener_array = {
    "keydown": null,
    "keyup": null,
    "mousedown": null,
    "mouseup": null,
    "mousemove": null,
}

document_type.prototype.addEventListener = function(eve, callback)
{
    event_listener_array[eve] = callback
}

var document = new document_type()


function window_type()
{
    this.innerWidth = yWindowWidth()
    this.innerHeight = yWindowHeight()
}

var request_anim_frame = []

window_type.prototype.requestAnimationFrame = function(callback)
{
    yeTryCreateInt(ywGetTurnLengthOverwrite(), attached_wid, "otimeow");
    ywSetTurnLengthOverwrite(Y_REQUEST_ANIMATION_FRAME);
    request_anim_frame.push(callback)
}

window_type.prototype.reload = function()
{
    this.innerWidth = yWindowWidth()
    this.innerHeight = yWindowHeight()
}

var window = new window_type()
// window things are global in JS
requestAnimationFrame = window.requestAnimationFrame


function Image()
{
    this.src = null;
    this.ytext = null;
}


function Audio()
{
    this.src = null
    this.duration = 0
    this.y_audio_fd = -1
}

Audio.prototype.addEventListener = function(eve, callback)
{
    // we load and call the callback directly
    if (eve == "loadedmetadata") {
	this.y_audio_fd = ySoundMusicLoad(this.src)
	this.duration = ySoundDuration(this.y_audio_fd) / 1000
	callback()
    }
}

Audio.prototype.play = function()
{
    ySoundPlay(this.y_audio_fd)
}

Audio.prototype.pause = function()
{
    ySoundPause(this.y_audio_fd)
}

function Event_type()
{
    this.keyCode = -1
    this.offsetX = 0
    this.offsetY = 0
}

function JsKeyCode()
{
    this.left = 37;
    this.right = 39;
    this.up = 38;
    this.down = 40;
    this.shift = 16;
    this.ctrl = 17;
}

jskeycode = new JsKeyCode()

function js_emu_conve_kcode(yirl_kcode)
{
    var kcode = yirl_kcode

    switch (yirl_kcode) {
    case Y_LSHIFT_KEY:
    case Y_RSHIFT_KEY:
	kcode = jskeycode.shift
	break;
    case Y_RCTRL_KEY:
    case Y_LCTRL_KEY:
	kcode = jskeycode.ctrl
	break;
    case Y_UP_KEY:
	kcode = jskeycode.up
	break;
    case Y_DOWN_KEY:
	kcode = jskeycode.down
	break;
    case Y_LEFT_KEY:
	kcode = jskeycode.left
	break;
    case Y_RIGHT_KEY:
	kcode = jskeycode.right
	break;
    }
    return kcode
}

function js_emu_action(wid, eves)
{
    attached_wid = wid
    var ctimer = Date.now()
    var kd = event_listener_array["keydown"]
    var ku = event_listener_array["keyup"]
    var md = event_listener_array["mousedown"]
    var mu = event_listener_array["mouseup"]
    var mm = event_listener_array["mousemove"]

    ygModDir(yeGetStringAt(wid, "dmod"));
    if (kd != null || ku != null || md != null || mu != null || mm != null) {
	for (var eve = eves; eve ; eve = ywidNextEve(eve)) {
	    if (ywidEveType(eve) == YKEY_DOWN && kd != null) {
		var jsev = new Event_type()
		jsev.keyCode = js_emu_conve_kcode(ywidEveKey(eve))
		kd(jsev)
	    }
	    else if (ywidEveType(eve) == YKEY_UP && ku != null) {
		var jsev = new Event_type()
		jsev.keyCode = js_emu_conve_kcode(ywidEveKey(eve))
		ku(jsev)
	    }
	    else if (ywidEveType(eve) == YKEY_MOUSEDOWN && md != null) {
		var jsev = new Event_type()
		jsev.offsetX = ywidXMouse(eve)
		jsev.offsetY = ywidYMouse(eve)
		md(jsev)
	    }
	    else if (ywidEveType(eve) == YKEY_MOUSEUP && mu != null) {
		var jsev = new Event_type()
		jsev.offsetX = ywidXMouse(eve)
		jsev.offsetY = ywidYMouse(eve)
		mu(jsev)
	    }
	    else if (ywidEveType(eve) == YKEY_MOUSEMOTION && mm != null) {
		var jsev = new Event_type()
		jsev.offsetX = ywidXMouse(eve)
		jsev.offsetY = ywidYMouse(eve)
		mm(jsev)
	    }
	}
    }

    var arr_cp = request_anim_frame
    request_anim_frame = [];
    for (var i = 0; i < arr_cp.length; ++i) {
	arr_cp[i](ctimer);
    }
    ygModDirOut();
    return YEVE_ACTION
}

attached_wid = null

var shmup_mod = "little-shmup"

function js_emu_kboum(wid)
{
    if (yeGet(wid, "otimeow"))
	ywSetTurnLengthOverwrite(yeGetIntAt(wid, "otimeow"))
}

// registre Wid little-shmup
function js_shmup_wid_init(wid)
{
    var dmod = yeGetStringAt(wid, "dmod")
    var files = [
	[shmup_mod, "js/funtions/Normes.js"],
	[shmup_mod, "js/define/display.js"],
	[shmup_mod, "js/define/input.js"],
	[shmup_mod, "js/funtions/movement.js"],
	[shmup_mod, "js/funtions/format.js"],
	[shmup_mod, "js/funtions/colision.js"],
	[shmup_mod, "js/funtions/actions.js"],
	[shmup_mod, "js/funtions/Monster.js"],
	[shmup_mod, "js/funtions/Player.js"],
	[shmup_mod, "js/funtions/Bonus.js"],
	[shmup_mod, "js/funtions/Bubble.js"],
	[shmup_mod, "js/funtions/Effect.js"],
	[shmup_mod, "js/funtions/Weapon.js"],
	[shmup_mod, "js/funtions/affichage.js"],
	[dmod, yeGetStringAt(wid, "img")],
	[dmod, yeGetStringAt(wid, "object")]
    ]
    var pats = yeGet(wid, "patterns")
    if (pats) {
	for (var p of pats)
	    files.push([dmod, p.s()])
    }
    files.push([dmod, yeGetStringAt(wid, "levels")])
    var ret = null

    yeCreateArray(wid, "textures")

    if (yeGet(wid, "mk-elem")) {
	document.mk_elem(yeGetStringAt(wid, "mk-elem"))
    }

    attached_wid = wid

    for (var i = 0; i < files.length; ++i) {
	ygModDir(files[i][0])
	ysLoadFile(ygGetManager("js"), files[i][1])
	ygModDirOut()
    }

    /* gameLoop plays ./audio from the game module dir; load it with the
     * game module as cwd even though the file lives in the engine module */
    ygModDir(dmod)
    ysLoadFile(ygGetManager("js"),
	       yeGetStringAt(ygGet(shmup_mod), "$path") + "/js/funtions/gameLoop.js")
    ygModDirOut()

    yeCreateString("rgba: 255 255 255 255", wid, "background")
    var entries = yeReCreateArray(wid, "entries")
    var can_w = yeCreateArray(entries)

    yeCreateString("canvas", can_w, "<type>")
    yeCreateInt(1, can_w, "mergable")
    yeCreateFunction("js_emu_action", wid, "action")
    yeCreateFunction("js_emu_kboum", wid, "destroy")
    ret = ywidNewWidget(wid, "container")
    return ret
}


function js_emu_init(mod)
{
    shmup_mod = yeGetStringAt(mod, "name")
    if (!shmup_mod)
	shmup_mod = "little-shmup"

    var wt = yeCreateArray()
    yeCreateString("little-shmup", wt, "name")
    yeCreateFunction("js_shmup_wid_init", wt, "callback")
    yeIncrRef(wt)
    ywidAddSubType(wt)
}
