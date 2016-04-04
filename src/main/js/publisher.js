'use strict'

/**
 * Объект издателя события в реализации наблюдателя
 */
var Publisher = function() {
	this.listeners = [];
};
/**
 * Оповещение подписчиков с передачей информации в виде объекта data
 * 
 * @param data информация, передаваемая издателем 
 */
Publisher.prototype.deliver = function(data) {
	this.listeners.forEach(function(listener) {
		listener(data);
	});
	return this;
};
/**
 * Добавляет прототипу любой функции возможность подписываться на событие издателя
 * 
 * @param publisher ссылка на издателя  
 */
Function.prototype.addListener = function(publisher) {
	publisher.listeners.push(this);
	return this;
};