function bool_check(prop, value) {
  if (['true', 'yes', 'false', 'no', ''].indexOf(value) === -1) {
    core.error('Invalid value passed for ' + prop + ', boolean expected');
    process.exit(1)
  }
  return ['true', 'yes'].indexOf(value) ? 'true' : 'false'
}


module.exports = {
  verifyCommand: function(command) {
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
  publish: function(manifestPath, version, noVerify, onlyArtifact) {
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

    command += '--no-verify ' + bool_check('no-verify', noVerify) + ' '

    command += '--only-artifacts ' + bool_check('only-artifact', onlyArtifact) + ' '

    return command.trim()
  },
  sync: function(manifestPath, noVerify) {
    let sync_command = 'publish-extractor sync '
    if (manifestPath.trim() == '') {
      core.error("Path to manifest file is required")
      process.exit(1)
    }
    sync_command += '--manifest ' + manifestPath + ' '
    sync_command += '--no-verify ' + bool_check('no-verify', noVerify) + ' '
    return sync_command.trim()
  }
}




// if ('${{ inputs.command }}'.trim() == '') {
//     core.exit('command is required')
//     process.exit(1)
//   }

//   function bool_check(prop, value) {
//     if (['true', 'yes', 'false', 'no', ''].indexOf(value) === -1) {
//       core.error('Invalid value passed for ' + prop + ', boolean expected');
//       process.exit(1)
//     }
//     return ['true', 'yes'].indexOf(value) ? 'true' : 'false'
//   }

//   switch('${{ inputs.command }}') {
//     case 'publish':
//       let command = 'publish-extractor publish '
//       if ('${{ inputs.version }}'.trim() == '') {
//         core.error("Version is required in semver format")
//         process.exit(1)
//       }
//       command += '--version ${{ inputs.version }} '

//       if ('${{ inputs.manifest_path }}'.trim() == '') {
//         core.error("Path to manifest file is required")
//         process.exit(1)
//       }
//       command += '--manifest ${{ inputs.manifest_path }} '

//       command += '--no-verify ' + bool_check('no-verify', ${{ inputs.no-verify }}) + ' '

//       command += '--only-artifacts ' + bool_check('no-verify', ${{ inputs.no-verify }}) + ' '
//       return command.trim()

//     case 'sync':
//       let sync_command = 'publish-extractor sync '
//       if ('${{ inputs.manifest_path }}'.trim() == '') {
//         core.error("Path to manifest file is required")
//         process.exit(1)
//       }
//       command += '--manifest ${{ inputs.manifest_path }} '
//       command += '--no-verify ' + bool_check('no-verify', ${{ inputs.no-verify }}) + ' '
//       return command.trim()

//     case 'validate':
//       let validate_command = 'publish-extractor validate '
//       if ('${{ inputs.manifest_path }}'.trim() == '') {
//         core.error("Path to manifest file is required")
//         process.exit(1)
//       }

//       command += '--manifest ${{ inputs.manifest_path }} '
//       if ('${{ inputs.config-files }}'.trim() !== '') {
//         let files = '${{ inputs.config-files }}'.trim().split(',')
//         command += '--config-files ${{ inputs.config-files }} '
//       }
//       return command
//     case 'run-schema':
//       break
//     case 'schema': 
//       break
//     default:
//       core.error('unrecognized command passed')
//     process.exit(1)
//   }
