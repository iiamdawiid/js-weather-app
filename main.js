const apiKey = 'a997b40290aa8a829a10c80ac9f5b1ec';

const getWeather = async (e) => {
    e.preventDefault();
    const location = document.getElementById('location').value;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=imperial`;
    const response = await fetch(apiUrl);
    const error = document.querySelector('.error');
    if (response.ok) {
        error.style.display = 'none';
        const data = await response.json();
        displayWeather(data);
    } else {
        error.style.display = 'block';
    }
}

const displayWeather = (data) => {
    const error = document.querySelector('.no-data')

    if (data) {
        error.style.display = 'none';
        const temp = data.main.temp;
        const city = data.name;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const minTemp = data.main.temp_min;
        const maxTemp = data.main.temp_max;

        document.querySelector('.temp').textContent = `${parseInt(temp)} °F`;
        document.querySelector('.min_temp').textContent = `${parseInt(minTemp)} °F`;
        document.querySelector('.max_temp').textContent = `${parseInt(maxTemp)} °F`;
        document.querySelector('.city').textContent = `${city}`;
        document.querySelector('.humidity').textContent = `${humidity}%`;
        document.querySelector('.wind').textContent = `${windSpeed} mph`;

        const weatherIcon = document.querySelector('.weather-icon');

        if (data.weather[0].main == 'Clouds') {
            weatherIcon.src = './images/clouds.png';
        } else if (data.weather[0].main == 'Clear') {
            weatherIcon.src = './images/clear.png';
        } else if (data.weather[0].main == 'Rain') {
            weatherIcon.src = './images/rain.png';
        } else if (data.weather[0].main == 'Drizzle') {
            weatherIcon.src = './images/drizzle.png';
        } else if (data.weather[0].main == 'Mist') {
            weatherIcon.src = './images/mist.png';
        } else {
            weatherIcon.src = './images/snow.png';
        }

        const tempColor = document.querySelector('.main-div');
        
        // add more 
        if (data.main.temp > 60) {
            tempColor.style.background = 'linear-gradient(to bottom right, red, yellow';
        } else {
            tempColor.style.background = 'linear-gradient(to bottom right, blue, rgb(170, 170, 243))';
        }

        document.querySelector('.weather').style.display = 'block';

    } else {
        error.style.display = 'block';
    }
}