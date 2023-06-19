import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../SearchBar";

describe("SearchBar unit testing", () => {
  it("should change input on keystroke", () => {
    const mockOnInputChange = jest.fn();
    render(
      <SearchBar
        name={"Search for Authors"}
        onInputChange={mockOnInputChange}
      />
    );

    const inputElement = screen.getByRole("textbox");
    fireEvent.change(inputElement, { target: { value: "Whitehead" } });
    expect(inputElement).toHaveValue("Whitehead");
  });
});
