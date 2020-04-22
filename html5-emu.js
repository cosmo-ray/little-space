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
	print("HEJAAAAAA !!!")
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

    ygModDir("little-space");
    if (kd != null) {
	var eve = eves

	for (; eve ; (eve = ywidNextEve(eve) != null)) {

	    if (ywidEveType(eve) == YKEY_DOWN) {
		var jsev = new Event_type()
		jsev.keyCode = js_emu_conve_kcode(ywidEveKey(eve))
		kd(jsev)
	    }
	    //print("WESH !", eve)

	}
    }

    if (ku != null) {
	var eve = eves

	for (; eve ; eve = ywidNextEve(eve)) {

	    if (ywidEveType(eve) == YKEY_UP) {
		var jsev = new Event_type()

		print("\nUP: ", jsev.keyCode)
		jsev.keyCode = js_emu_conve_kcode(ywidEveKey(eve))
		ku(jsev)
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

function js_emu_kboum(wid)
{
    if (yeGet(wid, "otimeow"))
	ywSetTurnLengthOverwrite(yeGetIntAt(wid, "otimeow"))
}

// registre Wid
function js_emu_wid_init(wid)
{
    var files = yeGet(wid, "files")
    var ret = null

    print("js_emu_wid_init")
    yeCreateArray(wid, "textures")

    if (yeGet(wid, "mk-elem")) {
	document.mk_elem(yeGetStringAt(wid, "mk-elem"))
    }

    attached_wid = wid

    ygModDir(yeGetStringAt(wid, "dmod"));
    for (var i = 0; i < yeLen(files); ++i) {
	print("load: ", yeGetStringAt(wid, "dmod"))
	ysLoadFile(ygGetManager("js"),
		   yeGetStringAt(files, i));
	print("out 0")
    }
    ygModDirOut();
    yeCreateString("rgba: 255 255 255 255", wid, "background")
    var entries = yeReCreateArray(wid, "entries")
    var can_w = yeCreateArray(entries)

    yeCreateString("canvas", can_w, "<type>")
    yeCreateInt(1, can_w, "mergable")
    yeCreateFunction("js_emu_action", wid, "action")
    yeCreateFunction("js_emu_kboum", wid, "destroy")
    print("new wid")
    ret = ywidNewWidget(wid, "container")
    return ret
}


function js_emu_init(mod)
{
    var wt = yeCreateArray()
    yeCreateString("html-emu", wt, "name")
    yeCreateFunction("js_emu_wid_init", wt, "callback")
    /* ywidAddSubType is oneof the few (if the the only call) that destroy wt */
    yeIncrRef(wt)
    var r = ywidAddSubType(wt)
}
