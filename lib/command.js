const { Command, Option } = require("commander");
const audiomothUtils = require("audiomoth-utils");

function makeProgram() {
  const program = new Command();

  program
    .description(
      "Expand an AudioMoth T.WAV recording (a recording with amplitude thresholding or frequency triggering applied)"
    ) // TODO use addCommand to handle the subcommands
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
        .argParser(parseInt)
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
