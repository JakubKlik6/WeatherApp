const input = document.querySelector('input');
const button = document.querySelector('button');
const errorMsg = document.querySelector('.error');
const date = document.querySelector('.date');
const city_name = document.querySelector('.city_name');
const img = document.querySelector('img');
const temperature = document.querySelector('.temperature');
const temperatureDesc = document.querySelector('.temperature_description');
const cityTemperature = document.querySelector('city_temperature');
const humidity = document.querySelector('.humidity');
const pressure = document.querySelector('.pressure');
const wind = document.querySelector('.wind');
const clouds = document.querySelector('.clouds');

const apilink = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&appid=78213c7443308983c01aee0059000ed9';
const apiUnits = '&units=metric';
const apiLang = '&lang=pl';

function getWeather()
{
    const apiCity = input.value;
    const URL = apilink + apiCity + apiKey + apiUnits + apiLang;

    axios.get(URL).then(response => {
            console.log(response.data);

            img.src = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`;
            city_name.textContent = `${response.data.name}, ${response.data.sys.country}`;
            temperature.textContent = `${Math.round(response.data.main.temp)}°C`;
            temperatureDesc.textContent = `${response.data.weather[0].temperatureDesc}`;
            temperatureDesc.classList.add('orange');
            cityTemperature.textContent = `${Math.round(response.data.main.feels_like)}°C`;
            humidity.textContent = `${response.data.main.humidity} %`;
            pressure.textContent = `${response.data.pressure} hPa`;
            windSpeed.textContent = `${Math.round(response.data.wind.speed) * 3.6} km/s`;
            clouds.textContent = `${response.data.clouds.all} %`;
            errorMsg.textContent = ``;
        }
        ).catch(error =>
            {
                console.log(error);

                if(error.response.data.cod != '200')
                {
                    errorMsg.textContent = `${error.response.data.message}`;
                }

                [clouds,windSpeed,pressuer,humidity,feelsLike,temperatureDesc,temperature,cityName].forEach(e1 =>
                    {
                        e1.textContent = ``;
                    })
                    img.src = '';
                    temperatureDesc.classList.remove('orange');
            }
            ).finally(() =>
            {
                input.value = '';
            }
            )

}

button.addEventListener('click',getWeather);