var map;
var infowindow;

var request;
var service;
var markers = [];

function initialize(){
    var center = new google.maps.LatLng(1.3521, 103.8198);
    map = new google.maps.Map(document.getElementById('map'),{
        center: center,
        zoom:13
    });

    var request = {
        location: center,
        radius: 5000,
        types: ['parking']
    };
    infowindow = new google.maps.InfoWindow();

    var service = new google.maps.places.PlacesService(map);

    service.nearbySearch(request, callback);

    google.maps.event.addListener(map, 'rightclick', function(event){
        map.setCenter(event.latLng)
        clearResults(marker)

        var request = {
            location: event.latLng,
            radius: 5000,
            types: ['parking']
        };
        service.nearbySearch(request, callback);
    })
}

function callback(results, status){
    if(status == google.maps.places.PlacesServiceStatus.OK){
        for(var i=0; i<results.length; i++){
            markers.push(createMarker(results[i]));
        }
    }
}

function createMarker(place){
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map:map,
        postion: place.geometry.locaction
    });

    google.maps.event.addListener(marker,'click',function(){
        infoWindow.setContent(place.name);
        infoWindow.open(map,this);
    });
    return marker;
}

function clearResults(markers){
    for(var m in markers){
        markers[m].setMap(null)
    }
    markers = []
}

google.maps.event.addDomListener(window, 'load', initialize);