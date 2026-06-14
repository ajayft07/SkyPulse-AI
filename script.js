const apiKey = "ac31cbb80c3db428544a66fd775265c1";

function quickSearch(city){
document.getElementById("cityInput").value = city;
getWeather();
}

async function getWeather(){

const city = document.getElementById("cityInput").value;

if(city===""){
alert("Enter a city");
return;
}

const url=
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

try{

const response=await fetch(url);
const data=await response.json();

document.getElementById("city").innerText=data.name;

document.getElementById("temperature").innerText=
Math.round(data.main.temp)+"°C";

document.getElementById("description").innerText=
data.weather[0].description;

document.getElementById("humidity").innerText=
data.main.humidity+"%";

document.getElementById("wind").innerText=
data.wind.speed+" km/h";

document.getElementById("feelsLike").innerText=
Math.round(data.main.feels_like)+"°C";

document.getElementById("visibility").innerText=
(data.visibility/1000).toFixed(1)+" km";

const condition=data.weather[0].main;

if(condition==="Clear"){
document.getElementById("weatherIcon").innerHTML="☀️";
}
else if(condition==="Clouds"){
document.getElementById("weatherIcon").innerHTML="☁️";
}
else if(condition==="Rain"){
document.getElementById("weatherIcon").innerHTML="🌧️";
}
else if(condition==="Thunderstorm"){
document.getElementById("weatherIcon").innerHTML="⛈️";
}
else{
document.getElementById("weatherIcon").innerHTML="🌤️";
}

let insight="";

if(data.main.temp>35){
insight="🔥 Extreme heat detected. Stay hydrated and avoid direct sunlight.";
}
else if(data.main.temp>25){
insight="☀️ Pleasant weather. Good conditions for outdoor activities.";
}
else if(data.main.temp>15){
insight="🌤 Mild temperature. Comfortable for travel and work.";
}
else{
insight="🧥 Cool weather. Consider carrying a jacket.";
}

document.getElementById("insight").innerText=insight;

}
catch(error){
alert("City not found");
}

}
