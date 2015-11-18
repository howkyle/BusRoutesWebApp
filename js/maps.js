
$(document).ready(function(){

	var map;
	var hwt = {lat:18.014010, lng: -76.789734};
  	var papine = {lat: 18.015518, lng:-76.742326};

	function initMap() {
	  map = new google.maps.Map(document.getElementById('mapArea'), {
	    center: {lat: 18.0115495, lng: -76.7980512},
	    zoom: 5
	  });

	 	 var marker = new google.maps.Marker({map: map, position:{lat:18.009466,lng:-76.797104}, title:
		"90 Express"});

		var transitLayer = new google.maps.TransitLayer();
	 	transitLayer.setMap(map);

	 	var directionsDisplay = new google.maps.DirectionsRenderer({map: map});


		// Set destination, origin and travel mode.
		var request = {
		destination: papine,
		origin: hwt,
		travelMode: google.maps.TravelMode.TRANSIT
		};

		// Pass the directions request to the directions service.
		var directionsService = new google.maps.DirectionsService();
		directionsService.route(request, function(response, status) {
		if (status == google.maps.DirectionsStatus.OK) {
		  // Display the route on the map.
		  console.log(response)
		  directionsDisplay.setDirections(response);

		  console.log(directionsDisplay.getDirections().routes[0].legs[0].steps[0].transit.line.short_name)
		  		}
		});

		}

	

  initMap();

})


