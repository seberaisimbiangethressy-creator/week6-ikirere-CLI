import os from 'node:os';

// Get information about the computer running Ikirere
export function getSystemInfo() {
    return {
        operatingSystem: os.platform(),
        osVersion: os.release(),
        architecture: os.arch(),
        totalMemory: (os.totalmem() / 1024 ** 3).toFixed(2),
        freeMemory: (os.freemem() / 1024 ** 3).toFixed(2),
        nodeVersion: process.version
    };
}