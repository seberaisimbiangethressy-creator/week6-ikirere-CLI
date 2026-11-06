import { parseArgs } from 'node:util';

// Define the command-line options
export function parseCliArgs() {
    const { values, positionals } = parseArgs({
        options: {
            city: {
                type: 'string',
                short: 'c'
            },
            help: {
                type: 'boolean',
                short: 'h'
            },
            version: {
                type: 'boolean',
                short: 'v'
            },

            // New options for favourites
            favorite: {
                type: 'boolean',
                short: 'f'
            },
            favorites: {
                type: 'boolean'
            },
            system: {
              type: 'boolean'
            }
        },
        allowPositionals: true,
        strict: true
    });

    // Get the city from either --city or a positional argument
    const city = values.city || positionals.join(' ');

    return {
        city,
        help: values.help,
        version: values.version,
        favorite: values.favorite,
        system: values.system,
        favorites: values.favorites
    };
}