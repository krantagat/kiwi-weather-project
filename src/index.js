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

function mainTemperature(response) {
  let temperatureData = document.querySelector("#temperature");
  let cityData = document.querySelector("#city");
  let realFeelData = document.querySelector("#realFeel");
  let windData = document.querySelector("#wind");
  let humidityData = document.querySelector("#humidity");
  let descriptionData = document.querySelector("#description");
  let dateData = document.querySelector("#date");
  let timeData = document.querySelector("#time");
  let iconData = document.querySelector("#icon");

  celsiusTemperature = Math.round(response.data.main.temp);
  temperatureData.innerHTML = celsiusTemperature;
  cityData.innerHTML = `${response.data.name},${response.data.sys.country}`;
  celsiusRealFeel = Math.round(response.data.main.feels_like);
  realFeelData.innerHTML = `Realfeel: ${celsiusRealFeel}°`;
  windData.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  humidityData.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  descriptionData.innerHTML = response.data.weather[0].description;
  dateData.innerHTML = formatDate(response.data.dt * 1000);
  timeData.innerHTML = formatTime(response.data.dt * 1000);

  iconData.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function search(city) {
  let apiKey = "ff1d9ea9376b5c27a82e04fc2b2abdbb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

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
