const weatherDisplay = document.getElementById('weather-display');
const timeDisplay = document.getElementById('time-display');

async function getWeather() {
  try {
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=London,uk&callback=test&appid={API key}');

    const data = await response.json();
    const iconCode = data.weather[0].icon;
const description = data.weather[0].description;

weatherDisplay.innerHTML = `
  <div class="weather-info">
    <img src="" alt="${description}" />
    <span>${Math.round(data.main.temp)}°C - ${description}</span>
  </div>
`;

    
    weatherDisplay.innerHTML = `
      <div class="weather-info">
        <i class="fas fa-temperature-high"></i>
        <span>${Math.round(data.main.temp)}°C</span>
      </div>
    `;
  } catch (error) {
    console.error('Error fetching weather:', error);
    weatherDisplay.innerHTML = '<div class="weather-info"></div>';
  }
}


// Update time
function updateTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString();
  timeDisplay.textContent = timeString;
}

// Initialize weather and time
document.addEventListener('DOMContentLoaded', () => {
  getWeather();
  updateTime();
  
  // Update weather every 30 minutes
  setInterval(getWeather, 1800000);
  
  // Update time every second
  setInterval(updateTime, 1000);
});