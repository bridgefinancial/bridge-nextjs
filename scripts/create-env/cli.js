#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const getEnvConfigs = require('./configs/get-envs');

// Function to get the local IP address for on-device testing
function getLocalIPAddress() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost'; // fallback if no IP found
}

// Get the environment argument from the command line, default to 'browser' if not provided
const environment = process.argv[2] || 'browser';

// Helper function to combine protocol, domain, and port into a full URL string
function createFullUrl(protocol, domain, port) {
  return `${protocol}://${domain}:${port}`;
}

// Create the environment configuration files (JSON and module.exports JS file)
function createEnvConfig(environment) {
  const envConfig = getEnvConfigs()[environment];
  if (!envConfig) {
    console.error(`Invalid environment: ${environment}`);
    process.exit(1);
  }

  // Get local IP address only if environment is 'local' or 'development'
  if (environment === 'local' || environment === 'development') {
    const localIP = getLocalIPAddress();

    // Update baseUrls with local IP address
    if (envConfig.baseUrls) {
      envConfig.baseUrls.api = {
        protocol: 'http',
        domain: localIP,
        port: 8000,
        full: createFullUrl('http', localIP, 8000),
      };
      envConfig.baseUrls.web = {
        protocol: 'http',
        domain: localIP,
        port: 3000,
        full: createFullUrl('http', localIP, 3000),
      };
    }
  } else if (environment === 'browser') {
    // For 'browser', use localhost baseUrls
    envConfig.baseUrls.api = {
      protocol: 'http',
      domain: 'localhost',
      port: 8000,
      full: createFullUrl('http', 'localhost', 8000),
    };
    envConfig.baseUrls.web = {
      protocol: 'http',
      domain: 'localhost',
      port: 3000,
      full: createFullUrl('http', 'localhost', 3000),
    };
  }

  // Ensure the directory exists for writing environment variables
  const envVariablesDir = path.join(__dirname, '../../src/utils/env-variables');
  if (!fs.existsSync(envVariablesDir)) {
    fs.mkdirSync(envVariablesDir, { recursive: true });
  }

  // Write to the JSON environment configuration file
  const jsonFilePath = path.join(envVariablesDir, 'env-variables.json');
  const jsonContent = JSON.stringify(envConfig, null, 2);
  fs.writeFileSync(jsonFilePath, jsonContent, 'utf8');

  // Write to the JS file to export the environment variables
  const jsFilePath = path.join(envVariablesDir, 'index.js');
  const jsContent = `
    // Auto-generated file to export environment variables
    const envVariables = require('./env-variables.json');

    module.exports = {
      environment: envVariables.environment,
      baseUrls: envVariables.baseUrls,
      apiKeys: envVariables.apiKeys
    };
  `;
  fs.writeFileSync(jsFilePath, jsContent, 'utf8');

  console.log(`${environment} environment configuration has been generated and written to both JSON and JS export files.`);
}

createEnvConfig(environment);
