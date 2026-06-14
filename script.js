const apiKey = "ac31cbb80c3db428544a66fd775265c1";

function quickSearch(city){
    document.getElementById("cityInput").value = city;
    getWeather();
}

function formatTime(timestamp){
    const date = new Date(timestamp * 1000);

    return date.toLocaleTimeString([],{
        hour:"2-digit",
        minute:"2-digit"
    });
}

function showLoader(show){
    const loader = document.getElementById("loader");

    if(show){
        loader.classList.remove("hidden");
    }else{
        loader.classList.add("hidden");
    }
}

async function getWeather(){

    const city =
    document.getElementById("cityInput").value.trim();

    if(city === ""){
        alert("Please enter a city name");
        return;
    }

    showLoader(true);

    try{

        const weatherURL =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const response =
        await fetch(weatherURL);

        const data =
        await response.json();

        if(data.cod != 200){
            throw new Error();
        }

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

        document.getElementById("feelsLike").innerText =
        Math.round(data.main.feels_like) + "°C";

        document.getElementById("visibility").innerText =
        (data.visibility / 1000).toFixed(1) + " km";

        document.getElementById("sunrise").innerText =
        formatTime(data.sys.sunrise);

        document.getElementById("sunset").innerText =
        formatTime(data.sys.sunset);

        const condition =
        data.weather[0].main;

        const weatherIcon =
        document.getElementById("weatherIcon");

        if(condition === "Clear"){
            weatherIcon.innerHTML = "☀️";
            document.body.style.background =
            "linear-gradient(135deg,#f59e0b,#f97316,#fb7185)";
        }
        else if(condition === "Clouds"){
            weatherIcon.innerHTML = "☁️";
            document.body.style.background =
            "linear-gradient(135deg,#64748b,#475569,#334155)";
        }
        else if(condition === "Rain"){
            weatherIcon.innerHTML = "🌧️";
            document.body.style.background =
            "linear-gradient(135deg,#0f172a,#1d4ed8,#0ea5e9)";
        }
        else if(condition === "Thunderstorm"){
            weatherIcon.innerHTML = "⛈️";
            document.body.style.background =
            "linear-gradient(135deg,#111827,#312e81,#4c1d95)";
        }
        else if(condition === "Snow"){
            weatherIcon.innerHTML = "❄️";
            document.body.style.background =
            "linear-gradient(135deg,#cbd5e1,#94a3b8,#64748b)";
        }
        else{
            weatherIcon.innerHTML = "🌤️";
        }

        let insight = "";

        if(data.main.temp > 38){
            insight =
            "🔥 Extreme heat detected. Stay hydrated and avoid prolonged sun exposure.";
        }
        else if(data.main.temp > 30){
            insight =
            "☀️ Warm and pleasant weather. Ideal for outdoor activities.";
        }
        else if(data.main.temp > 20){
            insight =
            "🌤 Comfortable weather conditions with balanced temperature.";
        }
        else if(data.main.temp > 10){
            insight =
            "🧥 Slightly cool weather. A light jacket may be useful.";
        }
        else{
            insight =
            "❄️ Cold weather conditions. Dress warmly before going out.";
        }

        document.getElementById("insight").innerText =
        insight;

        await getForecast(city);

    }
    catch(error){

        alert("City not found or API unavailable.");

    }
    finally{

        showLoader(false);

    }

}

async function getForecast(city){

    const forecastURL =
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    const response =
    await fetch(forecastURL);

    const data =
    await response.json();

    const container =
    document.getElementById("forecastContainer");

    container.innerHTML = "";

    const dailyForecast =
    data.list.filter(item =>
        item.dt_txt.includes("12:00:00")
    );

    dailyForecast.forEach(day => {

        const date =
        new Date(day.dt_txt);

        let icon = "☀️";

        const weather =
        day.weather[0].main;

        if(weather === "Clouds") icon = "☁️";
        if(weather === "Rain") icon = "🌧️";
        if(weather === "Thunderstorm") icon = "⛈️";
        if(weather === "Snow") icon = "❄️";

        const card = `
        <div class="forecast-card">

            <h3>
            ${date.toLocaleDateString(
                "en-US",
                {weekday:"short"}
            )}
            </h3>

            <div class="icon">
                ${icon}
            </div>

            <p>
            ${Math.round(day.main.temp)}°C
            </p>

            <p>
            ${weather}
            </p>

        </div>
        `;

        container.innerHTML += card;

    });

}

quickSearch("Chennai");
