#!/usr/bin/env node

const command = require("../lib/command");
const program = command.makeProgram();

function main() {
  try {
    program.parse(process.argv);
  } catch (err) {
    if (err instanceof Error) {
      //   if (program.opts().debug) {
      //     console.error(`${err.stack}`);
      //   }
      //   if (err.message !== util.suppressTerminateExceptionMessage) {
      console.log(`caught exception with message ${err.message}`);
      //   }
    } else {
      throw err;
    }
    // Recommended practice for node is set exitcode not force exit
    process.exitCode = 7; // Exit with code 7 if an exception occurred
  }
}

main().then(() => {});
