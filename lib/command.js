const { Command, Option } = require("commander");
const audiomothUtils = require("audiomoth-utils");
const audiomothUtilsPackage = require("audiomoth-utils/package.json");

/**
 * A base-10 version of parseInt where the second argument is a callback
 * passed by Commander Option
 *
 * Doc: https://github.com/tj/commander.js?tab=readme-ov-file#custom-option-processing
 * Motivation: https://github.com/tj/commander.js/issues/943
 *
 * @param {*} value
 * @param {*} dummyPrevious The callback function receives two parameters: the user specified value and the
previous value for the option.
 * @returns
 */
function cmdrParseInt(value, dummyPrevious) {
  return parseInt(value);
}

function makeProgram() {
  const program = new Command("audiomoth-utils");

  program
    .description(
      "Expand an AudioMoth T.WAV recording (a recording with amplitude thresholding or frequency triggering applied)"
    ) // TODO use addCommand to handle the subcommands
    .version(`This is a CLI wrapper around audiomoth-utils ${audiomothUtilsPackage.version}`, "-v, --version", "display version of audiomoth-utils library")
    .arguments("<subcommand> <inputFile>")
    .option(
      "-d, --destination [outputPath]",
      "output directory to write expansions. If omitted, dump expanded files in the same folder as inputFile."
    )
    .option(
      "--prefix [prefix]",
      "optional string (not including '_') to prefix to expanded filenames that will be created."
    )
    .addOption(
      new Option(
        "--max-file-duration [seconds]",
        "max duration of expanded file to write, in seconds"
      )
        .argParser(cmdrParseInt)
        .default(5)
    )
    .option("--generate-silent-files", "generate silent files", false)
    .option(
      "--align-to-second-transitions",
      "align to second transitions",
      false
    )
    .action((subcommand, inputFile, options) => {
      const {
        destination,
        prefix,
        maxFileDuration,
        generateSilentFiles,
        alignToSecondTransitions,
      } = options;

      // Determine expansionType based on command
      let expansionType;
      switch (subcommand) {
        case "expand-duration":
          expansionType = "DURATION";
          break;
        case "expand-event":
          expansionType = "EVENT";
          break;
        default:
          console.error("Invalid subcommand");
          process.exit(9);
      }

      try {
        // Call the expand function with the provided arguments and options
        const result = audiomothUtils.expand(
          inputFile,
          destination, // optional
          prefix, // optional
          expansionType,
          maxFileDuration,
          generateSilentFiles,
          alignToSecondTransitions
        );

        if (result?.success) {
          console.log("Expansion completed successfully.");
          process.exitCode = 0; // Exit with code 0 if success is true
        } else {
          console.error("Expansion failed:", result?.error);
          process.exitCode = 1; // Exit with code 1 if success is false
        }
      } catch (err) {
        console.error("exception:", err.toString());
        // Recommended practice for node is set exitcode not force exit
        process.exitCode = 7; // Exit with code 7 if an exception occurred INSIDE audioUtils lib
      }
    });
  return program;
}

function fab(args) {
  makeProgram().parse(args, { from: "user" });
}

module.exports = {
  makeProgram: makeProgram,
  fab: fab,
};
