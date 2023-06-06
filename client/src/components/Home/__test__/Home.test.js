import { render, screen } from "@testing-library/react";
import Home from "../Home";

describe("Home component", () => {
  it("should render personal library heading", () => {
    render(<Home />);
    const headingElement = screen.getByRole("heading", {name: /personal library/i});
    expect(headingElement).toBeInTheDocument();
  });
})

