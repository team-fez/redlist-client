"use strict";

// Ruben's IP =D
var serverUrl = "?callback=yay";

var jqxhr = $.getJSON(serverUrl, function() {
	console.log('GREAT SUCCESS!');
})
.done(function() {

})
.fail(function() {
	console.log('HORRIBLE FAILURE =(');
})
.always(function() {

});