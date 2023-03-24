"use strict"


const navBar = document.querySelector('.div-button');

const sideNav = document.querySelector('.sidebar');

const date = new Date();

const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

let h = function() {
    const date1 = new Date();
    if (date1.getHours() < 10) {
        return "0" + date1.getHours();
    } else {
        return date1.getHours();
    }
};

let m = function() {
    const date1 = new Date();
    if (date1.getMinutes() < 10) {
        return "0" + date1.getMinutes();
    } else {
        return date1.getMinutes();
    }
};


document.querySelector('.time-date').innerHTML = h() + ":" + m() +
    " - " + date.toLocaleDateString("en-US", options);

setInterval(() => {
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.querySelector('.time-date').innerHTML = h() + ":" + m() +
    " - " + date.toLocaleDateString("en-US", options);

}, 2000);



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



window.onload = () => {
    
    let searchValue = "Berlin"

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${API}`)
        .then(function (resp) { return resp.json() })
        .then(function (data) {
            console.log(data)

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
            
            const date1 = new Date();


            // const nowInLocalTime = Date.now()  + data.timezone;
            // const millitime = new Date(nowInLocalTime);
            // const dateFormat = millitime.toLocaleString();
            // let hours = millitime.toLocaleString("en-US", {hour: "numeric"}); 
            // let minutes = millitime.toLocaleString("en-US", {minute: "numeric"});
            // console.log(hours, minutes);




    })
}



searchBtn.onclick = () => {

    let searchValue = document.querySelector(".search-city__input").value;

    if (isFinite(searchValue)) { alert("Write down a city or a state name"); return; }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${API}`)
        .then(function (resp) { return resp.json() })
        .then(function (data) {
            console.log(data)
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

    })
    .catch((er) => {
        alert('Something went wrong, try again')
    })

}
