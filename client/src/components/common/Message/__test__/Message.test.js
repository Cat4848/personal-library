import { render, screen } from "@testing-library/react";
import Message from "../Message";

describe("Message unit testing", () => {
  it("should display success message", () => {
    render(<Message success={"added successfully"} />);

    const successElement = screen.getByRole("heading");
    expect(successElement).toHaveTextContent("added successfully");
  });

  it("should display error message", () => {
    render(<Message error={"error available"} />);

    const errorElement = screen.getByRole("heading");
    expect(errorElement).toHaveTextContent("error available");
    
  })
});
