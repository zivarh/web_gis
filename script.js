var map;
function fetchData()	{
	//Create the map object and set the centre point and zoom level 
	map = L.map('map').setView([25.00,10.00], 2);
		
	//Load tiles from open street map (you maybe have mapbox tiles here- this is fine) 
	L.tileLayer('http://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution:'Map data ©OpenStreetMap contributors, CC-BY-SA, Imagery ©CloudMade',
		maxZoom: 18
	//add the basetiles to the map object	
	}).addTo(map);


	//Define array to hold results returned from server
	tweetData = new Array();
	//AJAX request to server; accepts a URL to which the request is sent 
	//and a callback function to execute if the request is successful. 
	$.getJSON("fetchData.php", function(results)	{ 
		
		//Populate tweetData with results
		for (var i = 0; i < results.length; i++ )	{
			
			tweetData.push ({
				id: results[i].id, 
				body: results[i].body, 
				lat: results[i].lat, 
				lon: results[i].lon
			}); 
		}
		
		plotTweets(); 
	});
}	
	function plotTweets() {
		//Loop through tweetData to create marker at each location 
		for (var i = 0; i < tweetData.length; i++) { 
		   var markerLocation = 
			  new L.LatLng(tweetData[i].lat, tweetData[i].lon);
		   var marker = new L.Marker(markerLocation);
	 
		   map.addLayer(marker);
		   marker.bindPopup(tweetData[i].body);
		}
	 } 


function clearData()	{
	document.getElementById('textWrap').innerHTML = ''; 
}

 
		
	
	