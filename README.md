# 🌦️ Ikirere – Weather CLI

**Ikirere** is a command-line weather application built with Node.js. It allows users to check current weather conditions for different cities directly from the terminal.

The name *Ikirere* means *weather* in Kinyarwanda.

## Features

- Search for a city and retrieve its current weather.
- Display temperature, feels-like temperature, humidity, and wind speed.
- Handle invalid city names and network errors.
- Save frequently searched cities as favourites.
- View saved favourite cities.
- Store search history in JSON files.
- Display computer system information.
- Configure request timeouts using environment variables.

## Technologies Used

- Node.js
- JavaScript (ES Modules)
- Open-Meteo Geocoding API
- Open-Meteo Weather API
- JSON for local data storage
- Node.js built-in modules (`process`, `util`, `fs/promises`, `path`, and `os`)

## Project Structure

```text
ikirere/
├── src/
│   ├── index.js
│   ├── cli.js
│   ├── weather.js
│   ├── geocoding.js
│   ├── storage.js
│   ├── config.js
│   └── utils.js
├── data/
│   ├── favourites.json
│   ├── history.json
│   └── settings.json
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## Installation

### Requirements

- Node.js (version 20.12 or later recommended)
- npm
- Internet connection

### Steps

1. Clone the repository:

```bash
git clone https://github.com/seberaisimbiangethressy-creator/Node.js-CLI-Weather-Fetcher.git
```

2. Enter the project directory:

```bash
cd ikirere
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file in the project root:

```env
IKIRERE_TIMEOUT_MS=10000
```

5. Link the package:

```bash
npm link
```

## Usage

### Check the weather

```bash
ikirere Kigali
```

### Search using the city option

```bash
ikirere --city Kigali
```

### Save a city as a favourite

```bash
ikirere Kigali --favorite
```

### Display favourite cities

```bash
ikirere --favorites
```

### Display computer system information

```bash
ikirere --system
```

### Display help

```bash
ikirere --help
```

### Display version

```bash
ikirere --version
```

## Example Output

```text
========== IKIRERE WEATHER ==========
City: Kigali
Country: Rwanda

---------- CURRENT WEATHER ----------
Temperature: 24.3 °C
Feels like: 24.9 °C
Humidity: 57%
Wind speed: 7.5 km/h
Weather code: 1
Last updated: 2026-11-06T14:45
=====================================
```

*Weather values change depending on the city and time of the request.*

## APIs Used

Ikirere uses the free Open-Meteo APIs:

- [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api) – Finds the geographic coordinates of a city.
- [Open-Meteo Weather API](https://open-meteo.com/en/docs) – Retrieves current weather information.

## Data Storage

The application uses local JSON files to store information:

- `favourites.json` – Stores favourite cities.
- `history.json` – Stores previous city searches.
- `settings.json` – Initializes the application's settings storage.

## Author

**Thressy**

Built as a Node.js CLI development project.

## License

This project is licensed under the MIT License.