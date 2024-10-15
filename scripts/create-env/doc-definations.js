/**
 * Configuration object for the local environment.
 * 
 * @typedef {Object} AppConfig
 * @property {string} environment - The environment name, which can be 'browser', 'local', 'production', 'development', or 'staging'
 * @property {BaseUrlConfig} baseUrls - An object containing base URLs for the environment.
 * @property {ApiKeyConfig} apiKeys - An object containing various API keys used in the environment.
 */

/**
 * Base URL configuration object.
 * 
 * @typedef {Object} BaseUrlConfig
 * @property {UrlDetails} api - The configuration object for the API base URL.
 * @property {UrlDetails} web - The configuration object for the web app base URL.
 */

/**
 * URL details configuration object.
 * 
 * @typedef {Object} UrlDetails
 * @property {string} protocol - The protocol used for the URL (e.g., 'http', 'https').
 * @property {string} domain - The domain name or IP address.
 * @property {number} port - The port number used for the URL.
 * @property {string} full - The combined full URL string (e.g., 'http://localhost:8000').
 */

/**
 * API key configuration object.
 * 
 * @typedef {Object} ApiKeyConfig
 * @property {string} [key1] - Optional API key 1.
 * @property {string} [key2] - Optional API key 2.
 */

/**
 * Local environment configuration.
 * @type {AppConfig}
 */
const localEnv = {
  environment: "local",
  baseUrls: {
    api: {
      protocol: "http",
      domain: "localhost",
      port: 8000,
      full: "http://localhost:8000"
    },
    web: {
      protocol: "http",
      domain: "localhost",
      port: 3000,
      full: "http://localhost:3000"
    }
  },
  apiKeys: {
  }
};
