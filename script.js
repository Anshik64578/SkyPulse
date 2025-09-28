const apiKey = "8d2244f79d544820acf174630252809"; // WeatherAPI key
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city === "") {
        alert("Please enter a city name!");
        return;
    }
    fetchWeather(city);
});

async function fetchWeather(city) {
    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`
        );
        if (!response.ok) throw new Error("City not found");
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherResult.innerHTML = `<p style="color: #ff6961;">${error.message}</p>`;
    }
}

function displayWeather(data) {
    weatherResult.innerHTML = `
        <h2>${data.location.name}, ${data.location.country}</h2>
        <p><strong>Temperature:</strong> ${data.current.temp_c}°C / ${data.current.temp_f}°F</p>
        <p><strong>Condition:</strong> ${data.current.condition.text}</p>
        <p><img src="https:${data.current.condition.icon}" alt="icon"></p>
        <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
        <p><strong>Wind:</strong> ${data.current.wind_kph} kph</p>
        <p><strong>Air Quality (PM2.5):</strong> ${data.current.air_quality.pm2_5.toFixed(2)}</p>
    `;
}
