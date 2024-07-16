#!/usr/bin/env node

const command = require("../lib/command");
const program = command.makeProgram();

function main() {
  try {
    program.parse(process.argv);
  } catch (err) {
    console.error("exception:", err);
    // Recommended practice for node is set exitcode not force exit
    process.exitCode = 8; // Exit with code 8 if an exception occurred
  }
}

main().then(() => {});
