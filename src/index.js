function mainTemperature(response) {
  let temperaureData = document.querySelector("#temperature");
  let cityData = document.querySelector("#city");
  let realFeelData = document.querySelector("#realFeel");
  let windData = document.querySelector("#wind");
  let humidityData = document.querySelector("#humidity");
  let descriptionData = document.querySelector("#description");
  temperaureData.innerHTML = Math.round(response.data.main.temp);
  cityData.innerHTML = `${response.data.name},${response.data.sys.country}`;
  realFeelData.innerHTML = `Realfeel: ${Math.round(
    response.data.main.feels_like
  )}°`;
  windData.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  humidityData.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  descriptionData.innerHTML = response.data.weather[0].description;
  console.log(response.data.weather[0].description);
}

// let city = prompt
let city = "Paris";
let apiKey = "ff1d9ea9376b5c27a82e04fc2b2abdbb";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(mainTemperature);
