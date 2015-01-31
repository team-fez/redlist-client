"use strict";

// Ruben's IP =D
var serverUrl = "?callback=shait";

$.getJSON(serverUrl, function (data) {
	console.log('GREAT SUCCESS!');
})
.done(function (data) {

})
.fail(function (data) {
	console.log('HORRIBLE FAILURE =(');
})
.always(function (data) {
  data = [
    {name: "Sør-Trøndelag", density: Math.round(Math.random() * Math.round(Math.random() * 100))},
    {name: "Nord-Trøndelag", density: Math.round(Math.random() * 100)},
    {name: "Nordland", density: Math.round(Math.random() * 100)},
    {name: "Troms", density: Math.round(Math.random() * 100)},
    {name: "Finnmark", density: Math.round(Math.random() * 100)},
    {name: "Vestfold", density: Math.round(Math.random() * 100)},
    {name: "Østfold", density: Math.round(Math.random() * 100)},
    {name: "Oslo", density: Math.round(Math.random() * 100)},
    {name: "Akershus", density: Math.round(Math.random() * 100)},
    {name: "Buskerud", density: Math.round(Math.random() * 100)},
    {name: "Oppland", density: Math.round(Math.random() * 100)},
    {name: "Hedmark", density: Math.round(Math.random() * 100)},
    {name: "Vest-Agder", density: Math.round(Math.random() * 100)},
    {name: "Aust-Agder", density: Math.round(Math.random() * 100)},
    {name: "Rogaland", density: Math.round(Math.random() * 100)},
    {name: "Telemark", density: Math.round(Math.random() * 100)},
    {name: "Hordaland", density: Math.round(Math.random() * 100)},
    {name: "Sogn og Fjordane", density: Math.round(Math.random() * 100)},
    {name: "Møre og Romsdal", density: Math.round(Math.random() * 100)}
  ];

  console.log(data);
});