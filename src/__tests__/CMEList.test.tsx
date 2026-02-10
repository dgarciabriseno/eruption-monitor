import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CMEList } from "../components/CMEList.tsx";
import cmeEvents from "../data/cmeEvents.ts";

describe("CMEList", () => {
  const mockOnSelect = jest.fn();

  beforeEach(() => {
    mockOnSelect.mockClear();
  });

  it("renders a heading", () => {
    render(<CMEList onSelect={mockOnSelect} />);
    expect(
      screen.getByRole("heading", { name: /solar eruption monitor/i }),
    ).toBeInTheDocument();
  });

  it("renders all CME events as list items", () => {
    render(<CMEList onSelect={mockOnSelect} />);
    for (const event of cmeEvents) {
      expect(screen.getByText(event.name)).toBeInTheDocument();
    }
  });

  it("displays the date for each event", () => {
    render(<CMEList onSelect={mockOnSelect} />);
    for (const event of cmeEvents) {
      expect(screen.getByText(event.date)).toBeInTheDocument();
    }
  });

  it("displays flare class for each event", () => {
    render(<CMEList onSelect={mockOnSelect} />);
    expect(screen.getByText("X5.7")).toBeInTheDocument();
    expect(screen.getByText("X17.2")).toBeInTheDocument();
  });

  it("calls onSelect with the correct event when clicked", async () => {
    const user = userEvent.setup();
    render(<CMEList onSelect={mockOnSelect} />);

    const bastilleDay = screen.getByText("The Bastille Day Storm");
    await user.click(bastilleDay);

    expect(mockOnSelect).toHaveBeenCalledTimes(1);
    expect(mockOnSelect).toHaveBeenCalledWith(
      cmeEvents.find((e) => e.id === "2000-07-bastille"),
    );
  });

  it("renders a scrollable container", () => {
    render(<CMEList onSelect={mockOnSelect} />);
    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();
  });

  it("shows event descriptions", () => {
    render(<CMEList onSelect={mockOnSelect} />);
    expect(
      screen.getByText(/earliest significant halo CMEs/i),
    ).toBeInTheDocument();
  });
});
