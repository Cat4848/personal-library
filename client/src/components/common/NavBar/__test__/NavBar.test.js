import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import NavBar from "../NavBar";
import { BrowserRouter, Route, Routes, MemoryRouter } from "react-router-dom";
import Home from "../../../Home/Home";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import Authors from "../../../authors/Authors";
import userEvent from "@testing-library/user-event"

const MockNavBar = () => {
  return (
    <BrowserRouter>
      <NavBar />
    </BrowserRouter>
  );
};

describe("NavBar Integration Tests", () => {
  it("should render the Home component", async () => {
    const fakeEvent = { name: "fake event name" };
    const routes = [
      {
        path: "/",
        element: <Home />,
        loader: () => fakeEvent
      },
      {
        path: "/authors",
        element: <Authors />,
        loader: () => fakeEvent
      }
    ];

    const router = createMemoryRouter(routes);

    render(<RouterProvider router={router} />);

    await waitFor(() => screen.getByRole("heading"));
    expect(screen.getByRole("heading")).toHaveTextContent(/personal library/i);

  });


  // it("should render the Home component", () => {
  //   render(
  //     <MemoryRouter>
  //       <Routes>
  //         <Route path="/" element={<Home />} />
  //         <Route path="/authors" element={<Authors />} />
  //       </Routes>
  //     </MemoryRouter>
  //   );
  //   userEvent.click(screen.getByRole("link", {name: /home/i}));
  // });
});
