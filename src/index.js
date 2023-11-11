function formatDate(timestamp) {
  let dateData = new Date(timestamp);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let day = days[dateData.getDay()];
  let date = dateData.getDate();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[dateData.getMonth()];
  let year = dateData.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

function formatForecastDay(forecastTimestamp) {
  let date = new Date(forecastTimestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function formatTime(timestamp) {
  let dateData = new Date(timestamp);
  let hour = dateData.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = dateData.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${hour}:${minute}`;
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastData = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 4) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-3 forecast-box">
        <div class="forecast-per-day">${formatForecastDay(
          forecastDay.time
        )}</div>
        <img id="icon" src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
          forecastDay.condition.icon
        }.png" />
        <div class="forecast-temp">
          <span class="forecast-max-temp">${Math.round(
            forecastDay.temperature.maximum
          )}°</span>
          <span class="forecast-min-temp">${Math.round(
            forecastDay.temperature.minimum
          )}°</span>
        </div>
      </div>
    
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastData.innerHTML = forecastHTML;
}

function getForecast(forecastCity) {
  let apiKey = "21ofd8a07570t9fa235b2705bf347e82";
  let apiUrl = `
  https://api.shecodes.io/weather/v1/forecast?query=${forecastCity}&key=${apiKey}&units=metric
`;

  axios.get(apiUrl).then(displayForecast);
}

function mainTemperature(response) {
  let temperatureData = document.querySelector("#temperature");
  let cityData = document.querySelector("#city");
  let realFeelData = document.querySelector("#realFeel");
  let windData = document.querySelector("#wind");
  let humidityData = document.querySelector("#humidity");
  let descriptionData = document.querySelector("#description");
  let dateData = document.querySelector("#date");
  let dateLastUpdateData = document.querySelector("#dateLastUpdate");
  let timeLastUpdateData = document.querySelector("#timeLastUpdate");
  let iconData = document.querySelector("#icon");

  celsiusTemperature = Math.round(response.data.temperature.current);
  temperatureData.innerHTML = celsiusTemperature;
  cityData.innerHTML = `${response.data.city}, ${response.data.country}`;
  celsiusRealFeel = Math.round(response.data.temperature.feels_like);
  realFeelData.innerHTML = `Realfeel: ${celsiusRealFeel}°`;
  windData.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  humidityData.innerHTML = `Humidity: ${response.data.temperature.humidity}%`;
  descriptionData.innerHTML = response.data.condition.description;
  dateData.innerHTML = formatDate(response.data.time * 1000);
  dateLastUpdateData.innerHTML = formatDate(response.data.time * 1000);
  timeLastUpdateData.innerHTML = formatTime(response.data.time * 1000);

  iconData.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  getForecast(response.data.city);
}

function search(city) {
  let apiKey = "21ofd8a07570t9fa235b2705bf347e82";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(mainTemperature);
}

function searchCity(event) {
  event.preventDefault();
  let cityData = document.querySelector("#search-city");
  search(cityData.value);
  document.getElementById("search-city").value = "";
}

// function displayFahrenheitTemperature(event) {
//   event.preventDefault();
//   let temperatureData = document.querySelector("#temperature");
//   // remove the active class from the celsius
//   celsiusLink.classList.remove("active");
//   fahrenheitLink.classList.add("active");
//   let realFeelData = document.querySelector("#realFeel");
//   let fahrenheit = (celsiusTemperature * 9) / 5 + 32;
//   let realFeelFahrenheit = Math.round((celsiusRealFeel * 9) / 5 + 32);
//   temperatureData.innerHTML = Math.round(fahrenheit);
//   realFeelData.innerHTML = `Realfeel: ${realFeelFahrenheit}°`;
// }

// function displayCelsiusTemperature(event) {
//   event.preventDefault();
//   let temperatureData = document.querySelector("#temperature");
//   celsiusLink.classList.add("active");
//   fahrenheitLink.classList.remove("active");
//   temperatureData.innerHTML = celsiusTemperature;
//   let realFeelData = document.querySelector("#realFeel");
//   realFeelData.innerHTML = `Realfeel: ${celsiusRealFeel}°`;
// }

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

// let fahrenheitLink = document.querySelector("#fahrenheit");
// fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

// let celsiusLink = document.querySelector("#celsius");
// celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Lille");

// Update city from currentLocation
function showCurrentLocationTemp(currentLocation) {
  currentLocation.preventDefault();
  document.getElementById("search-city").value = "";

  function handlePosition(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    let apiKey = "21ofd8a07570t9fa235b2705bf347e82";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${long}&lat=${lat}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showCurrentLocationData);
  }

  function showCurrentLocationData(response) {
    let temperatureData = document.querySelector("#temperature");
    let cityData = document.querySelector("#city");
    let realFeelData = document.querySelector("#realFeel");
    let windData = document.querySelector("#wind");
    let humidityData = document.querySelector("#humidity");
    let descriptionData = document.querySelector("#description");
    let dateData = document.querySelector("#date");
    let dateLastUpdateData = document.querySelector("#dateLastUpdate");
    let timeLastUpdateData = document.querySelector("#timeLastUpdate");
    let iconData = document.querySelector("#icon");

    celsiusTemperature = Math.round(response.data.temperature.current);
    temperatureData.innerHTML = celsiusTemperature;
    cityData.innerHTML = `${response.data.city}, ${response.data.country}`;
    celsiusRealFeel = Math.round(response.data.temperature.feels_like);
    realFeelData.innerHTML = `Realfeel: ${celsiusRealFeel}°`;
    windData.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
    humidityData.innerHTML = `Humidity: ${response.data.temperature.humidity}%`;
    descriptionData.innerHTML = response.data.condition.description;
    dateData.innerHTML = formatDate(response.data.time * 1000);
    dateLastUpdateData.innerHTML = formatDate(response.data.time * 1000);
    timeLastUpdateData.innerHTML = formatTime(response.data.time * 1000);

    iconData.setAttribute(
      "src",
      `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );
    getForecast(response.data.city);
  }
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", showCurrentLocationTemp);
