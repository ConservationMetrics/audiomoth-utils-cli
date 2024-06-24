#!/usr/bin/env node

const { Command } = require("commander");
const program = new Command();

program
  .version("1.0.0")
  .description("A simple hello-world CLI")
  .argument("<name>", "name to greet")
  .option("-u, --uppercase", "convert name to uppercase")
  .action((name, options) => {
    if (options.uppercase) {
      name = name.toUpperCase();
    }
    console.log(`Hello, ${name}!`);
  });

program.parse(process.argv);
