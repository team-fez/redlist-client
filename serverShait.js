"use strict";

// Ruben's IP =D
var serverUrl = "http://localhost:50288/api/Location/GetSpecies?callback=shait";

$.getJSON(serverUrl, function (data) {
	console.log('GREAT SUCCESS!');
})
.done(function (data) {

})
.fail(function (data) {
	console.log('HORRIBLE FAILURE =(');
})
.always(function (data) {
  data = {
    "Sør-Trøndelag": Math.round(Math.random() * 10000),
    "Nord-Trøndelag": Math.round(Math.random() * 1000),
    "Nordland": Math.round(Math.random() * 100),
    "Troms": Math.round(Math.random() * 10),
    "Finnmark": Math.round(Math.random() * 1),
    "Vestfold": Math.round(Math.random() * 10000),
    "Østfold": Math.round(Math.random() * 1000),
    "Oslo": Math.round(Math.random() * 100),
    "Akershus": Math.round(Math.random() * 10),
    "Buskerud": Math.round(Math.random() * 1),
    "Oppland": Math.round(Math.random() * 10000),
    "Hedmark": Math.round(Math.random() * 1000),
    "Vest-Agder": Math.round(Math.random() * 100),
    "Aust-Agder": Math.round(Math.random() * 10),
    "Rogaland": Math.round(Math.random() * 1),
    "Telemark": Math.round(Math.random() * 10000),
    "Hordaland": Math.round(Math.random() * 1000),
    "Sogn og Fjordane": Math.round(Math.random() * 100),
    "Møre og Romsdal": Math.round(Math.random() * 10)
  };

  updateCountyDensities(data);
});