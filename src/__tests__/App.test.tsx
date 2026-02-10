import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App.tsx";

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

describe("App", () => {
  it("starts on the CME list view", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { name: /solar eruption monitor/i }),
    ).toBeInTheDocument();
  });

  it("navigates to viewer when a CME is clicked", async () => {
    const user = userEvent.setup();
    render(<App />);

    const bastilleDay = screen.getByText("The Bastille Day Storm");
    await user.click(bastilleDay);

    // Should show the viewer
    expect(
      screen.getByRole("button", { name: /back/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("The Bastille Day Storm")).toBeInTheDocument();
  });

  it("navigates back to list when back is clicked", async () => {
    const user = userEvent.setup();
    render(<App />);

    // Navigate to viewer
    await user.click(screen.getByText("The Bastille Day Storm"));

    // Click back
    await user.click(screen.getByRole("button", { name: /back/i }));

    // Should be back on list
    expect(
      screen.getByRole("heading", { name: /solar eruption monitor/i }),
    ).toBeInTheDocument();
  });

  it("shows the March 2025 Aurora event in the list", () => {
    render(<App />);
    expect(
      screen.getByText("The March 2025 Aurora Storm"),
    ).toBeInTheDocument();
  });
});
