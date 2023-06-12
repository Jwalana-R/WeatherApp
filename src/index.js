let now = new Date();
let Days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = Days[now.getDay()];

let datetime = document.querySelector("#date-time");
datetime.innerHTML = `${day} ${now.getHours()}:${now.getMinutes()} `;

let form = document.querySelector("form");
form.addEventListener("submit", search);

let cityname = document.querySelector("#cityname");
let cityinput = document.querySelector("#city-input");
function search(event) {
  event.preventDefault();
  if (cityinput.value) {
    cityname.innerHTML = `${cityinput.value}`;
  }
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityinput.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(follow);
}

let apiKey = "aa09763d916df0424c840d55bfc2d2c9";

let weatherdes = document.querySelector("#description");
let temp = document.querySelector("#temperature");
let wind = document.querySelector("#wind");
let humidity = document.querySelector("#humidity");

function follow(response) {
  console.log(response);
  weatherdes.innerHTML = `${response.data.weather[0].description}`;
  temp.innerHTML = `${Math.round(response.data.main.temp)}°C`;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  wind.innerHTML = `Wind: ${response.data.wind.speed}km/h`;
  cityname.innerHTML = `${response.data.name}`;
}

let button = document.querySelector("button");
button.addEventListener("click", showcurrent);

function showcurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showposition);
}
function showposition(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let url1 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url1).then(follow);
}
