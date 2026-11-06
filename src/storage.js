import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Find the project's data folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDirectory = path.resolve(__dirname, '../data');

// Define the JSON file locations
const favouritesFile = path.join(dataDirectory, 'favourites.json');
const historyFile = path.join(dataDirectory, 'history.json');
const settingsFile = path.join(dataDirectory, 'settings.json');

// Read information from a JSON file
async function readJson(file, defaultValue) {
    try {
        const content = await readFile(file, 'utf8');
        return JSON.parse(content);
    } catch (error) {
        if (error.code === 'ENOENT') {
            return defaultValue;
        }

        throw error;
    }
}

// Save information into a JSON file
async function writeJson(file, data) {
    await writeFile(file, JSON.stringify(data, null, 2), 'utf8');
}

// Create the data folder and initialize missing files
export async function initializeStorage() {
    await mkdir(dataDirectory, { recursive: true });

    const favourites = await readJson(favouritesFile, []);
    const history = await readJson(historyFile, []);
    const settings = await readJson(settingsFile, {});

    await writeJson(favouritesFile, favourites);
    await writeJson(historyFile, history);
    await writeJson(settingsFile, settings);
}

// Save a city search to history
export async function saveSearch(location) {
    const history = await readJson(historyFile, []);

    history.unshift({
        city: location.name,
        country: location.country,
        searchedAt: new Date().toISOString()
    });

    await writeJson(historyFile, history);
}

// Add a city to favourites
export async function addFavorite(location) {
    const favourites = await readJson(favouritesFile, []);

    const alreadySaved = favourites.some(
        city => city.name.toLowerCase() === location.name.toLowerCase()
        && city.country === location.country
    );

    if (alreadySaved) {
        return false;
    }

    favourites.push({
        name: location.name,
        country: location.country,
        latitude: location.latitude,
        longitude: location.longitude
    });

    await writeJson(favouritesFile, favourites);

    return true;
}

// Get all favourite cities
export async function getFavorites() {
    return await readJson(favouritesFile, []);
}