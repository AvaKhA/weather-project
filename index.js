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
  getForecast(response.data.coord);
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

//forecast
function getForecast(coordinates) {
  let apiKey = "ab8e7ef210556986d1c9a75d6007b825";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastData = response.data.daily;
  //forecastData.length = forecastData.length - 3;
  console.log(forecastData);
  let forecastCard = document.querySelector("#forecast");
  let forecastHTML = "";
  forecastData.forEach(function (forecast, index) {
    if (index < 6 && index > 0) {
      forecastHTML =
        forecastHTML +
        `            
            <div class="card text-center">
              <ul class="next-day-card">
                <li class="forecast-date">${findDay(forecast.dt)}</li>
                <li>
                  <img src="http://openweathermap.org/img/wn/${
                    forecast.weather[0].icon
                  }@2x.png" alt="..." class="forecast-img" />
                </li>
                <li><span class="max-temp">${Math.round(
                  forecast.temp.max
                )}°</span> <span class="min-temp">${Math.round(
          forecast.temp.min
        )}°</span></li>
              </ul>
            </div>`;
    }
  });
  forecastCard.innerHTML = forecastHTML;
}

function findDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return weekDays[day];
}
//call function
generateWeatherUrl("tehran");
