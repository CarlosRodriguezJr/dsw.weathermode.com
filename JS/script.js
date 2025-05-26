const apiKey = '6320bad0e4dac8525938bffe4095e319';

async function getCurrentWeather() {
  const city = document.getElementById('cityInput').value.trim();
  if (!city) return alert('Por favor escribe una ciudad');

  document.getElementById('forecastResult').innerHTML = '';

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=es&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  const result = document.getElementById('weatherResult');
  result.innerHTML = `
    <div class="weather-card">
      <h2>${data.name}</h2>
      <p>${data.weather[0].description}</p>
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="icon">
      <p>🌡️ Temp: ${data.main.temp} °C</p>
      <p>💧 Humedad: ${data.main.humidity}%</p>
      <p>🌬️ Viento: ${data.wind.speed} m/s</p>
    </div>
  `;
}

async function getForecast() {
  const city = document.getElementById('cityInput').value.trim();
  if (!city) return alert('Por favor escribe una ciudad');

  document.getElementById('weatherResult').innerHTML = '';

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&lang=es&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  const forecastContainer = document.getElementById('forecastResult');
  forecastContainer.innerHTML = '<h3>Pronóstico 5 días</h3>';

  // Mostrar uno por día (cada 8 intervalos de 3h = 24h)
  for (let i = 0; i < data.list.length; i += 8) {
    const item = data.list[i];
    forecastContainer.innerHTML += `
      <div class="forecast-card">
        <h4>${item.dt_txt.split(' ')[0]}</h4>
        <p>${item.weather[0].description}</p>
        <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png" alt="icon">
        <p>🌡️ Temp: ${item.main.temp} °C</p>
        <p>💧 Humedad: ${item.main.humidity}%</p>
      </div>
    `;
  }
}
