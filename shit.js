var map = L.map('map').setView([65, 5], 4);

L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
		'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
		'Imagery © <a href="http://mapbox.com">Mapbox</a>',
	id: 'examples.map-20v6611k'
}).addTo(map);

// Bind close button
$('#close').click(function () {
	$('#infoBox').fadeOut(100);
});


// control that shows state info on hover
var info = L.control();

info.onAdd = function (map) {
	this._div = L.DomUtil.create('div', 'info');
	this.update();
	return this._div;
};

info.update = function (props) {
	this._div.innerHTML = '<h4>Endangered species</h4>' +  (props ?
		'<b>' + props.NAVN + '</b><br />' + props.density + ' endangered species'
		: 'Hover over a county');
};

info.addTo(map);



function style(feature) {
	return {
		weight: 2,
		opacity: 1,
		color: 'white',
		dashArray: '3',
		fillOpacity: 0.7,
		fillColor: getColor(feature.properties.density)
	};
}

function highlightFeature(e) {
	var layer = e.target;

	layer.setStyle({
		weight: 5,
		color: '#666',
		dashArray: '',
		fillOpacity: 0.7
	});

	if (!L.Browser.ie && !L.Browser.opera) {
		layer.bringToFront();
	}

	info.update(layer.feature.properties);
}

var geojson;

geojson = L.geoJson(countiesData, {
			style: style,
			onEachFeature: onEachFeature
		}).addTo(map);

var max;

function resetHighlight(e) {
	geojson.resetStyle(e.target);
	info.update();
}

function zoomToFeature(e) {
	map.fitBounds(e.target.getBounds());
}

// TODO: implement me =D
function populateSpeciesList(county) {

	$('#activeCounty').text(county.replace(/_/g, ' ')).fadeIn(100);

	$.ajax({
		type: 'GET',
		dataType: 'jsonp',
		data: {},
		url: serverUrl + "/api/Location/GetSpeciesByCounty?county=" + county + "&callback=?",
		error: function (jqXHR, textStatus, errorThrown) {
			
		},
		success: function (species) {
			console.log(species);
			$('#infoList').empty();
			_.forEach(species, function (plant,index) {
				console.log(plant);
				var norName = plant.NorwegianName,
						latinName = plant.Name,
						category = (plant.Category).toLowerCase();

				if (norName === "") {
					norName = latinName;
				}
				console.log($('#infoList'));
				$('#infoList').append("<li data-id="+index+'><span class="extinctionColor ' + category + '">'+category+'</span>' + norName + "</li>");
			
			});

			$('#infoList li').click(function () {
					console.log("Lol ");

					$('#infoList li.active').removeClass('active');
					$(this).addClass('active');

					// Send object
					populateExtendedInfo(species[$(this).attr('data-id')], county);
			});

			$('#infoList').fadeIn(100);
		}
	});

}

function populateExtendedInfo(thingie, county) {
	$('#infoBox h1').text(thingie.Name + ' (' + thingie.NorwegianName + ')');
	$('#infoBox p').text(thingie.Summary);
	var imageToUse = false;
	_.forEach(thingie.Images, function (image) {
		if((image.Url).toLowerCase().indexOf('.jpg') !== -1) {
			imageToUse = image.Url;
			console.log(imageToUse);
		}
	});

	if(imageToUse) {
		$('#infoBox img').fadeIn(100)
		$('#infoBox img').attr('src', imageToUse)
	} else {
		$('#infoBox img').hide()
	}

	$('#infoBox a').attr('href', thingie.WikiUrl);
	$('#infoBox').fadeIn(100);

	getMapMarkers(county, thingie.Name)
}

function onEachFeature(feature, layer) {
	layer.on({
		mouseover: highlightFeature,
		mouseout: resetHighlight,
		click: function (e) {
			zoomToFeature(e);
			populateSpeciesList(feature.properties.NAVN);
		}//zoomToFeature
	});
}

// geojson = L.geoJson(countiesData, {
// 	style: style,
// 	onEachFeature: onEachFeature
// }).addTo(map);

map.attributionControl.addAttribution('Population data &copy; <a href="http://census.gov/">US Census Bureau</a>');


var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

	var div = L.DomUtil.create('div', 'info legend'),
		grades = rangeArray,
		labels = [],
		from, to;

	for (var i = 0; i < grades.length; i++) {
		from = grades[i];
		to = grades[i + 1];

		labels.push(
			'<i style="background:' + getColor(from + 1) + '"></i> ' +
			from + (to ? '&ndash;' + to : '+'));
	}

	div.innerHTML = labels.join('<br>');
	return div;
};

legend.addTo(map);

var control = L.easyButton(
	'fa-signal', 
  function () {
	options.logaritmicScale = !options.logaritmicScale;
	setMax(max);
	map.removeLayer(geojson);
	geojson = L.geoJson(countiesData, {
			style: style,
			onEachFeature: onEachFeature
		}).addTo(map);

		map.removeControl(legend);
		legend.addTo(map);

	console.log(map);
  },
  'Logarithmic scale?'
);

var updateCountyDensities = function  updateCountyDensities (data) {
	console.log(data);
	_.forEach(countiesData.features, function (feature) {
		feature.properties.density = data[feature.properties.NAVN];
	});

	max = _.max(data);

	setMax(max);
	console.log(max);

	geojson = L.geoJson(countiesData, {
		style: style,
		onEachFeature: onEachFeature
	}).addTo(map);
	map.removeControl(legend);
	legend.addTo(map);
};

function getMapMarkers(county, species){
	$.ajax({
		type: 'GET',
		dataType: 'jsonp',
		data: {},
		url: serverUrl + "/api/Observation/Get?name="+ species + "&county=" + county + "&callback=?",
		error: function (jqXHR, textStatus, errorThrown) {
			
		},
		success: function (sightings) {
			console.log(sightings);
			addMarkers(sightings);
		}
	});
}

var markers = new L.MarkerClusterGroup({ spiderfyOnMaxZoom: true, showCoverageOnHover: true, zoomToBoundsOnClick: true });

// Add array of markers
function addMarkers(sightings) {
	clearMarkers();
	// Loop through and add markers
	_.forEach(sightings, function(sighting) {
		var title = "lon: " + sighting.Longitude + ", lat: " + sighting.Latitude ;
		var marker = new L.Marker(L.latLng(sighting.Latitude.replace(',','.'), sighting.Longitude.replace(',', '.')), { title: title});
		markers.addLayer(marker);

		marker.bindPopup(title);
	});

	map.addLayer(markers);
}


// Remove all markers
function clearMarkers() {
	markers.clearLayers();
}

//setTimeout(clearMarkers, 10000);


