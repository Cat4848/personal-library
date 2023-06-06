import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../Button";

const mockedHandleClick = jest.fn();

describe("Button component", () => {
  
  it("should appear the button on the screen", () => {
    render(<Button />);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
  });

  it("should have the correct name passed as props", () => {
    render(<Button name={"Add Author"} />);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement.textContent).toBe("Add Author");
  });

  it("should have the correct class passed as props", () => {
    render(<Button buttonClass={"delete-btn"} />);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveClass("btn delete-btn");
  });

  it("should have the correct type passed as props", () => {
    render(<Button buttonType={"submit"} />);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement.getAttribute("type")).toBe("submit");
  });

  it("should invoke the click handler passed as props", () => {
    render(<Button onClick={mockedHandleClick} />);
    const buttonElement = screen.getByRole("button");
    fireEvent.click(buttonElement);
    expect(mockedHandleClick).toHaveBeenCalled();
  });
});
