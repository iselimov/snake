'use strict'

var Publisher = function() {
	this.listeners = [];
};

Publisher.prototype.deliver = function(data) {
	this.listeners.forEach(function(listener) {
		listener(data);
	});
	return this;
};

Function.prototype.addListener = function(publisher) {
	publisher.listeners.push(this);
	return this;
};