/**
 * Dubiously created by Adrian Cooney
 * http://adriancooney.github.io
 * 
 * Memeless edition by rk0cc
 * 
 */
(function(console) {
	"use strict";

	/*
		The only difference is no meme
	 */

	/**
	 * Since the console.log doesn't respond to the `display` style,
	 * setting a width and height has no effect. In fact, the only styles
	 * I've found it responds to is font-size, background-image and color.
	 * To combat the image repeating, we have to get a create a font bounding
	 * box so to speak with the unicode box characters. EDIT: See Readme.md
	 *
	 * @param  {int} width  The height of the box
	 * @param  {int} height The width of the box
	 * @return {object}     {string, css}
	 */
	function getBox(width, height) {
		return {
			string: "+",
			style: "font-size: 1px; padding: " + Math.floor(height/2) + "px " + Math.floor(width/2) + "px; line-height: " + height + "px;"
		}
	}

	/**
	 * Draws text in impact font with stroke on context
	 *
	 * @param  {CanvasRenderingContext2D} ctx  The canvas context
	 * @param  {int} size Font size
	 * @param  {string} text The string to write
	 * @param  {int} x    X Position
	 * @param  {int} y    Y position
	 * @return {null}
	 */
	function drawText(ctx, size, text, x, y) {
		//Set the text styles
		ctx.font = "bold " + size + "px Impact";
		ctx.fillStyle = "#fff";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.lineWidth = 7;
		ctx.strokeStyle = "#000";
		ctx.strokeText(text, x, y);
		ctx.fillText(text, x, y);
	}

	/**
	 * Wrap a line of text at an index
	 *
	 * @param  {string} text The text
	 * @param  {int} num  The index to wrap at
	 * @return {array}      Array of text
	 */
	function wrap(text, num) {
		var output = [],
			split = text.split(" ");

		var str = [];
		for(var i = 0, cache = split.length; i < cache; i++) {
			if((str + split[i]).length < num) str.push(split[i])
			else {
				output.push(str.join(" "));
				str.length = 0;
				str.push(split[i]);
			}
		}

		//Push the final line
		output.push(str.join(" "));

		return output;
	}

	/**
	 * Display an image in the console.
	 * @param  {string} url The url of the image.
	 * @param  {int} scale Scale factor on the image
	 * @return {null}
	 */
	console.image = function(url, scale) {
		scale = scale || 1;
		var img = new Image();

		img.onload = function() {
			var dim = getBox(this.width * scale, this.height * scale);
			console.log("%c" + dim.string, dim.style + "background: url(" + url + "); background-size: " + (this.width * scale) + "px " + (this.height * scale) + "px; color: transparent;");
		};

		img.src = url;
	};
})(console);
