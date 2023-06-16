function bool_check(core, prop, value) {
  if (['true', 'yes', 'false', 'no', ''].indexOf(value) === -1) {
    core.error('Invalid value passed for ' + prop + ', boolean expected');
    process.exit(1)
  }
  return ['true', 'yes'].indexOf(value) ? 'true' : 'false'
}


module.exports = {
  verifyCommand: function(core, command) {
    command = command.trim()
    let exit_status = 0;
    if (command == '') {
      core.error('command is required')
    } else if (['publish', 'sync', 'validate', 'run-schema', 'schema', 'source-systems'].indexOf(command) === -1) {
      core.error('command ' + command + ' not supported')
    }
    if (exit_status !== 0) {
      process.exit(1)
    }
  },
  /**
   * 
   * @param {object} core Github core
   * @param {string} manifestPath Path to manifest file
   * @param {string} version Semver version
   * @param {string} noVerify no verify
   * @param {string} onlyArtifact boolean string if to publish only artifact
   * @param {string} abortOnExists boolean string if to abort on exists
   * @returns 
   */
  publish: function(core, manifestPath, version, noVerify, onlyArtifact, abortOnExists) {
    let command = 'publish-extractor publish '
    if (version.trim() == '') {
      core.error("Version is required in semver format")
      process.exit(1)
    }
    command += '--version ' + version.trim() + ' '

    if (manifestPath.trim() == '') {
      core.error("Path to manifest file is required")
      process.exit(1)
    }
    command += '--manifest ' + manifestPath.trim() + ' '

    command += '--no-verify ' + bool_check(core, 'no-verify', noVerify.trim()) + ' '

    command += '--only-artifacts ' + bool_check(core, 'only-artifact', onlyArtifact.trim()) + ' '

    command += '--abort-on-exists ' + bool_check(core, 'abort-on-exists', abortOnExists.trim()) + ' '

    return command.trim()
  },
  /**
   * Sync function
   * @param {Object} core Github core
   * @param {string} manifestPath Manifest file
   * @param {string} noVerify No verify
   * @param {string} manifestDir Manifest directory
   * @returns {string}
   */
  sync: function(core, manifestPath, noVerify, manifestDir) {
    let command = 'publish-extractor sync '
    if (manifest.trim() !== '' && manifestDir.trim() !== '') {
      core.error('You can provide either manifest or manifest dir')
      process.exit(1)
    }
    if (manifestDir.trim() !== '') {
      command += '--manifest-dir ' + manifestDir.trim() + ' '
    }
    if (manifestPath.trim() !== '') {
      command += '--manifest ' + manifestPath.trim() + ' '
    }
    command += '--no-verify ' + bool_check(core, 'no-verify', noVerify.trim()) + ' '
    return command.trim()
  },
  /**
   * 
   * @param {Object} core 
   * @param {string} manifestPath 
   * @param {string} configFiles 
   * @param {string} wrongConfigFiles 
   * @returns {string}
   */
  validate: function(core, manifestPath, configFiles, wrongConfigFiles) {
    let command = 'publish-extractor validate '
    if (manifestPath.trim() == '') {
      core.error("Path to manifest file is required")
      process.exit(1)
    }
    command += '--manifest ' + manifestPath + ' '
    if (configFiles.trim() !== '') {
      command += '--config-files ' + configFiles.trim().split(',').join(' ') + ' '
    }
    if (wrongConfigFiles.trim() !== '') {
      command += '--config-files ' + wrongConfigFiles.trim().split(',').join(' ') + ' '
    }
    return command.trim()
  },
  /**
   * Generate schema
   * @param {Object} core Github core
   * @param {string} schema Path to schema file
   * @param {string} output Path to output
   * @param {string} extraUris Comma separated uris
   * @returns {string}
   */
  schema: function (core, schema, output, extraUris) {
    let command = 'publish-extractor schema '
    if (schema.trim() === '') {
      core.error("Path to schema file is required")
      process.exit(1)
    }
    command += '--schema ' + schema.trim() + ' '
    if (output.trim() !== '') {
      command += '--output ' + output.trim() + ' '
    }
    if (extraUris.trim() !== '') {
      command += '--extra-uris ' + extraUris.trim().split(',').join(' ') + ' '
    }
    return command.trim()
  },
  /**
   * Run schema
   * @param {object} core Github core
   * @param {string} schema Path to schema file
   * @param {string} configFiles Paths to config files
   * @returns {string}
   */
  runSchema: function(core, schema, configFiles) {
    let command = 'publish-extractor run-schema '
    if (schema.trim() === '') {
      core.error("Path to schema file is required")
      process.exit(1)
    }
    command += '--schema ' + schema.trim() + ' '
    if (configFiles.trim() === '') {
      core.error("Config files are required")
      process.exit(1)
    }
    command += '--config-files ' + configFiles.trim().split(',').join(' ') + ' '
    return command.trim()
  },
  /**
   * Source systems
   * @param {object} core Github core
   * @param {string} manifest Manifest path
   * @param {string} manifestDir Manifest directory path
   * @param {string} noVerify No verify
   * @returns {string}
   */
  sourceSystems: function(core, manifest, manifestDir, noVerify) {
    let command = 'publish-extractor source-systems '
    if (manifest.trim() !== '' && manifestDir.trim() !== '') {
      core.error('You can provide either manifest or manifest dir')
      process.exit(1)
    }
    if (manifest.trim() !== '') {
      command += '--manifest ' + manifest.trim() + ' '
    }
    if (manifestDir.trim() !== '') {
      command += '--manifest-dir ' + manifestDir.trim() + ' '
    }
    command += bool_check('no-verify', noVerify) + ' '
    return command.trim()
  }
}
