/* jshint laxcomma: true */
module.exports = exports = JSONMeld;

var stream = require('stream')
	, inherits = require('util').inherits
	, slice = [].slice
;


function JSONMeld (no, options) {
	if (!(this instanceof JSONMeld)) return new JSONMeld;
	stream.Transform.call(this, { objectMode : true });
	//	writable stream must be set to object mode
	this._writableState.objectMode = true;
	//	this.body is our current object
	this.body = {};
	this.pending = [];
	this.objectsExpected = no || 2;
	this.objectCount = 0;
}

inherits(JSONMeld, stream.Transform);

JSONMeld.prototype._transform = function (chunk, enc, next) {
	var newObj, piece
		//	store local reference of body 'Object'
		, body = this.body

	try {

		//	if this fails then we know that it is not finished
		newObj = JSON.parse(chunk);
		//	extend newObject properties
		extend(body, newObj);
		//	if count matches no of expected objects
		//	then push object into buffer

		if (!this.objectMode) {
			body = JSON.stringify(body);
			this.body = body = new Buffer(body, this.enc || 'utf8');
		}

		if (++this.objectCount >= this.objectsExpected) this.push(body);
		//	clear pending array

	} catch (err) {
		console.log(err)
	};
	next();
};

JSONMeld.prototype.objectMode = functon () {
	this.objectMode = true;
	this._writableState.objectMode = true;
	this._readableState.objectMode = true;
};

JSONMeld.prototype.outputEncoding = functon (enc) {
	if (enc === 'object') {
		this._writableState.objectMode = true;
	} else {
		this._writableState.objectMode = false;
		// this.set
	}
};

JSONMeld.prototype.setExpected = function (no) {
	this.objectsExpected = no || 0;
};


JSONMeld.prototype.resetCount = function () {
	this.objectCount = 0;
};

JSONMeld.prototype.resetObject = function () {
	this.body = {};
};

function extend (obj, ex) {
	obj = obj || {};
	Object.keys(ex).forEach(function (propName) {
		obj[propName] = ex[propName];
	});
	return obj;
};

function softClone (toClone) {

}