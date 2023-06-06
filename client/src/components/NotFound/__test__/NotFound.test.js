import { render, screen } from "@testing-library/react";
import NotFound from "../NotFound";

describe("Home component", () => {
  it("should render personal library heading", () => {
    render(<NotFound />);
    const headingElement = screen.getByRole("heading", {name: /not found/i});
    expect(headingElement).toBeInTheDocument();
  });
})
