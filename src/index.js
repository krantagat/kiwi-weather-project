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
  let temperaureData = document.querySelector("#temperature");
  let cityData = document.querySelector("#city");
  let realFeelData = document.querySelector("#realFeel");
  let windData = document.querySelector("#wind");
  let humidityData = document.querySelector("#humidity");
  let descriptionData = document.querySelector("#description");
  let dateData = document.querySelector("#date");
  let timeData = document.querySelector("#time");
  let iconData = document.querySelector("#icon");
  temperaureData.innerHTML = Math.round(response.data.main.temp);
  cityData.innerHTML = `${response.data.name},${response.data.sys.country}`;
  realFeelData.innerHTML = `Realfeel: ${Math.round(
    response.data.main.feels_like
  )}°`;
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
search("Lille");

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);
