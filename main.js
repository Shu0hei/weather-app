const apiKey = "46d49fc44005cf7715bc238054af5c05";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=id&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const backgroundImage = document.getElementsByTagName("body")[0];

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
  } else {
    const data = await response.json();

    console.log(data);

    document.querySelector(".city").innerHTML =
      data.name + ", " + data.sys.country;
    document.querySelector(".detail-weather").innerHTML =
      data.weather[0].description +
      ", " +
      Math.round(data.main.temp_max) +
      "° / " +
      Math.round(data.main.temp_min) +
      "°";
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°";
    document.querySelector(".feels-like").innerHTML =
      Math.round(data.main.feels_like) + "°";
    document.querySelector(".wind-speed").innerHTML = data.wind.speed + " km/h";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".pressure").innerHTML = data.main.pressure;
    document.querySelector(".ground-level").innerHTML = data.main.grnd_level;
    document.querySelector(".sea-level").innerHTML = data.main.sea_level;

    if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
      backgroundImage.style.backgroundImage = "url('images/clear.jpg')";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
      backgroundImage.style.backgroundImage = "url('images/mist.jpg')";
    } else if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
      backgroundImage.style.backgroundImage = "url('images/clouds.jpg')";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
      backgroundImage.style.backgroundImage = "url('images/rain.jpg')";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
      backgroundImage.style.backgroundImage = "url('images/drizzle.jpg')";
    } else if (data.weather[0].main == "Snow") {
      weatherIcon.src = "images/snow.png";
      backgroundImage.style.backgroundImage = "url('images/snow.jpg')";
    }

    document.querySelector(".container").style.maxWidth = "80%";
    document.querySelector(".wrapper").style.display = "flex";
    document.querySelector(".search").style.width = "60%";
    document.querySelector(".error").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
