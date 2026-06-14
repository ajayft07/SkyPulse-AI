const apiKey = "PASTE_YOUR_API_KEY_HERE";

async function getWeather(){

const city = document.getElementById("cityInput").value;

if(city === ""){
alert("Enter a city name");
return;
}

const url =
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

try{

const response = await fetch(url);
const data = await response.json();

document.getElementById("city").innerText =
data.name;

document.getElementById("temperature").innerText =
Math.round(data.main.temp) + "°C";

document.getElementById("description").innerText =
data.weather[0].description;

document.getElementById("humidity").innerText =
data.main.humidity + "%";

document.getElementById("wind").innerText =
data.wind.speed + " km/h";

}
catch(error){

alert("City not found");

}

}
