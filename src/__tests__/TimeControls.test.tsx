import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TimeControls } from "../components/TimeControls.tsx";

describe("TimeControls", () => {
  const start = new Date("2003-10-28T10:30:00Z");
  const end = new Date("2003-10-28T16:30:00Z");
  const current = new Date("2003-10-28T13:00:00Z");
  const mockOnSeek = jest.fn();
  const mockOnPlayPause = jest.fn();

  const defaultProps = {
    startTime: start,
    endTime: end,
    currentTime: current,
    isPlaying: false,
    onSeek: mockOnSeek,
    onPlayPause: mockOnPlayPause,
  };

  beforeEach(() => {
    mockOnSeek.mockClear();
    mockOnPlayPause.mockClear();
  });

  it("displays the current UTC time", () => {
    render(<TimeControls {...defaultProps} />);
    expect(screen.getByText(/2003-10-28/)).toBeInTheDocument();
    expect(screen.getByText(/13:00:00 UTC/)).toBeInTheDocument();
  });

  it("renders a play button when paused", () => {
    render(<TimeControls {...defaultProps} isPlaying={false} />);
    expect(screen.getByRole("button", { name: /play/i })).toBeInTheDocument();
  });

  it("renders a pause button when playing", () => {
    render(<TimeControls {...defaultProps} isPlaying={true} />);
    expect(screen.getByRole("button", { name: /pause/i })).toBeInTheDocument();
  });

  it("calls onPlayPause when play/pause button is clicked", async () => {
    const user = userEvent.setup();
    render(<TimeControls {...defaultProps} />);
    await user.click(screen.getByRole("button", { name: /play/i }));
    expect(mockOnPlayPause).toHaveBeenCalledTimes(1);
  });

  it("renders a time slider", () => {
    render(<TimeControls {...defaultProps} />);
    const slider = screen.getByRole("slider");
    expect(slider).toBeInTheDocument();
  });

  it("slider value reflects current time position", () => {
    render(<TimeControls {...defaultProps} />);
    const slider = screen.getByRole("slider") as HTMLInputElement;
    // current is halfway between start and end
    const expectedValue = String(current.getTime());
    expect(slider.value).toBe(expectedValue);
  });

  it("calls onSeek when slider is changed", () => {
    render(<TimeControls {...defaultProps} />);
    const slider = screen.getByRole("slider");
    fireEvent.change(slider, {
      target: { value: String(new Date("2003-10-28T14:00:00Z").getTime()) },
    });
    expect(mockOnSeek).toHaveBeenCalledTimes(1);
    expect(mockOnSeek).toHaveBeenCalledWith(
      new Date("2003-10-28T14:00:00Z"),
    );
  });
});
