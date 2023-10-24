const apiKey = "ad09b149e41eb2cf9fcd18a73a702dbd";

try{
    navigator.geolocation.getCurrentPosition(showPosition);
}
catch(error)
{
    console.log(new Error("The Location can't be accessed due to some reasons"));
}


function showPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    currentPosition = async (latitude, longitude)=>{
        let response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
        let data = await response.json();
        let currentCity = data.city;
        checkWeather(currentCity);
    }

    currentPosition(latitude, longitude);
}

currentPosition = async (latitude, longitude) =>{

}

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

checkWeather = async (cityName) => {
    let city = encodeURIComponent(cityName);
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    let data = await response.json();
    console.log(data);

    document.querySelector(".city").innerHTML = data.name
    document.querySelector(".temp").innerHTML = data.main.temp + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
    let cli = data.weather[0].description;
    document.querySelector(".climate").innerHTML = cli.charAt(0).toUpperCase() + cli.slice(1);
    

    let weather = data.weather[0].main;

    if (weather == "Clouds")
        weatherIcon.src = "images/clouds.png";

    if (weather == "Clear")
        weatherIcon.src = "images/clear.png";

    if (weather == "Drizzle")
        weatherIcon.src = "images/drizzle.png";

    if (weather == "Mist")
        weatherIcon.src = "images/mist.png";

    if (weather == "Rain")
        weatherIcon.src = "images/rain.png";

    if (weather == "Snow")
        weatherIcon.src = "images/snow.png";

    document.querySelector(".weather").style.display = "block";
}


searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})