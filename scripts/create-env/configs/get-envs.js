const merge = require('lodash.merge'); // Assuming you're using lodash.merge to merge configs

const localConfig = require('./local.json');
const developmentConfig = require('./development.json');
const productionConfig = require('./production.json');
const stagingConfig = require('./staging.json');

/**
 * Loads environment-specific configurations from JSON files and returns them.
 * Optionally overrides specific fields based on the provided options.
 * 
 * @param {Object} [overrideOptions] - Optional overrides for each environment configuration.
 * @returns {{
 *   local: Object,
 *   development: Object,
 *   production: Object,
 *   staging: Object
 *   browser: Object

 * }} An object containing AppConfigs for different environments.
 */
function getEnvConfigs(overrideOptions = {}) {
  const environments = {
    local: merge(localConfig, overrideOptions.local || {}),
    development: merge(developmentConfig, overrideOptions.development || {}),
    production: merge(productionConfig, overrideOptions.production || {}),
    staging: merge(stagingConfig, overrideOptions.staging || {}),
    browser: merge(localConfig, overrideOptions.local || {}),
  };

  return environments;
}

module.exports = getEnvConfigs;
