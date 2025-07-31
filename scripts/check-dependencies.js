#!/usr/bin/env node

// Check that node_modules version matches package.json
const pkg = require("../package.json");
const installed = require("audiomoth-utils/package.json");

const expectedVersion = pkg.dependencies["audiomoth-utils"];
const installedVersion = installed.version;

if (expectedVersion !== installedVersion) {
  console.error(
    `ERROR: node_modules audiomoth-utils version (${installedVersion}) does not match package.json (${expectedVersion})`
  );
  console.error('Run "npm install" to fix this issue.');
  process.exit(1);
}

console.log(`✓ Dependencies match: audiomoth-utils@${installedVersion}`);
