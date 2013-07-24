/* jshint laxcomma: true */
module.exports = exports = JSONMeld;
exports.JSONMeld = JSONMeld;

var fs = require('fs')
	, stream = require('stream')
	, inherits = require('util').inherits

	//	this allows for periods in the file name
	, getFileName = /\/?([\w\W]+)\.[\w]+$/
	, toString = Object.prototype.toString
	, isArray = function (is) { return toString.call(is) === '[object Array]'; }
	, slice = Array.prototype.slice

	// , Writable = stream.Writable
	// , Transform = stream.Transform
	, readStreams = {}
	, writeStreams = {}
;

function JSONMeld () {
	if (!(this instanceof JSONMeld)) {
		return new JSONMeld();
	}
	stream.Transform.call(this);

	this.readStreamsCount = 0;
	this.loadedStreamsCount = 0;
	this.meld = {};
}

inherits(JSONMeld, stream.Transform);

JSONMeld.prototype._transform = function (chunk, enc, next) {
	// this.push(chunk);
	// console.log()
	next();
};

	
JSONMeld.prototype.fileStream = function (file, name, force) {
	var nameMatch;
	if (typeof file !== 'string') return;

	if (typeof name === 'boolean') {
		force = name;
	} else if (name === void 0 && force === void 0) {
		nameMatch = file.match(getFileName);
		name = nameMatch ? nameMatch[1] : file;
		force = false;
	} else if (force === void 0) {
		force = false;
	}
	
	readAndPipe.call(this, file, name, force);
	return this;
};

// JSONMeld.prototype.readStream


/*
 * This function must be called with .call(this)
 * since it acts as a private function
 * piping to the context stream and adjusting the counter
 */
function readAndPipe (file, name, force) {
	var write, read;

	// read = readStreams[file];
	// if (read && !force) return read;

	write = new stream.Writable;
	write._write = _write;

	writeStreams[name] = write;

	read = fs.createReadStream(file);
	console.log(read)
	read.pipe(write);
	

	// stream = readStreams[file] = fs.createReadStream(file);
	// this.on('finish', this._finishedReading.call(this, file, name));
	// stream.pipe(this);
	
	this.readStreamsCount++;
}

//	function used to override stream.Writable.prototype._write
function _write (chunk, enc, next) {
	next();
}

function readReadable () {

}


JSONMeld.prototype._finishedReading = function (file, name) {
	// meld
	console.log(arguments);
};



function useIfBool (bool) {
	return (bool === true || bool === false) ? bool : void 0;
}