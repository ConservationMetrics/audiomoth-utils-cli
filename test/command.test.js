const command = require("../lib/command");

const audiomothUtils = require("audiomoth-utils");

jest.mock("audiomoth-utils", () => ({
  expand: jest.fn(),
}));

describe("audiomoth-utils CLI", () => {
  let originalExitCode;

  beforeAll(() => {
    // Since the application code under test may override process.exitCode,
    // save the original process.exitCode, so it may be replaced (i.e. on the
    // jest process itself) after our application code is tested.
    originalExitCode = process.exitCode;
  });

  afterAll(() => {
    // Restore the original process.exitCode
    process.exitCode = originalExitCode;
  });

  beforeEach(() => {
    audiomothUtils.expand.mockClear();
    console.log = jest.fn();
    console.error = jest.fn();
  });

  test("calling with no arguments is same as calling with explicit values (the defaults)", () => {
    // This helps find bugs with CLI argument parsing, e.g. Github issue #1
    audiomothUtils.expand.mockReturnValue({ success: true });

    // No arguments - uses defaults
    command.fab(["expand-duration", "input.wav"]);
    // Hard-coding the defaults. This tests that are CLI args get parsed correctly.
    command.fab(["expand-duration", "input.wav", "--max-file-duration=5"]);

    expect(audiomothUtils.expand).toHaveBeenCalledTimes(2);
    expect(audiomothUtils.expand.mock.calls[0]).toEqual(
      audiomothUtils.expand.mock.calls[1]
    );

    expect(audiomothUtils.expand).toHaveBeenCalledWith(
      "input.wav",
      undefined,
      undefined,
      "DURATION",
      5,
      false,
      false
    );
  });

  test("setting boolean CLI arguments (flags)", () => {
    audiomothUtils.expand.mockReturnValue({ success: true });
    command.fab([
      "expand-duration",
      "input.wav",
      "--generate-silent-files",
      "--align-to-second-transitions",
    ]);

    expect(audiomothUtils.expand).toHaveBeenCalledTimes(1);

    expect(audiomothUtils.expand).toHaveBeenCalledWith(
      "input.wav",
      undefined,
      undefined,
      "DURATION",
      5,
      true,
      true
    );
  });

  test("when audiomothUtils.expand returns success", () => {
    audiomothUtils.expand.mockReturnValue({ success: true });
    command.fab(["expand-duration", "input.wav"]);

    expect(audiomothUtils.expand).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith(
      "Expansion completed successfully."
    );
    expect(process.exitCode).toEqual(0);
  });

  test("when audiomothUtils.expand returns failure", () => {
    audiomothUtils.expand.mockReturnValue({
      success: false,
      error: "Invalid file or some such",
    });
    command.fab(["expand-duration", "input.wav"]);

    expect(audiomothUtils.expand).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(
      "Expansion failed:",
      "Invalid file or some such"
    );
    expect(process.exitCode).toEqual(1);
  });

  test("when audiomothUtils.expand throws an exception", () => {
    audiomothUtils.expand.mockImplementation(() => {
      throw new Error("Unexpected error");
    });
    command.fab(["expand-duration", "input.wav"]);

    expect(audiomothUtils.expand).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(
      "exception:",
      "Error: Unexpected error"
    );
    expect(process.exitCode).toEqual(7);
  });
});
