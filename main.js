document.addEventListener('keydown', there_was_a_keydown);

window.onload = function() {
	generate(4)
};

function there_was_a_keydown(e) {
	if (e.keyCode == 32){
		generate(4)
	};
};

function generate(count) {
	var basehsl = random_hsl(1.5)
	var generatedcolours = [];

	for (let i = 0; i < (count - 1); i++) {
		var randomhsl = random_hsl(1.5)
		generatedcolours[i] = {h: constrain_hue(basehsl.h + 180 * Math.round(rand(1,2))), s: randomhsl.s, l: randomhsl.l}
	}

	document.getElementById("col1").style.backgroundColor = 'hsl(' + basehsl.h + ',' + basehsl.s + '%,' + basehsl.l + '%)'
	var rgb = hsl_to_rgb(basehsl.h,basehsl.s,basehsl.l)
	document.getElementById("col1").firstElementChild.innerHTML = rgb_to_hex(Math.round(rgb.r), Math.round(rgb.g), Math.round(rgb.b)) 
	document.getElementById("col2").style.backgroundColor = 'hsl(' + generatedcolours[0].h + ',' + generatedcolours[0].s + '%,' + generatedcolours[0].l + '%)'
	document.getElementById("col3").style.backgroundColor = 'hsl(' + generatedcolours[1].h + ',' + generatedcolours[1].s + '%,' + generatedcolours[1].l + '%)'
	document.getElementById("col4").style.backgroundColor = 'hsl(' + generatedcolours[2].h + ',' + generatedcolours[2].s + '%,' + generatedcolours[2].l + '%)'
	//document.getElementById("col3").style.backgroundColor = 'hsl(' + constrain_hue(basehsl.h + 180 * Math.round(rand(1,2))) + ',' + random_hsl(1.5).s + '%,' + random_hsl(1.5).l + '%)'
	//document.getElementById("col4").style.backgroundColor = 'hsl(' + constrain_hue(basehsl.h + 180 * Math.round(rand(1,2))) + ',' + random_hsl(1.5).s + '%,' + random_hsl(1.5).l + '%)'
}

//Returns a random value from a given range
function rand(min, max) {
	return (Math.random() * max - min) + min
};

//Generates a random HSL colour, with option to use 
function random_hsl(curve) {
	var h = Math.round(rand(1, 360));
	//var s = rand(0, 100);
	//var l = rand(0, 100);
	//Funny curve for values, it works (i think)
	var s = Math.round((Math.pow(rand(0, 100), (1/curve)) * 100) / Math.pow(100, (1/curve)));
	var l = Math.round((Math.pow(rand(0, 100), (1/curve)) * 100) / Math.pow(100, (1/curve)));
	return {h: h, s: s, l: l};
};

//Converts HSL colours to RGB
function hsl_to_rgb(h, s, l) {
	s /= 100;
	l /= 100;
	const k = n => (n + h / 30) % 12;
	const a = s * Math.min(l, 1 - l);
	const f = n =>
	  l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
	return {r:255 * f(0), g: 255 * f(8), b: 255 * f(4)};
};

//Converts R, G, and B values to a colour hex string
function rgb_to_hex(r, g, b) {
	return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

//Takes a given hue value and wraps it into the 0 to 360 range.
//
//	constrain_hue(25);
//	-> 25
//
//	constrain_hue(360);
//	-> 0
//
//	constrain_hue(732);
//	-> 12
function constrain_hue(hue) {
	var outhue = hue - Math.floor(hue/360) * 360
	return outhue;
}