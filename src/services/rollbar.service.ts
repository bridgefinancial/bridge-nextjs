import Rollbar from 'rollbar';

// Rollbar configuration
const rollbarConfig = {
  accessToken: '26a9695b30054699ae5a8df321ffba09',
  environment: process.env.NODE_ENV || 'development', // Node environment
  captureUncaught: true, // Capture uncaught errors
  captureUnhandledRejections: true, // Capture unhandled promise rejections

  // Custom metadata (example)
  metadata: {
    appName: 'bridge-financial', // App-specific name
    deployTime: new Date().toISOString(), // Timestamp for when the app is deployed
  },

  // Configure additional Rollbar settings
  autoInstrument: {
    log: true, // Capture console.log messages
    network: true, // Capture XHR/fetch requests
    dom: true, // Capture DOM exceptions
  },
};

// Initialize Rollbar with the configuration
const rollbar = new Rollbar(rollbarConfig);

export default rollbar;
