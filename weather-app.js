// Replace with your real OpenWeatherMap API Key
const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'; 

const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const weatherCard = document.getElementById('weather-card');
const errorMsg = document.getElementById('error-message');
const themeToggle = document.getElementById('theme-toggle');

// Elements to update
const cityName = document.getElementById('city-name');
const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const weatherDesc = document.getElementById('weather-desc');
const humidityVal = document.getElementById('humidity-val');
const windVal = document.getElementById('wind-val');

// Search Form Handler
searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (!city) return;

    try {
        errorMsg.classList.add('hidden');
        const data = await fetchWeatherData(city);
        displayWeather(data);
    } catch (err) {
        showError(err.message);
    }
});

// Fetch Data Implementation
async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
    
    const response = await fetch(url);
    if (!response.ok) {
        if (response.status === 404) {
            throw new Error('City not found. Try a different location.');
        }
        throw new Error('Something went wrong fetching data.');
    }
    return await response.json();
}

// Display Data Implementation
function displayWeather(data) {
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = Math.round(data.main.temp);
    weatherDesc.textContent = data.weather[0].description;
    humidityVal.textContent = `${data.main.humidity}%`;
    windVal.textContent = `${data.wind.speed} m/s`;
    
    // Official OpenWeatherMap icon matching
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.alt = data.weather[0].description;

    weatherCard.classList.remove('hidden');
}

function showError(message) {
    weatherCard.classList.add('hidden');
    errorMsg.textContent = message;
    errorMsg.classList.remove('hidden');
}

// Theme Toggle Functionality
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
});