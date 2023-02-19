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

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#enter-city-input");
  console.log(searchInput.value);
  let apiKey = "62bc298785543e137bc6756e514eb1c3";
  let units = "metric";
  let city = `${searchInput.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let currentCity = document.querySelector(".current-city");
  let messageTemp = `${temperature} °`;
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
  if (description.innerHTML === "clear sky") {
    currentWeatherIcon.setAttribute("src", "weather-icons/clear-day.svg");
  }
}

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
  let city = response.data.name;
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

  currentCity.innerHTML = `${city}`;
  searchInput.value = city;
  currentDegree.innerHTML = messageTemp;
  currentHumidity.innerHTML = messageHumidity;
  currentWind.innerHTML = messageWind;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

function showTempFahrenheit(event) {
  let currentDegree = document.querySelector("#current-degree");
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  currentDegree.innerHTML = Math.round(fahrenheitTemperature);
}

let celsiusTemperature = null;

let fahrenheitUnit = document.querySelector("#fahrenheit-link");
fahrenheitUnit.addEventListener("click", showTempFahrenheit);

function showTempCelsius(event) {
  event.preventDefault();
  let currentDegree = document.querySelector("#current-degree");
  currentDegree.innerHTML = Math.round(celsiusTemperature);
}

let celsiusUnit = document.querySelector("#celsius-link");
celsiusUnit.addEventListener("click", showTempCelsius);
