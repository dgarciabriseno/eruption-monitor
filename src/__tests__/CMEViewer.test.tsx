import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CMEViewer } from "../components/CMEViewer.tsx";
import type { CMEEvent } from "../types/cme.ts";

// Mock the Canvas since WebGL doesn't work in JSDOM
jest.mock("@react-three/fiber", () => ({
  Canvas: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="r3f-canvas">{children}</div>
  ),
  useFrame: jest.fn(),
  useThree: () => ({ gl: { initTexture: jest.fn() } }),
}));

jest.mock("@helioviewer/sun", () => ({
  Sun: jest.fn().mockImplementation(() => ({
    ready: Promise.resolve(),
    range: {
      start: new Date("2003-10-28T10:30:00Z"),
      end: new Date("2003-10-28T16:30:00Z"),
    },
    count: 18,
    time: new Date("2003-10-28T10:30:00Z"),
    SetTime: jest.fn(),
    dispose: jest.fn(),
  })),
  Quality: {
    Low: { resolution: 512, format: "jpg" },
    Default: { resolution: 1024, format: "png" },
  },
  SunConfig: { model_path: "/resources/models/zit.glb" },
  PLANE_SOURCES: [4, 5],
}));

jest.mock("camera-controls", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MockCC: any = jest.fn().mockImplementation(() => ({
    setPosition: jest.fn(),
    update: jest.fn(),
    dispose: jest.fn(),
  }));
  MockCC.install = jest.fn();
  return { __esModule: true, default: MockCC };
});

const mockEvent: CMEEvent = {
  id: "2003-10-halloween1",
  name: "Halloween Storm: The First Punch",
  date: "2003-10-28",
  startTime: "2003-10-28T10:30:00Z",
  endTime: "2003-10-28T16:30:00Z",
  cadenceSeconds: 1200,
  sourceId: 4,
  flareClass: "X17.2",
  description: "AR 10486 produced an X17.2 flare and an enormous CME.",
  earthEffects: "G5 extreme storm lasting 27 hours.",
  source: "NASA SOHO Hotshots",
  sourceUrl: "https://soho.nascom.nasa.gov/hotshots/X17/",
};

describe("CMEViewer", () => {
  const mockOnBack = jest.fn();

  beforeEach(() => {
    mockOnBack.mockClear();
  });

  it("renders back button", () => {
    render(<CMEViewer event={mockEvent} onBack={mockOnBack} />);
    expect(
      screen.getByRole("button", { name: /back/i }),
    ).toBeInTheDocument();
  });

  it("calls onBack when back button is clicked", async () => {
    const user = userEvent.setup();
    render(<CMEViewer event={mockEvent} onBack={mockOnBack} />);
    await user.click(screen.getByRole("button", { name: /back/i }));
    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  it("displays the event name", () => {
    render(<CMEViewer event={mockEvent} onBack={mockOnBack} />);
    expect(
      screen.getByText("Halloween Storm: The First Punch"),
    ).toBeInTheDocument();
  });

  it("displays the flare class", () => {
    render(<CMEViewer event={mockEvent} onBack={mockOnBack} />);
    expect(screen.getByText(/X17.2/)).toBeInTheDocument();
  });

  it("renders the 3D canvas", () => {
    render(<CMEViewer event={mockEvent} onBack={mockOnBack} />);
    expect(screen.getByTestId("r3f-canvas")).toBeInTheDocument();
  });

  it("renders time controls", () => {
    render(<CMEViewer event={mockEvent} onBack={mockOnBack} />);
    // Should have play button and slider
    expect(screen.getByRole("button", { name: /play/i })).toBeInTheDocument();
    expect(screen.getByRole("slider")).toBeInTheDocument();
  });

  it("shows loading state initially", () => {
    render(<CMEViewer event={mockEvent} onBack={mockOnBack} />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
