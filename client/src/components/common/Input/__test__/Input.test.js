import { render, screen, fireEvent } from "@testing-library/react";
import Input from "../Input";

const mockRegister = jest.fn();
const mockOnInputChange = jest.fn();
const mockErrors = {
  name: { message: "Mock Error" }
};

const authorValidation = {
  name: "author",
  label: "Author Name",
  inputType: "text",
  id: "author-input",
  placeholder: "Author Name...",
  validation: {
    required: "Author Name Required"
  }
};

describe("Input component", () => {
  it("should change on keystroke", () => {
    render(
      <Input
        validation={authorValidation}
        register={mockRegister}
        errors={mockErrors}
        onInputChange={mockOnInputChange}
      />
    );
    const inputElement = screen.getByRole("textbox");
    fireEvent.change(inputElement, { target: { value: "Michael Jackson" } });
    expect(inputElement).toHaveValue("Michael Jackson");
  });

  it("should display error if error is available", () => {
    render(
      <Input
        validation={authorValidation}
        register={mockRegister}
        errors={mockErrors}
        onInputChange={mockOnInputChange}
      />
    );
    const errorElement = screen.getByText("Mock Error");
    expect(errorElement).toBeVisible();
  });
});
