"use strict"


const navBar = document.querySelector('.div-button');

const sideNav = document.querySelector('.sidebar');

const date = new Date();

const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };


function addZero(i) {
    if (i < 10) {i = "0" + i}
    return i;
  }

// let h = function() {
//     const date1 = new Date();
//     if (date1.getHours() < 10) {
//         return "0" + date1.getHours();
//     } else {
//         return date1.getHours();
//     }
// };

// let m = function() {
//     const date1 = new Date();
//     if (date1.getMinutes() < 10) {
//         return "0" + date1.getMinutes();
//     } else {
//         return date1.getMinutes();
//     }
// };


// let h = addZero(date.getHours()) ;
// let m = addZero(date.getMinutes()) ;




// document.querySelector('.time-date').innerHTML = h + ":" + m +
//     " - " + date.toLocaleDateString("en-US", options);

// setInterval(() => {
//     const date = new Date();
//     const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
//     document.querySelector('.time-date').innerHTML = h + ":" + m +
//     " - " + date.toLocaleDateString("en-US", options);

// }, 2000);



navBar.addEventListener("click", ()=> {
    if (sideNav.className == "sidebar") {
        sideNav.className = "sidebar-active";
        navBar.className = "div-button-active"
    } else {
        sideNav.className = "sidebar";
        navBar.className = "div-button"
    }


})


const searchBtn = document.querySelector(".search_button");
const API = "1fbb3f7d6712a3a7cbe3b38e35181daa";


let searchValue;
let h;
let m;
let s;

let dateNow  = new Date();

let UTCtime =  dateNow.getTime() + dateNow.getTimezoneOffset() * 60 * 1000;


let ShiftTime;
let dateShift;
let a;
window.onload = () => {
    
    searchValue = "Berlin";

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${API}`)
        .then(function (resp) { return resp.json() })
        .then(function (data) {

            document.querySelector('.city_name_value').innerText = data.name;  

            document.getElementById('temp').innerHTML = Math.round(data.main.temp - 273) + "&deg;";

            let iconId = data.weather[0].icon;

            document.getElementById('weather_icon').src = `https://openweathermap.org/img/wn/${iconId}@2x.png`;

            let weatherRaw = data.weather[0].description;

            let weatherState = weatherRaw.charAt(0).toUpperCase() + weatherRaw.slice(1);

            document.getElementById('weather_state').innerText = weatherState;  

            document.querySelector('.parameter_weather').innerText = data.weather[0].main;

            document.querySelector('.parameter_humidity').innerText = data.main.humidity + "%";

            document.querySelector('.parameter_pressure').innerText = data.main.pressure + " hPa";

            document.querySelector('.parameter_wind').innerText = data.wind.speed + " m/s";
     

            ShiftTime = UTCtime + data.timezone * 1000;
            dateShift = new Date(ShiftTime);
            h = addZero(dateShift.getHours());
            m = addZero(dateShift.getMinutes());
            s = dateShift.getSeconds();
            a = h + ":" + m + 
            " - " + dateShift.toLocaleDateString("en-US", options);
            document.querySelector('.time-date').innerHTML = a;


            


    })
}


setInterval(() => {
    UTCtime += s*1000 + 1000;
    a = h + ":" + m + 
    " - " + dateShift.toLocaleDateString("en-US", options);
    document.querySelector('.time-date').innerHTML = a;
    console.log(a);


}, 1000)




searchBtn.onclick = () => {

    searchValue = document.querySelector(".search-city__input").value;

    if (isFinite(searchValue)) { alert("Write down a city or a state name"); return; }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${API}`)
        .then(function (resp) { return resp.json() })
        .then(function (data) {

            if(data.name.length > 8) {

                document.querySelector(".city_name_value").style.paddingTop = "10px";

            } else {

                document.querySelector(".city_name_value").style.paddingTop = "50px";
            }

            document.querySelector('.city_name_value').innerText = data.name;  

            document.getElementById('temp').innerHTML = Math.round(data.main.temp - 273) + "&deg;";

            let iconId = data.weather[0].icon;

            document.getElementById('weather_icon').src = `https://openweathermap.org/img/wn/${iconId}@2x.png`;

            let weatherRaw = data.weather[0].description;

            let weatherState = weatherRaw.charAt(0).toUpperCase() + weatherRaw.slice(1);

            document.getElementById('weather_state').innerText = weatherState;  

            document.querySelector('.parameter_weather').innerText = data.weather[0].main;

            document.querySelector('.parameter_humidity').innerText = data.main.humidity + "%";

            document.querySelector('.parameter_pressure').innerText = data.main.pressure + " hPa";

            document.querySelector('.parameter_wind').innerText = data.wind.speed + " m/s";


            
            // const dateNow = new Date();
            // const UTCtime = dateNow.getTime() + dateNow.getTimezoneOffset() * 60 * 1000;
            // const ShiftTime = UTCtime + data.timezone * 1000;
            // const dateShift = new Date(ShiftTime);
            // let h = addZero(dateShift.getHours());
            // let m = addZero(dateShift.getMinutes());
            // document.querySelector('.time-date').innerHTML = h + ":" + m + 
            // " - " + dateShift.toLocaleDateString("en-US", options);


            ShiftTime = UTCtime + data.timezone * 1000;
            dateShift = new Date(ShiftTime);
            h = addZero(dateShift.getHours());
            m = addZero(dateShift.getMinutes());
            a = h + ":" + m + 
            " - " + dateShift.toLocaleDateString("en-US", options);
            document.querySelector('.time-date').innerHTML = a;


    })
    .catch((er) => {
        alert('Something went wrong, try again')
    })

}
