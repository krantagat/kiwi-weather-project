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
  console.log(response.data.daily);
  let forecastData = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Mon", "Tue", "Wed", "Thu"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-3 forecast-box">
        <div class="forecast-per-day">${day}</div>
        <img id="icon" src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-day.png" />
        <div class="forecast-temp">
          <span class="forecast-max-temp">18°</span>
          <span class="forecast-min-temp">10°</span>
        </div>
      </div>
    
  `;
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
  console.log(cityData.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureData = document.querySelector("#temperature");
  // remove the active class from the celsius
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let realFeelData = document.querySelector("#realFeel");
  let fahrenheit = (celsiusTemperature * 9) / 5 + 32;
  let realFeelFahrenheit = Math.round((celsiusRealFeel * 9) / 5 + 32);
  temperatureData.innerHTML = Math.round(fahrenheit);
  realFeelData.innerHTML = `Realfeel: ${realFeelFahrenheit}°`;
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureData = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureData.innerHTML = celsiusTemperature;
  let realFeelData = document.querySelector("#realFeel");
  realFeelData.innerHTML = `Realfeel: ${celsiusRealFeel}°`;
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Lille");
