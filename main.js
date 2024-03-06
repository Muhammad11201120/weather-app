// Variables
const ApiKey = "c3e652eed37dcc2e50ec6ee569f9c361";
const ApiLink = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchInput = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherImg = document.querySelector(".weather-icon");
const weatherDescription = document.querySelector(".description");
//function to load weather image
function LoadingweatherImg(data) {
    if (data.weather[0].main == "Clouds") {
        weatherImg.src = "weather-app-img/images/clouds.png";
    } else if (data.weather[0].main == "Rain") {
        weatherImg.src = "weather-app-img/images/rain.png";
    } else if (data.weather[0].main == "Clear") {
        weatherImg.src = "weather-app-img/images/clear.png";
    } else if (data.weather[0].main == "Snow") {
        weatherImg.src = "weather-app-img/images/snow.png";
    } else if (data.weather[0].main == "Thunderstorm") {
        weatherImg.src = "weather-app-img/images/wind.png";
    } else if (data.weather[0].main == "Drizzle") {
        weatherImg.src = "weather-app-img/images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
        weatherImg.src = "weather-app-img/images/mist.png";
    } else {
        weatherImg.src = "weather-app-img/images/clear.png";
    }
}
//function to load weather description
function LoadWeatherDescription(data) {
    weatherDescription.innerText = data.weather[0].description;
}
async function ResponseStatus(response) {
    if (response.status == "404") {

        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        return;
    } else {
        const data = await response.json();
        console.log(data);
        document.querySelector(".city").innerText = data.name;
        document.querySelector(".temp").innerText = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        LoadingweatherImg(data);
        LoadWeatherDescription(data);
        document.querySelector(".error").style.display = "none";
        document.querySelector(".weather").style.display = "block";
    }
}
//function to get weather data
async function getWeather(city = "London") {
    const response = await fetch(ApiLink + city + "&appid=" + ApiKey);
    ResponseStatus(response);
}
//event listener for search button
searchButton.addEventListener("click", () => {
    getWeather(searchInput.value);
});

