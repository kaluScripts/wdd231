const apiKey = "f5848c951a9f225ccc3e9baeb8c9ea26";
const lat = 6.4584;   // Enugu, Nigeria
const lon = 7.5464;

const currentTemp = document.querySelector("#current-temp");
const currentDesc = document.querySelector("#current-desc");
const forecastList = document.querySelector("#forecast");

const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function getWeather() {
  try {
    const [currentResponse, forecastResponse] = await Promise.all([
      fetch(currentUrl),
      fetch(forecastUrl),
    ]);

    if (!currentResponse.ok || !forecastResponse.ok) {
      throw new Error(`Weather request failed: ${currentResponse.status} / ${forecastResponse.status}`);
    }

    const current = await currentResponse.json();
    const forecast = await forecastResponse.json();

    displayCurrent(current);
    displayForecast(forecast);
  } catch (error) {
    console.error("Could not load weather:", error);
    currentTemp.textContent = "--";
    currentDesc.textContent = "Weather is not available right now.";
  }
}

function displayCurrent(data) {
  currentTemp.textContent = Math.round(data.main.temp);
  currentDesc.textContent = data.weather[0].description;
}

function displayForecast(data) {
  const offset = data.city.timezone; // seconds from UTC for Enugu

  // group the 3-hour entries by local calendar day
  const days = {};
  data.list.forEach((entry) => {
    const localDay = new Date((entry.dt + offset) * 1000).toISOString().slice(0, 10);
    if (!days[localDay]) days[localDay] = [];
    days[localDay].push(entry.main.temp);
  });

  // today is already shown as the current weather, so list the next three days
  const todayKey = new Date((Date.now() / 1000 + offset) * 1000).toISOString().slice(0, 10);
  const nextDays = Object.keys(days).filter((key) => key > todayKey).slice(0, 3);

  forecastList.innerHTML = "";
  nextDays.forEach((key) => {
    const temps = days[key];
    const label = new Date(`${key}T12:00:00Z`).toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
      timeZone: "UTC",
    });

    const item = document.createElement("li");
    item.innerHTML = `
      <span class="day">${label}</span>
      <span class="temp">${Math.round(Math.max(...temps))}&deg;C</span>
      <span class="low">Low ${Math.round(Math.min(...temps))}&deg;C</span>
    `;
    forecastList.appendChild(item);
  });
}

getWeather();