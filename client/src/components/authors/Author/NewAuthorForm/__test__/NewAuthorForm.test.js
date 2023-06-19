import { render, screen, fireEvent } from "@testing-library/react";
import NewAuthorForm from "../NewAuthorForm";
import { BrowserRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";

const MockNewAuthorForm = () => {
  return (
    <BrowserRouter>
      <NewAuthorForm />
    </BrowserRouter>
  );
};
describe("add new author form", () => {
  it("should display error if author name is empty string", () => {
    // act(() => {
    //   render(<MockNewAuthorForm />);
    // })
    render(<MockNewAuthorForm />);

    const addAuthorButton = screen.getByText(/add author/i);
    // act(() => fireEvent.click(addAuthorButton));

    const errorElement = screen.getByTestId("h6");
    // expect(errorElement.textContent).toBe("Author Name Required");
    // const allHeadings = screen.getAllByRole("heading");
    // const h6Heading = allHeadings.filter(heading => heading.nodeType === "h6");
    // console.log(h6Heading);
    // expect(
    //   errorHeading.filter((heading) => heading.nodeType === "h6")
    // )[0].toHaveValue("Author Name Required");
  });
});
