"use strict";

const navBar = document.querySelector(".div-button");

const sideNav = document.querySelector(".sidebar");

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

navBar.addEventListener("click", () => {
  if (sideNav.className == "sidebar") {
    sideNav.className = "sidebar-active";
    navBar.className = "div-button-active";
  } else {
    sideNav.className = "sidebar";
    navBar.className = "div-button";
  }
});

const searchBtn = document.querySelector(".search_button");
const API = "1fbb3f7d6712a3a7cbe3b38e35181daa";

let searchValue;
let h;
let m;
let s;

let dateNow = new Date();
let UTCtime = dateNow.getTime() + dateNow.getTimezoneOffset() * 60 * 1000;
let ShiftTime;
let dateShift;
let Timezone;
let a;

window.onload = () => {
  searchValue = "Berlin";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${API}`;
  async function fetchData(url) {
    try {
      const response = await fetch(url);
      try {
        if (response.ok) {
          const data = await response.json();

          document.querySelector(".city_name_value").innerText = data.name;

          document.getElementById("temp").innerHTML =
            Math.round(data.main.temp - 273) + "&deg;";

          let iconId = data.weather[0].icon;

          document.getElementById(
            "weather_icon"
          ).src = `https://openweathermap.org/img/wn/${iconId}@2x.png`;

          let weatherRaw = data.weather[0].description;

          let weatherState =
            weatherRaw.charAt(0).toUpperCase() + weatherRaw.slice(1);

          document.getElementById("weather_state").innerText = weatherState;

          document.querySelector(".parameter_weather").innerText =
            data.weather[0].main;

          document.querySelector(".parameter_humidity").innerText =
            data.main.humidity + "%";

          document.querySelector(".parameter_pressure").innerText =
            data.main.pressure + " hPa";

          document.querySelector(".parameter_wind").innerText =
            data.wind.speed + " m/s";

          Timezone = data.timezone;
          ShiftTime = UTCtime + Timezone * 1000;
          dateShift = new Date(ShiftTime);
          h = addZero(dateShift.getHours());
          m = addZero(dateShift.getMinutes());
          s = dateShift.getSeconds();
          a =
            h +
            ":" +
            m +
            " - " +
            dateShift.toLocaleDateString("en-US", options);
          document.querySelector(".time-date").innerHTML = a;
        } else {
          alert("Something went wrong");
        }
      } catch (e) {
        alert(e.message);
      }
    } catch (e) {
      alert("Network problems");
    }
  }
  fetchData(url);
};

setInterval(() => {
  dateNow = new Date();
  UTCtime = dateNow.getTime() + dateNow.getTimezoneOffset() * 60 * 1000;
  ShiftTime = UTCtime + Timezone * 1000;
  dateShift = new Date(ShiftTime);
  h = addZero(dateShift.getHours());
  m = addZero(dateShift.getMinutes());
  a = h + ":" + m + " - " + dateShift.toLocaleDateString("en-US", options);
  document.querySelector(".time-date").innerHTML = a;
}, 1000);

document
  .querySelector(".search-city__input")
  .addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      searchBtn.click();
    }
  });

searchBtn.onclick = () => {
  searchValue = document.querySelector(".search-city__input").value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${API}`;

  if (isFinite(searchValue)) {
    alert("Write down a city or a state name");
    return;
  }

  async function fetchData(url) {
    try {
      const response = await fetch(url);
      try {
        if (response.ok) {
          const data = await response.json();

          document.querySelector(".city_name_value").innerText = data.name;

          document.getElementById("temp").innerHTML =
            Math.round(data.main.temp - 273) + "&deg;";

          let iconId = data.weather[0].icon;

          document.getElementById(
            "weather_icon"
          ).src = `https://openweathermap.org/img/wn/${iconId}@2x.png`;

          let weatherRaw = data.weather[0].description;

          let weatherState =
            weatherRaw.charAt(0).toUpperCase() + weatherRaw.slice(1);

          document.getElementById("weather_state").innerText = weatherState;

          document.querySelector(".parameter_weather").innerText =
            data.weather[0].main;

          document.querySelector(".parameter_humidity").innerText =
            data.main.humidity + "%";

          document.querySelector(".parameter_pressure").innerText =
            data.main.pressure + " hPa";

          document.querySelector(".parameter_wind").innerText =
            data.wind.speed + " m/s";

          Timezone = data.timezone;
          ShiftTime = UTCtime + Timezone * 1000;
          dateShift = new Date(ShiftTime);
          h = addZero(dateShift.getHours());
          m = addZero(dateShift.getMinutes());
          s = dateShift.getSeconds();
          a =
            h +
            ":" +
            m +
            " - " +
            dateShift.toLocaleDateString("en-US", options);
          document.querySelector(".time-date").innerHTML = a;
        } else {
          alert("Something went wrong, try again");
        }
      } catch (e) {
        alert(e.message);
      }
    } catch (e) {
      alert("Network problems");
    }
  }
  fetchData(url);
};
