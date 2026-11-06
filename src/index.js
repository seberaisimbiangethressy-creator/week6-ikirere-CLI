#!/usr/bin/env node
import { parseCliArgs } from './cli.js';
import { getCoordinates } from './geocoding.js';
import { getWeather } from './weather.js';
import { getSystemInfo } from './utils.js';

import {
    initializeStorage,
    saveSearch,
    addFavorite,
    getFavorites
} from './storage.js';

const args = parseCliArgs();

// Initialize JSON storage
await initializeStorage();

// Display help instructions
if (args.help) {
    console.log(`
IKIRERE WEATHER CLI

Usage:
  node src/index.js <city>
  node src/index.js --city <city>

Options:
  -c, --city        Specify a city
  -h, --help        Display help
  -v, --version     Display version
  -f, --favorite    Save the searched city as a favourite
      --favorites   Display saved favourite cities
      --system      Display computer system information

Examples:
  node src/index.js Kigali
  node src/index.js --city Kigali
  node src/index.js Kigali --favorite
  node src/index.js --favorites
  node src/index.js --system
    `);

    process.exit(0);
}

// Display version
if (args.version) {
    console.log('Ikirere version 1.0.0');
    process.exit(0);
}

// Display system information
if (args.system) {
    const info = getSystemInfo();

    console.log('\n========== SYSTEM INFORMATION ==========');
    console.log(`Operating System: ${info.operatingSystem}`);
    console.log(`OS Version: ${info.osVersion}`);
    console.log(`Architecture: ${info.architecture}`);
    console.log(`Total Memory: ${info.totalMemory} GB`);
    console.log(`Free Memory: ${info.freeMemory} GB`);
    console.log(`Node.js Version: ${info.nodeVersion}`);
    console.log('=========================================');

    process.exit(0);
}

// Display saved favourite cities
if (args.favorites) {
    const favourites = await getFavorites();

    console.log('\n========== FAVOURITE CITIES ==========');

    if (favourites.length === 0) {
        console.log('You have no favourite cities yet.');
    } else {
        favourites.forEach((city, index) => {
            console.log(`${index + 1}. ${city.name}, ${city.country}`);
        });
    }

    process.exit(0);
}

// Check whether a city was provided
if (!args.city) {
    console.log('Please provide a city name.');
    console.log('Example: node src/index.js Kigali');
    process.exitCode = 1;
} else {

    // Find the city's geographic coordinates
    try {
        const location = await getCoordinates(args.city);

        console.log('\n========== IKIRERE WEATHER ==========');
        console.log(`City: ${location.name}`);
        console.log(`Country: ${location.country}`);

        // Get weather using the city's coordinates
        const weather = await getWeather(
            location.latitude,
            location.longitude
        );

        // Save the city in search history
        await saveSearch(location);

        // Save the city as a favourite if requested
        if (args.favorite) {
            const saved = await addFavorite(location);

            if (saved) {
                console.log('\nCity added to your favourites!');
            } else {
                console.log('\nThis city is already in your favourites.');
            }
        }

        // Display current weather
        console.log('\n---------- CURRENT WEATHER ----------');
        console.log(`Temperature: ${weather.temperature} °C`);
        console.log(`Feels like: ${weather.feelsLike} °C`);
        console.log(`Humidity: ${weather.humidity}%`);
        console.log(`Wind speed: ${weather.windSpeed} km/h`);
        console.log(`Weather code: ${weather.weatherCode}`);
        console.log(`Last updated: ${weather.time}`);
        console.log('=====================================');

    } catch (error) {
        console.error(`\nOops! ${error.message}`);
        console.error('Please try again.');
        process.exitCode = 1;
    }
}

