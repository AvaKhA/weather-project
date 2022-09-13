//displaying date and time
let now = new Date();
let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let date = weekDays[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let dateTime = document.querySelector("#date-time");
dateTime.innerHTML = `${date} ${hours}:${minutes}`;

//city input
function getCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  cityInput = cityInput.value;
  generateWeatherUrl(cityInput);
}
let searchButton = document.querySelector("#button-addon2");
searchButton.addEventListener("click", getCity);

let searchForm = document.querySelector("#city-input");
searchForm.addEventListener("keydown", function (event) {
  if (event.code === "Enter") {
    getCity(event);
  }
});

// weather API
function generateWeatherUrl(city) {
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showCity);
  axios.get(url).then(showTemperature);
}

//show city and temperature
function showCity(response) {
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = `${response.data.name}`;
}

function showTemperature(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let currentTempBox = document.querySelector("#current-temperature");
  currentTempBox.innerHTML = `current temperature: ${currentTemp}°C`;
}
