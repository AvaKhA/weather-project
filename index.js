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
  axios.get(url).then(showInformation);
}

//show city and temperature and date
function showInformation(response) {
  let cityName = document.querySelector("#city-name");
  let temperatureElement = document.querySelector("#current-temperature");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateTimeElement = document.querySelector("#date-time");
  let iconElement = document.querySelector("#current-icon");

  celsiusTemperature = response.data.main.temp;
  console.log(celsiusTemperature);

  cityName.innerHTML = `${response.data.name}`;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  descriptionElement.innerHTML = `${response.data.weather[0].description}`;
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} Km/h`;
  dateTimeElement.innerHTML = showDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  console.log(response.data);
}

function showDate(timestamp) {
  let now = new Date(timestamp);
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = weekDays[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

// celsius and fahrenheit
let celsiusTemperature = null;

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  celsiusLink.classList.remove("disable");
  fahrenheitLink.classList.add("disable");
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  celsiusLink.classList.add("disable");
  fahrenheitLink.classList.remove("disable");
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

//forecast
function displayForecast() {
  let forecastCard = document.querySelector("#forecast");
  let forecastHTML = "";
  let days = ["Fri", "Sat", "Sun", "Mon", "Tue"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `            
            <div class="card text-center">
              <ul class="next-day-card">
                <li class="forecast-date">${day}</li>
                <li>
                  <img src="visuals/sunny.png" alt="..." class="forecast-img" />
                </li>
                <li>20°C</li>
              </ul>
            </div>`;
  });
  forecastCard.innerHTML = forecastHTML;
}

//call function
generateWeatherUrl("tehran");
displayForecast();
