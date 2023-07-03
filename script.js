/* Cognite Extractor for OPC-UA
Copyright (C) 2021 Cognite AS

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA. */
function bool_check(core, prop, value) {
  if (['true', 'yes', 'false', 'no', ''].indexOf(value) === -1) {
    core.error('Invalid value passed for ' + prop + ', boolean expected');
    process.exit(1)
  }
  return ['true', 'yes'].indexOf(value) ? 'true' : 'false'
}


export function verifyCommand(core, command) {
    command = command.trim();
    let exit_status = 0;
    if (command == '') {
        core.error('command is required');
    } else if (['publish', 'sync', 'validate', 'run-schema', 'schema', 'source-systems'].indexOf(command) === -1) {
        core.error('command ' + command + ' not supported');
    }
    if (exit_status !== 0) {
        process.exit(1);
    }
}
export function publish(core, manifestPath, version, noVerify, onlyArtifact, abortOnExists) {
    let command = 'publish-extractor publish ';
    if (version.trim() == '') {
        core.error("Version is required in semver format");
        process.exit(1);
    }
    command += '--version ' + version.trim() + ' ';

    if (manifestPath.trim() == '') {
        core.error("Path to manifest file is required");
        process.exit(1);
    }
    command += '--manifest ' + manifestPath.trim() + ' ';

    command += '--no-verify ' + bool_check(core, 'no-verify', noVerify.trim()) + ' ';

    command += '--only-artifacts ' + bool_check(core, 'only-artifact', onlyArtifact.trim()) + ' ';

    command += '--abort-on-exists ' + bool_check(core, 'abort-on-exists', abortOnExists.trim()) + ' ';

    return command.trim();
}
export function sync(core, manifestPath, noVerify, manifestDir) {
    let command = 'publish-extractor sync ';
    if (manifest.trim() !== '' && manifestDir.trim() !== '') {
        core.error('You can provide either manifest or manifest dir');
        process.exit(1);
    }
    if (manifestDir.trim() !== '') {
        command += '--manifest-dir ' + manifestDir.trim() + ' ';
    }
    if (manifestPath.trim() !== '') {
        command += '--manifest ' + manifestPath.trim() + ' ';
    }
    command += '--no-verify ' + bool_check(core, 'no-verify', noVerify.trim()) + ' ';
    return command.trim();
}
export function validate(core, manifestPath, configFiles, wrongConfigFiles) {
    let command = 'publish-extractor validate ';
    if (manifestPath.trim() == '') {
        core.error("Path to manifest file is required");
        process.exit(1);
    }
    command += '--manifest ' + manifestPath + ' ';
    if (configFiles.trim() !== '') {
        command += '--config-files ' + configFiles.trim().split(',').join(' ') + ' ';
    }
    if (wrongConfigFiles.trim() !== '') {
        command += '--config-files ' + wrongConfigFiles.trim().split(',').join(' ') + ' ';
    }
    return command.trim();
}
export function schema(core, schema, output, extraUris) {
    let command = 'publish-extractor schema ';
    if (schema.trim() === '') {
        core.error("Path to schema file is required");
        process.exit(1);
    }
    command += '--schema ' + schema.trim() + ' ';
    if (output.trim() !== '') {
        command += '--output ' + output.trim() + ' ';
    }
    if (extraUris.trim() !== '') {
        command += '--extra-uris ' + extraUris.trim().split(',').join(' ') + ' ';
    }
    return command.trim();
}
export function runSchema(core, schema, configFiles) {
    let command = 'publish-extractor run-schema ';
    if (schema.trim() === '') {
        core.error("Path to schema file is required");
        process.exit(1);
    }
    command += '--schema ' + schema.trim() + ' ';
    if (configFiles.trim() === '') {
        core.error("Config files are required");
        process.exit(1);
    }
    command += '--config-files ' + configFiles.trim().split(',').join(' ') + ' ';
    return command.trim();
}
export function sourceSystems(core, manifest, manifestDir, noVerify) {
    let command = 'publish-extractor source-systems ';
    if (manifest.trim() !== '' && manifestDir.trim() !== '') {
        core.error('You can provide either manifest or manifest dir');
        process.exit(1);
    }
    if (manifest.trim() !== '') {
        command += '--manifest ' + manifest.trim() + ' ';
    }
    if (manifestDir.trim() !== '') {
        command += '--manifest-dir ' + manifestDir.trim() + ' ';
    }
    command += bool_check('no-verify', noVerify) + ' ';
    return command.trim();
}
