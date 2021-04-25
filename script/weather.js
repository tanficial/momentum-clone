const weatherBox = document.querySelector(".weather-box");
const weather = weatherBox.querySelector(".weather");
const temperature = weatherBox.querySelector(".temperature");
const place = weatherBox.querySelector(".place");

const API_KEY = "9d0286a2e212c2d887959c33c1acff52";
const COORDS = "coords"

function saveCoords(lat, long){
    localStorage.setItem(COORDS, JSON.stringify({lat, long}));
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        saveCoords(lat, long);
        getWeather();
    })
}

function getWeather(){
    const coords = JSON.parse(localStorage.getItem(COORDS));
    if(coords === null){
        askForCoords();
        return;
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${ coords.lat }&lon=${ coords.long }&appid=${API_KEY}`)
    .then(function(response){
        return response.json();
    })
    .then(function(json){
        temperature.innerText = `${ json.main.temp } ℃`;
        place.innerText = json.name;
        weather.innerText = json.weather[0].main;

    });
}

(function init(){
    getWeather();
})();