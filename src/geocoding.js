import { REQUEST_TIMEOUT } from './config.js';

// Search for a city and return its geographic coordinates
export async function getCoordinates(city) {

    // Build the API URL
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en`;

    // Send a request to Open-Meteo
    let response;

    try {
        response = await fetch(url, {
            signal: AbortSignal.timeout(REQUEST_TIMEOUT)
        });
    } catch (error) {
        if (error.name === 'TimeoutError') {
            throw new Error('The location service took too long to respond.');
        }

        throw new Error('Network error. Please check your internet connection.');
    }

    // Check if the request was successful
    if (!response.ok) {
        throw new Error('Unable to connect to the location service.');
    }

    // Convert the response into JSON
    const data = await response.json();

    // Check whether the city was found
    if (!data.results || data.results.length === 0) {
        throw new Error(`City "${city}" was not found.`);
    }

    // Get the first matching location
    const location = data.results[0];

    // Return the location information
    return {
        name: location.name,
        country: location.country,
        latitude: location.latitude,
        longitude: location.longitude
    };
}