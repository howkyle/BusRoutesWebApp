
$(document).ready(function(){

	var map;
  	var buses; //list of buses currently running
  	var savedGeoCodes=[]; //list of text to lat/lng translated locations 
  	var destination; //destination of user
  	var location; //current location of user
  	var currentLocation;

  	
  	

  	if (navigator.geolocation) {    
		
			function error(err) {
				console.warn('ERROR(' + err.code + '): ' + err.message);
			}
			
			function success(pos){
				currentLocation = {lat: pos.coords.latitude,lng:pos.coords.longitude} ;
				var marker = new google.maps.Marker({
			    map: map,
			    position: currentLocation,
			    title: "I AM HERE"
  			   });
						//return userCords;
			}
		
			// Get the user's current position
			navigator.geolocation.getCurrentPosition(success, error);
			//console.log(pos.latitude + " " + pos.longitude);
	} else {
		alert('Geolocation is not supported in your browser');
	}


  	$.getJSON("json/buses.json", doStuff)

  	function doStuff(data) {

  		//stores the retrieved data from buses.json in the bus variable
	  	buses = data;
  	}  


	function initMap() { //initializes the map and centres it on the city of kingston
	  map = new google.maps.Map(document.getElementById('mapArea'), {
	    center: {lat: 18.0115495, lng: -76.7980512},
	    zoom: 15
	  });

		var transitLayer = new google.maps.TransitLayer();
	 	transitLayer.setMap(map);
	
	}

	var assignMarkers = function(routeBuses){
		
		buses.forEach(function(bus){
			routeBuses.forEach(function(routeBus){

				if(bus.route.routeNum == routeBus){
				var marker = new google.maps.Marker({
			    map: map,
			    position: bus.location,
			    title: bus.busID+ " "+bus.route.routeNum
  			   });

			}

			})
			
		});

	} 


	var getDirections = function(dest){ //runs when find routes button is clicked
		

		var directionsDisplay = new google.maps.DirectionsRenderer({map: map});
		
		// Set destination, origin and travel mode.
		var request = {  //remember to change the location and dest when submitted/find route
		destination: dest,
		origin:currentLocation,
		travelMode: google.maps.TravelMode.TRANSIT
		};

		var routeBuses= []; //bus number currently running on that route

		// Pass the directions request to the directions service.
		var directionsService = new google.maps.DirectionsService();

		//ajax call to get directions
		directionsService.route(request, function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
			  // Display the route on the map.
			  console.log(response)
			  directionsDisplay.setDirections(response);
			  //returns the bus num of the bus currently working on that route

			  var steps = directionsDisplay.getDirections().routes[0].legs[0].steps;
			  steps.forEach(function(step){
			  	if(step.travel_mode == "TRANSIT"){
			  		routeBuses.push(step.transit.line.short_name);
			  		console.log(routeBuses)
			  	}
			  })
			  assignMarkers(routeBuses);
			  
				
			}

		});
	}

	geocodeAddress = function() {
		var geocoder = new google.maps.Geocoder();
		location = $("#locInput").val();
		destination = document.getElementById("destInput").value;
		  geocoder.geocode({'address':destination}, function(results, status) {
		    if (status === google.maps.GeocoderStatus.OK) {
				console.log(location);
		    	getDirections(results[0].geometry.location); 

		    } else {
		      alert('Geocode was not successful for the following reason: ' + status);
		    }
		  });
	}
	

  initMap();

})


