
$(document).ready(function(){

	var map;
  	var buses; //list of buses currently running
  	var destination; //destination of user
  	var currentLocation;
  	var busMarkers =[]; //all the bus markers on the map 
  	var directionsList = []; //list of directions searched on the map
  	var recentPlaces = [] // store the recent geocoded routes last searched by the user
  	// var recentList = document.createElement("select"); //creates a dropdown list DOM element in html 

  	// recentList.setAttribute("onchange", getDirections(recentList.options[recentList.selectedIndex].value));

  	 // recentList.setAttribute("onchange", getDirections);


  	
  	

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
			    title: "Bus ID: "+bus.busID+ " Route Number"+bus.route.routeNum
  			   });
				busMarkers.push(marker);
			}	

			})
			
		});

	} 


	var getDirections = function(dest){ //runs when find routes button is clicked
		
		console.log("this function runs")
		var routeBuses= []; //bus number currently running on that route
		var directionsDisplay = new google.maps.DirectionsRenderer({map: map});
		var directionsService = new google.maps.DirectionsService();
		// Set destination, origin and travel mode.
		var request = {
		destination: dest,
		origin:currentLocation,
		travelMode: google.maps.TravelMode.TRANSIT
		};

		clearMap = function(){

			busMarkers.forEach(function(marker){
				marker.setMap(null);
			})

			busMarkers = [];

			directionsList.forEach(function(direction){
				direction.set('directions', null);
			})

			directionsList = [];

		}
		
		clearMap();
		
		// Pass the directions request to the directions service.
		//ajax call to get directions
		directionsService.route(request, function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
			  // Display the route on the map.
			  directionsDisplay.setDirections(response);
			  directionsList.push(directionsDisplay);

			  var steps = directionsDisplay.getDirections().routes[0].legs[0].steps;
			  steps.forEach(function(step){
			  	if(step.travel_mode == "TRANSIT"){
			  		routeBuses.push(step.transit.line.short_name);
			  	}
			  })
			  assignMarkers(routeBuses);
			  
				
			}

		});
	}

	geocodeAddress = function() {
		var geocoder = new google.maps.Geocoder();
		var cached = false
		var index;
		destination = document.getElementById("destInput").value.toUpperCase();

		for(var i =0;i<recentPlaces.length;i++){
			if(recentPlaces[i].name ==destination){
				cached = true;
				index = i;
				break;
			}
		}

		if(cached){ //if the location is cached then it will be retrieved instead of using the geocoding service
			getDirections(recentPlaces[i].location);
		}else{

			geocoder.geocode({'address':destination}, function(results, status) {
		    if (status === google.maps.GeocoderStatus.OK) {
		    	recentPlaces.push({"name": destination, "location":results[0].geometry.location})
		    	// addToList({"name": destination, "location":results[0].geometry.location});
		    	getDirections(results[0].geometry.location); 

		    } else {
		      alert('Geocode was not successful for the following reason: ' + status);
		    }
		  });
		}
		  
	}

	var addToList = function(location){ //adds each new location to a dropdown list 
		var op = new Option();
			op.text = location.name;
			op.value =location.location;
			recentList.options.add(op);
		document.getElementById("dropDown").appendChild(recentList);
	}
	

  initMap();

})


