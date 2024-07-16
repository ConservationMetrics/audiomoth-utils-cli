const command = require("../lib/command");

const audiomothUtils = require("audiomoth-utils");

jest.mock("audiomoth-utils", () => ({
  expand: jest.fn(),
}));

describe("audiomoth-utils CLI", () => {
  beforeEach(() => {
    audiomothUtils.expand.mockClear();
    audiomothUtils.expand.mockReturnValue({ success: true });
    // Mock console.log and console.error
    console.log = jest.fn();
    console.error = jest.fn();
    // Mock process.exit
    process.exit = jest.fn();
  });

  test("calling with no arguments uses default values", () => {
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
    expect(process.exit).toHaveBeenCalledWith(0);
  });
});
