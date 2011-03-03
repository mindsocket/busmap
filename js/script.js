function getData(x,y) {
	$.ajax({
		url: "/busmap/getData.py?x=" + x + "&y=" + y,
		dataType: 'xml',
		error: function(jqXHR, textStatus, errorThrown) {alert('fail:' + textStatus)},
		success: function(data, textStatus, jqHXR) {
			$(data).find("dp").each(function() {
				var dp = $(this);
				console.log(dp.find("n").text() + ": " + dp.find("dt da").text() + " " + dp.find("dt t").text() + " at " + dp.find("c").text() + "<br/>");
				coord=dp.find("c").text().split(',');
				myLatLng = new google.maps.LatLng(coord[1]/1000000, coord[0]/1000000);
				var marker = new google.maps.Marker({
				      position: myLatLng, 
				      map: map, 
				      title: dp.find("n:first").text() + ": " + 
				      	dp.find("dt da").text() + " " + dp.find("dt t").text() +
				      	" " + dp.find("m nu").text() + " " + dp.find("m n").text() + " to " + dp.find("m des").text()  
				  });   
			});
		}
	});
}

var initialLocation;
var sydney = new google.maps.LatLng(-33.842, 151.179);
var browserSupportFlag =  new Boolean();
var map;
var infowindow = new google.maps.InfoWindow();
  
function initialize() {
  var myOptions = {
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
  
  // Try W3C Geolocation method (Preferred)
  if(navigator.geolocation) {
    browserSupportFlag = true;
    navigator.geolocation.getCurrentPosition(function(position) {
      initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
      contentString = "Location found using W3C standard";
      map.setCenter(initialLocation);
      infowindow.setContent(contentString);
      infowindow.setPosition(initialLocation);
      infowindow.open(map);
      getData(position.coords.longitude,position.coords.latitude);
    }, function() {
      handleNoGeolocation(browserSupportFlag);
    });
  } else if (google.gears) {
    // Try Google Gears Geolocation
    browserSupportFlag = true;
    var geo = google.gears.factory.create('beta.geolocation');
    geo.getCurrentPosition(function(position) {
      initialLocation = new google.maps.LatLng(position.latitude,position.longitude);
      contentString = "Location found using Google Gears";
      map.setCenter(initialLocation);
      infowindow.setContent(contentString);
      infowindow.setPosition(initialLocation);
      infowindow.open(map);
      getData(position.coords.longitude,position.coords.latitude);
    }, function() {
      handleNoGeolocation(browserSupportFlag);
    });
  } else {
    // Browser doesn't support Geolocation
    browserSupportFlag = false;
    handleNoGeolocation(browserSupportFlag);
  }
}

function handleNoGeolocation(errorFlag) {
  contentString = "Couldn't determine your location";

  map.setCenter(sydney);
  infowindow.setContent(contentString);
  infowindow.setPosition(sydney);
  infowindow.open(map);
  getData(151.179,-33.842);
  
}
        

