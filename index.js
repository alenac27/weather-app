let date = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let h1 = document.querySelector("h1");
let h2 = document.querySelector("h2");

let currentDay = days[date.getDay()];
let currentMonth = months[date.getMonth()];
let currentDate = date.getDate();
let currentTime = date.getTimezoneOffset();
let currentHour = date.getHours();
let currentMinute = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();

h1.innerHTML = `${currentDay}`;
h2.innerHTML = `${currentMonth} ${currentDate}, ${currentHour}:${currentMinute}`;
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Thu", "Fri", "Sat", "Sun"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${day}</div>
        <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> 18° </span>
          <span class="weather-forecast-temperature-min"> 12° </span>
        </div>
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "eae061c95483dd066657bfc7525418ed";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let currentCity = document.querySelector(".current-city");
  let messageTemp = `${temperature}`;
  let currentDegree = document.querySelector("#current-degree");
  let messageHumidity = `${humidity} %`;
  let currentHumidity = document.querySelector(".humidity-percent");
  let messageWind = `${wind} km/h`;
  let currentWind = document.querySelector(".wind-speed");
  let description = document.querySelector("#description");
  let currentWeatherIcon = document.querySelector("#current-weather-icon");
  celsiusTemperature = response.data.main.temp;

  currentCity.innerHTML = response.data.name;
  currentDegree.innerHTML = messageTemp;
  currentHumidity.innerHTML = messageHumidity;
  currentWind.innerHTML = messageWind;
  description.innerHTML = response.data.weather[0].description;
  currentWeatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  currentWeatherIcon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "62bc298785543e137bc6756e514eb1c3";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#enter-city-input");
  searchCity(cityInputElement.value);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

searchCity("Berlin");

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getCurrentLocation);

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let apiKeyGeolocation = "5ef4de8cd6b7fefcd7c42f98cf464ce8";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiUrlGeoLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKeyGeolocation}&units=${units}`;
  axios.get(apiUrlGeoLocation).then(showLocation);
}

function showLocation(response) {
  let locationCity = response.data.name;
  let currentCity = document.querySelector(".current-city");
  let searchInput = document.querySelector("#enter-city-input");
  let temperature = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let messageTemp = `${temperature} °`;
  let currentDegree = document.querySelector("#current-degree");
  let messageHumidity = `${humidity} %`;
  let currentHumidity = document.querySelector(".humidity-percent");
  let messageWind = `${wind} km/h`;
  let currentWind = document.querySelector(".wind-speed");

  currentCity.innerHTML = `${locationCity}`;
  searchInput.value = locationCity;
  currentDegree.innerHTML = messageTemp;
  currentHumidity.innerHTML = messageHumidity;
  currentWind.innerHTML = messageWind;
}

function showTempFahrenheit(event) {
  let currentDegree = document.querySelector("#current-degree");
  event.preventDefault();
  celsiusUnit.classList.remove("active");
  fahrenheitUnit.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  currentDegree.innerHTML = Math.round(fahrenheitTemperature);
}

let celsiusTemperature = null;

let fahrenheitUnit = document.querySelector("#fahrenheit-link");
fahrenheitUnit.addEventListener("click", showTempFahrenheit);

function showTempCelsius(event) {
  event.preventDefault();
  celsiusUnit.classList.add("active");
  fahrenheitUnit.classList.remove("active");
  let currentDegree = document.querySelector("#current-degree");
  currentDegree.innerHTML = Math.round(celsiusTemperature);
}

let celsiusUnit = document.querySelector("#celsius-link");
celsiusUnit.addEventListener("click", showTempCelsius);

displayForecast();
