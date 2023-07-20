// https://get.geojs.io/v1/ip/geo.json

const cityElement = document.getElementById("city");
const temperatureElement = document.getElementById("temperature");
const windElement = document.getElementById("windSpeed");
const descriptionElement = document.getElementById("description");


async function loadWeather() {
    fetch('https://get.geojs.io/v1/ip/geo.json')
      .then(response => response.json()) 
      .then(data => {
        const latitude = data.latitude;
        const longitude = data.longitude;
        const city = data.city;
  
        console.log('Широта:', latitude);
        console.log('Долгота:', longitude);
        console.log('Город:', city);
  
        const weatherAPI = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
  
        fetch(weatherAPI)
          .then(response => response.json()) 
          .then(weatherData => {
            const temperature = weatherData.current_weather.temperature;
            const windSpeed = weatherData.current_weather.windspeed;
            const weatherCode = weatherData.current_weather.weathercode;
  
            cityElement.textContent += city;
      temperatureElement.textContent += temperature;
      windElement.textContent += windSpeed;
      descriptionElement.textContent += interpretWeatherCode(weatherCode);
      
            console.log('Температура воздуха:', temperature + '°C');
            console.log('Скорость ветра:', windSpeed + ' м/с');
            console.log('Код погоды:', weatherCode);
            console.log('Описание погоды:', interpretWeatherCode(weatherCode));
          })
          .catch(error => {
            console.error('Произошла ошибка при запросе погоды:', error);
          });
      })
      .catch(error => {
        console.error('Произошла ошибка при запросе геолокации:', error);
      });
      
  }
  
  // Function to interpret the weather code
  function interpretWeatherCode(code) {
    switch (code) {
    case 0:
        return "clear sky";
    case 1:
        return "Mainly clear";
    case 2:
        return "partly cloudy ";
    case 3:
        return "overcast ";
    case 45:
        return "Fog ";
    case 48:
        return "depositing rime fog ";
    case 51:
        return "Drizzle: Light ";
    case 53:
        return "Drizzle: moderate ";
    case 55:
        return "Drizzle: dense intensity ";
    case 56:
        return "Freezing Drizzle: Light ";
    case 57:
        return "Freezing Drizzle: dense intensity ";
    case 61:
        return "Rain: Slight ";
    case 63:
        return "Rain: moderate ";
    case 65:
        return "Rain: heavy intensity ";
    case 66:
        return "Freezing Rain: Light ";
    case 67:
        return "Freezing Rain: heavy intensity ";
    case 71:
        return "Snow fall: Slight";
    case 73:
        return "Snow fall: moderate";
    case 75:
        return "Snow fall: heavy intensity ";
    case 77:
        return "Snow grains ";
    case 80:
        return "Rain showers: Slight";
    case 81:
        return "Rain showers: moderate";
    case 82:
        return "Rain showers: violent ";
    case 85:
        return "Snow showers slight ";
    case 86:
        return "Snow showers heavy ";
    case 95:
        return "Thunderstorm: Slight or moderate ";
    case 96:
        return "Thunderstorm with slight";
    case 99:
        return "Thunderstorm with heavy hail ";
      
      // Add more cases for other weather codes if needed
      default:
        return "Unknown"; // If the weather code is not recognized
    }
  }
  
  loadWeather();

  