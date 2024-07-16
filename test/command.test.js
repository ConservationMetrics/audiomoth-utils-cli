const command = require("../lib/command");

const audiomothUtils = require("audiomoth-utils");

jest.mock("audiomoth-utils", () => ({
  expand: jest.fn(),
}));

describe("audiomoth-utils CLI", () => {
  beforeEach(() => {
    audiomothUtils.expand.mockClear();
    // Mock console.log and console.error
    console.log = jest.fn();
    console.error = jest.fn();
    // Mock process.exit
    process.exit = jest.fn();
  });

  test("calling with no arguments uses default values", () => {
    audiomothUtils.expand.mockReturnValue({ success: true });

    command.fab(["expand-duration", "input.wav"]);

    expect(audiomothUtils.expand).toHaveBeenCalledWith(
      "input.wav",
      undefined,
      undefined,
      "DURATION",
      5,
      false,
      false
    );

    expect(console.log).toHaveBeenCalledWith(
      "Expansion completed successfully."
    );
    expect(process.exitCode).toEqual(0);
  });

  test("audiomothUtils.expand returns success", () => {
    audiomothUtils.expand.mockReturnValue({ success: true });
    command.fab(["expand-duration", "input.wav"]);

    expect(audiomothUtils.expand).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith(
      "Expansion completed successfully."
    );
    expect(process.exitCode).toEqual(0);
  });

  test("audiomothUtils.expand returns failure", () => {
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

  test("audiomothUtils.expand throws an exception", () => {
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
