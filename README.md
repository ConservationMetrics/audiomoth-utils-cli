# AudioMoth-Utils CLI

[![Build and Release](https://github.com/ConservationMetrics/audiomoth-utils-cli/actions/workflows/build-and-release.yml/badge.svg)](https://github.com/ConservationMetrics/audiomoth-utils-cli/actions/workflows/build-and-release.yml)

This code is a thin command-line wrapper over the [AudioMoth-Utils node library by OpenAcousticDevices](https://github.com/OpenAcousticDevices/AudioMoth-Utils).

## Installation

Install the CLI by downloading the appropriate binary for your operating system from the [GitHub releases page](https://github.com/ConservationMetrics/audiomoth-utils-cli/releases).

Neither JavaScript experience nor Node.js is required to use this tool.

## Usage

To see the available commands and options:

```bash
$ audiomoth-utils --help
```

This will display the full usage information and available options.

## Features

Currently, the CLI supports a subset of the functionality provided by the upstream AudioMoth-Utils node library.
We aspire to gradually ramp up to provide full coverage in future releases.

## Development

### Building

To build the CLI binaries:

```bash
$ npm run build
```

This will create platform-specific binaries in the `dist/` directory.

To build and create versioned zip files for distribution:

```bash
$ npm run build:zip
```

This creates zip files like `audiomoth-utils-cli-linux-x64-v1.5.0.zip` that include the upstream library version in the filename.

### Version Safety

The build process includes automatic checks to ensure the installed `audiomoth-utils` version matches what's specified in `package.json`. This prevents distributing binaries with mismatched library versions.

## Versioning

To check the upstream version of the AudioMoth-Utils node library wrapped by this CLI:

```bash
$ audiomoth-utils --version
```


## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
