// Load environment variables from .env
try {
    process.loadEnvFile();
} catch (error) {
    if (error.code !== 'ENOENT') {
        throw error;
    }
}

// Get timeout from environment variables
const timeout = Number(process.env.IKIRERE_TIMEOUT_MS || 10000);

// Validate timeout
if (!Number.isFinite(timeout) || timeout <= 0) {
    throw new Error('IKIRERE_TIMEOUT_MS must be a positive number.');
}

export const REQUEST_TIMEOUT = timeout;