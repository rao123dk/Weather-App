var latitude;
var longitude;
var city_location;
var search_value='';
var endpoint ="https://raw.githubusercontent.com/nshntarora/Indian-Cities-JSON/master/a-detailed-version.json";

var our_database=[];
function showBySearch (){
   //fetch(endpoint).then(data => console.log(data) );
    search_value_now = $("#show_by_search").val();
    search_value =search_value_now.toLowerCase();
    $.getJSON(endpoint , function(newdata){
            for(let x in newdata){
                    our_database.push(newdata[x]);
            }
            //console.log(our_database[0].city);
            our_database.forEach(function(filter_data){
                //console.log(filter_data.city);
                if(search_value === filter_data.city){
                  latitude = filter_data.latitude;
                  longitude =filter_data.longitude;
                  city_location =filter_data.city;
                  
                }
                
            });
            
    });   
    
}

document.getElementById("show_Now").addEventListener("click", function(){
    
  timeToshow = setTimeout(getWeather, 1000);
});

// fetch news news
function show_news(){
  var _blank="_blank";
  var news_url = "https://newsapi.org/v1/articles?source=google-news&sortBy=top&apiKey=";
  var apiKey = "83781e51c30e4a3bb7cc2b0ffde70d8c";
    $.getJSON(news_url + apiKey, function(data) {
        var titles = data.articles.map(function(articles) {
        return "<a href='" + articles.url + "' target='"+ _blank +"'>" + articles.title + "</a>";
    });
    $("#news").html(titles.join("<br><br>"));
    });
    $("#news").text("fetching news...");
}

// By my current location
function getWeather(){
    var location = document.getElementById("location");
    var apiKey ="95c8fdf818f63ee27b67731d2058f6b3";
    var url ="https://api.darksky.net/forecast/";
    
   
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
    
    function success(Position){
        if(search_value == ''){
            latitude = Position.coords.latitude;
            longitude = Position.coords.longitude;
        }else{
         //get_city_name(latitude, longitude);
        $('#cityLocation').html(city_location.toUpperCase());   
        }
        
        location.innerHTML = 'Latitude is ' + latitude + '°<br> Longitude is ' + longitude + '°';
         
        $.getJSON(url + apiKey + "/" + latitude +"," + longitude +"?callback=?", function(data){
            
            //30°C x 1.8 + 32 = 86°F
            var temp =(data.currently.temperature - 32) * .5556;
            var temp = temp.toFixed(0);
            $("#temp").html("Temperature:->" +temp + '° C');
            $('#summary').html(data.currently.summary);
            $('#icon').html(data.currently.icon);
            var d = new Date(data.currently.time);
            
            $('#time').html("Time:-> "+d);
            $('#humidity').html("Humidity:-> "+data.currently.humidity);
            $('#windSpeed').html("WindSpeed:-> "+data.currently.windSpeed);
            $('#visibility').html("Visibility:-> "+data.currently.visibility);
            
            
            //apparentTemperature
            //cloudCover
            //precipProbability
        });
    }
    
    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        location.innerHTML = "Unable to retrieve your location";
    };
    location.innerHTML = "Locating... or not a valid name";
    
    
     // It is used to get current location of device
    //https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
    navigator.geolocation.getCurrentPosition(success, error,options); 
}
