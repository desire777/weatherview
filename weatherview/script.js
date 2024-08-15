const apiKey = 'xx'; // Chave API

function getWeather() {
    const city = document.getElementById('cityInput').value;
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=pt_br&appid=${apiKey}`;
    const spinner = document.getElementById('loadingSpinner');
    const weatherContainer = document.getElementById('weatherContainer');

    spinner.style.display = 'block';
    weatherContainer.innerHTML = '';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            weatherContainer.innerHTML = ''

            let today = new Date().getDay();
            const daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

            for (let i = 0; i < 7; i++) {
                const dayData = data.list[i * 8];
                const date = new Date(dayData.dt_txt);
                const dayOfWeek = daysOfWeek[date.getDay()];

                const weatherCard = document.createElement('div');
                weatherCard.classList.add('weather-card');

                if (date.getDay() === today) {
                    weatherCard.classList.add('current-day');
                }
                const iconMapping = {
                    '01d': 'clear-day.png',
                    '01n': 'clear-night.png',
                    '02d': 'cloudy.png',
                    '02n': 'cloudy.png',
                    '03d': 'cloudy.png',
                    '03n': 'cloudy.png',
                    '04d': 'cloudy.png',
                    '04n': 'cloudy.png',
                    '09d': 'rain.png',
                    '09n': 'rain.png',
                    '10d': 'rain.png',
                    '10n': 'rain.png',
                    '11d': 'thunderstorm.png',
                    '11n': 'thunderstorm.png',
                    '13d': 'snow.png',
                    '13n': 'snow.png',
                    '50d': 'mist.png',
                    '50n': 'mist.png'
                };

                const iconCode = dayData.weather[0].icon;
                const customIconUrl = `./icons/${iconMapping[iconCode]}`;

                weatherCard.innerHTML = `
                    <h3>${dayOfWeek}</h3>
                    <img src="${customIconUrl}" alt="Ícone do Clima" class="weather-icon">
                    <div class="weather-info">
                        <i class="fas fa-thermometer-half"></i>
                        <p>Temperatura: ${Math.round(dayData.main.temp)}°C</p>
                    </div>
                    <div class="weather-info">
                        <i class="fas fa-temperature-high"></i>
                        <p>Sensação Térmica: ${Math.round(dayData.main.feels_like)}°C</p>
                    </div>
                    <div class="weather-info">
                        <i class="fas fa-tint"></i>
                        <p>Umidade: ${dayData.main.humidity}%</p>
                    </div>
                    <h5>${dayData.weather[0].description}</h5>
                `;

                weatherContainer.appendChild(weatherCard);
                today = (today + 1) % 7;
            }
        })
        .catch(error => {
            console.error('Erro ao buscar dados da API:', error);
        })
        .finally(() => {
            spinner.style.display = 'none';
        });
}
