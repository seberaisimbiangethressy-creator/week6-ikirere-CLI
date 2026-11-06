import { REQUEST_TIMEOUT } from './config.js';
// Get current weather using geographic coordinates
export async function getWeather(latitude, longitude) {

    // Build the weather API URL
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=auto`;

    // Send a request to the weather API
    let response;

try {
    response = await fetch(url, {
       signal: AbortSignal.timeout(REQUEST_TIMEOUT)
    });
} catch (error) {
    if (error.name === 'TimeoutError') {
        throw new Error('The weather service took too long to respond.');
    }

    throw new Error('Network error. Please check your internet connection.');
}

    // Check if the request was successful
    if (!response.ok) {
        throw new Error('Unable to retrieve weather information.');
    }

    // Convert the response into JSON
    const data = await response.json();

    // Check if current weather data exists
    if (!data.current) {
        throw new Error('Current weather information is unavailable.');
    }

    // Return the weather information
    return {
        temperature: data.current.temperature_2m,
        humidity: data.current.relative_humidity_2m,
        feelsLike: data.current.apparent_temperature,
        weatherCode: data.current.weather_code,
        windSpeed: data.current.wind_speed_10m,
        time: data.current.time
    };
}