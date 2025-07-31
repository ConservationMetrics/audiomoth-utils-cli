#!/usr/bin/env node

// Create versioned zip files for distribution
const { execSync } = require("child_process");
const pkg = require("../package.json");
const version = pkg.dependencies["audiomoth-utils"];

console.log(`Creating versioned zip files with audiomoth-utils@${version}...`);

try {
  // Create Linux zip
  execSync(
    "cd dist && cp audiomoth-utils-cli-linux audiomoth-utils && zip -m audiomoth-utils-cli-linux-x64-v" +
      version +
      ".zip audiomoth-utils",
    { stdio: "inherit" }
  );

  // Create Windows zip
  execSync(
    "cd dist && cp audiomoth-utils-cli-win.exe audiomoth-utils.exe && zip -m audiomoth-utils-cli-windows-x64-v" +
      version +
      ".zip audiomoth-utils.exe",
    { stdio: "inherit" }
  );

  console.log("✓ Created versioned zip files");
} catch (error) {
  console.error("Failed to create zip files:", error.message);
  process.exit(1);
}
