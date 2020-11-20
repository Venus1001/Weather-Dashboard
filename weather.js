
// Search city function for the current city weather

function searchCity(cityName) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=868738ec361e3e00657f6ff8bf7421a6";
    var queryURLForcast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=868738ec361e3e00657f6ff8bf7421a6";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (res) {
        console.log(res);
        console.log(queryURL);
        $("#current-city").empty();
        var date = moment().format('L');

        // create html for search city information
        var cityName = $("<h2>").text(res.name);
        var displayDate = cityName.append(" " + date);
        var temperature = $("<p>").text("Temperature: " + res.main.temp);
        var humidity = $("<p>").text("Humidity: " + res.main.humidity);
        var windSpeed = $("<p>").text("Wind Speed: " + res.wind.speed);
        var currentWeather = res.weather[0].main;

        switch (currentWeather) {
            case "Clear":
                var weatherIcon = $("<img>").attr("src", "https://www.nicepng.com/png/detail/15-155040_weather-icon-weather.png");
                weatherIcon.attr("style", "height: 65px; width: 65px");
                break;
            case "Clouds":
                var weatherIcon = $("<img>").attr("src", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqUwONC6kCtgr1RIqDTd9wIhQVyT2Hbp0Lxw&usqp=CAU");
                weatherIcon.attr("style", "height: 60px; width: 60px");
                break;
            case "Rain":
                var weatherIcon = $("<img>").attr("src", "https://www.creativefabrica.com/wp-content/uploads/2018/12/Rain-Icon-by-wirawizinda097-580x386.jpg");
                weatherIcon.attr("style", "height: 60px; width: 60px");
                break;
            case "Snow":
                var weatherIcon = $("<img>").attr("src", "https://icons-for-free.com/iconfiles/png/512/snow+snowflake+icon-1320196576576887593.png");
                weatherIcon.attr("style", "height: 60px; width: 60px");
                break;
            case "Drizzle":
                var weatherIcon = $("<img>").attr("src", "https://static.thenounproject.com/png/2876501-200.png");
                weatherIcon.attr("style", "height: 60px; width: 60px");
                break;

        }

        var newDiv = $('<div>');
        newDiv.append(displayDate);
        newDiv.append(weatherIcon);
        newDiv.append(temperature);
        newDiv.append(humidity);
        newDiv.append(windSpeed);
      
        $("#current-city").html(newDiv);

        var latitude = res.coord.lat;
        var longitude = res.coord.lon;
        var queryURLUV = "https://api.openweathermap.org/data/2.5/uvi?&appid=868738ec361e3e00657f6ff8bf7421a6&lat=" + latitude + "&lon=" + longitude;

        $.ajax({
            url: queryURLUV,
            method: "GET"
        }).then(function (res) {
            $("#uv-display").empty();
            var uv = res.value;
            var uvElement = $("<button class='btn bg-success'>").text("UV Index: " + uv);
            $("#uv-display").html(uvElement);
        });
    });

    $.ajax({
        url: queryURLForcast,
        methid: "GET"
    }).then(function (res) {
        var results = res.list;
        console.log(results);
        $("#5-DayForcast").empty();
        for (var i = 0; i < results.length; i += 8) {

            var DaysDiv = $("<div class='card shadow-lg text-white bg-primary mx-auto mb-10 p-2' style='width: 10rem; height: 11rem;'>");
            var dates = results[i].dt_txt;
            var setDate = dates.substr(0, 10)
            var temp = results[i].main.temp;
            var hum = results[i].main.humidity;

            var h5date = $("<h5 class='card-title'>").text(setDate);
            var pTemp = $("<p class='card-text'>").text("Temp: " + temp);;
            var pHum = $("<p class='card-text'>").text("Humidity " + hum);;
            var weather = results[i].weather[0].main;

            switch (weather) {
                case "Clear":
                    var weatherIcon2 = $("<img>").attr("src", "http://openweathermap.org/img/wn/01d.png");
                    weatherIcon2.attr("style", "height: 60px; width: 60px");
                    break;
                case "Clouds":
                    var weatherIcon2 = $("<img>").attr("src", "http://openweathermap.org/img/wn/03d.png");
                    weatherIcon2.attr("style", "height: 60px; width: 60px");
                    break;
                case "Rain":
                    var weatherIcon2 = $("<img>").attr("src", "http://openweathermap.org/img/wn/09d.png");
                    weatherIcon2.attr("style", "height: 60px; width: 60px");
                    break;
                case "Snow":
                    var weatherIcon2 = $("<img>").attr("src", "http://openweathermap.org/img/wn/13d.png");
                    weatherIcon2.attr("style", "height: 60px; width: 60px");
                    break;
                case "Drizzle":
                    var weatherIcon2 = $("<img>").attr("src", "http://openweathermap.org/img/wn/10d.png");
                    weatherIcon2.attr("style", "height: 60px; width: 60px");
                    break;
            }

            DaysDiv.append(h5date);
            DaysDiv.append(weatherIcon2);
            DaysDiv.append(pTemp);
            DaysDiv.append(pHum);
            $("#5-DayForcast").append(DaysDiv);

        }
    });
}
loadPage();

$("#search-city").on("click", function (event) {
    event.preventDefault();
    var cityInput = $("#city-input").val().trim();
    var textContent = $(this).siblings("input").val();
    var storeArray = [];
    storeArray.push(textContent);
    localStorage.setItem('cityName', JSON.stringify(storeArray));

    searchCity(cityInput);
    loadPage();
});

function loadPage() {
    var previousSearch = JSON.parse(localStorage.getItem("cityName"));
    var searchDiv = $("<button class='btn border text-muted mt-1 shadow-sm bg-white rounded' style='width: 12rem;'>").text(previousSearch);
    var pSearch = $("<div>");
    pSearch.append(searchDiv)
    $("#search-history").prepend(pSearch);
}

$("#search-history").on('click', '.btn', function (event) {
    event.preventDefault();
    console.log($(this).text());
    searchCity($(this).text());

});