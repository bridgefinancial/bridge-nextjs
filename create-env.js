const { spawn } = require('child_process');
const path = require('path');

// Get the environment from command arguments, default to 'local' if no argument is passed
const environment = process.argv[2] || 'local';

// Define valid environments including 'browser'
const validEnvironments = ['local', 'development', 'staging', 'production', 'browser'];
if (!validEnvironments.includes(environment)) {
  console.error(`Invalid environment: ${environment}`);
  console.error(`Please specify one of: ${validEnvironments.join(', ')}`);
  process.exit(1);
}

// Path to the env-variables.json file
const envPath = path.join(__dirname, 'src/utils/env-variables/env-variables.json');

// Function to start the environment setup (adjusted path to use the correct script)
const cliScriptPath = path.join(__dirname, 'scripts/create-env/cli.js');
const createEnv = spawn(process.execPath, [cliScriptPath, environment], { stdio: 'inherit' });

createEnv.on('error', (err) => {
  console.error('Error running create-env script:', err);
  process.exit(1);
});

createEnv.on('close', (code) => {
  if (code === 0) {
    console.log('Environment variables set up successfully.');

    // Dynamically import the env-variables.json after creation
    const { baseUrls } = require(envPath);

    startNextServer(baseUrls.web); // Use baseUrls to start the server
  } else {
    console.error('Failed to set environment variables.');
    process.exit(1);
  }
});

// Function to start the Next.js development server using the baseUrls.web configuration
function startNextServer({ domain, port }) {
  console.log(`Starting Next.js on ${domain}:${port}`);
  const nextDev = spawn('npx', ['next', 'dev', '-H', domain, '-p', port], { stdio: 'inherit' });

  nextDev.on('error', (err) => {
    console.error(`Next.js failed to start: ${err.message}`);
  });

  nextDev.on('close', (code) => {
    console.log(`Next.js exited with code ${code}`);
  });
}
