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
    } else if (['publish', 'sync', 'validate', 'run-schema', 'schema'].indexOf(command) === -1) {
      core.error('command ' + command + ' not supported')
    }
    if (exit_status !== 0) {
      process.exit(1)
    }
  },
  publish: function(core, manifestPath, version, noVerify, onlyArtifact) {
    let command = 'publish-extractor publish '
    if (version.trim() == '') {
      core.error("Version is required in semver format")
      process.exit(1)
    }
    command += '--version ' + version + ' '

    if (manifestPath.trim() == '') {
      core.error("Path to manifest file is required")
      process.exit(1)
    }
    command += '--manifest ' + manifestPath.trim() + ' '

    command += '--no-verify ' + bool_check(core, 'no-verify', noVerify) + ' '

    command += '--only-artifacts ' + bool_check(core, 'only-artifact', onlyArtifact) + ' '

    return command.trim()
  },
  sync: function(core, manifestPath, noVerify) {
    let command = 'publish-extractor sync '
    if (manifestPath.trim() == '') {
      core.error("Path to manifest file is required")
      process.exit(1)
    }
    command += '--manifest ' + manifestPath + ' '
    command += '--no-verify ' + bool_check(core, 'no-verify', noVerify) + ' '
    return command.trim()
  },
  validate: function(core, manifestPath, configFiles) {
    let command = 'publish-extractor validate '
    if (manifestPath.trim() == '') {
      core.error("Path to manifest file is required")
      process.exit(1)
    }

    command += '--manifest ' + manifestPath + ' '
    if ('${{ inputs.config-files }}'.trim() !== '') {
      command += '--config-files ' + configFiles + ' '
    }
    return command
  },
  runSchema: function(core) {},
  schema: function (core) {}
}
