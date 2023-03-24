


const navBar = document.querySelector('.div-button');
const sideNav = document.querySelector('.sidebar');
const date  = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
document.querySelector('.time-date').innerHTML = date.getHours() + ":" + date.getMinutes() +
" - " + date.toLocaleDateString("en-US", options);
setTimeout(() => { 
    const date  = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
document.querySelector('.time-date').innerHTML = date.getHours() + ":" + date.getMinutes() +
" - " + date.toLocaleDateString("en-US", options);
}, 1000);



navBar.addEventListener("click", ()=> {
    if (sideNav.className == "sidebar") {
        sideNav.className = "sidebar-active";
        navBar.className = "div-button-active"
    } else {
        sideNav.className = "sidebar";
        navBar.className = "div-button"
    }


})