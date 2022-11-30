function showTemperature(response) {
  let currentTemperature = Math.round(response.data.main.temp);
  let grads = document.querySelector("#grad-value");
  grads.innerHTML = `${currentTemperature}`;
  let city = document.querySelector("#city-input");
  city.innerHTML = response.data.name;
}

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityInput.value}`;
  let city = `${cityInput.value}`;
  let apiKey = "1fd8093fa5ff12d796d7de756cc9d6b9";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
function convertToCity(response) {
  let city = response.data[0].name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city}`;
  let apiKey = "1fd8093fa5ff12d796d7de756cc9d6b9";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "1fd8093fa5ff12d796d7de756cc9d6b9";
  let apiUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  axios.get(apiUrl).then(convertToCity);
}
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentTime = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentTime.getDay()];
let hour = currentTime.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = currentTime.getMinutes();
if (minute < 10) {
  minute = `0${hour}`;
}

let time = document.querySelector("#current-time");
time.innerHTML = `${day} ${hour}:${minute}`;

let searchForm = document.querySelector("#search-city");
searchForm.addEventListener("submit", searchCity);

let currentPosition = document.querySelector("#current-position");
currentPosition.addEventListener("click", getCurrentPosition);
