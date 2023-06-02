import "./App.css";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { Home } from "./Home";
import { NewBook } from "./NewBook";
import { Books } from "./Books";
import { NotFound } from "./NotFound";
import { Authors } from "./Authors";
import { NewAuthor } from "./NewAuthor";

function App() {
  const location = useLocation();
  return (
    <>
      <div className="nav-bar">
        <nav>
          <ul>
            <li>
              <Link
                className={location.pathname === "/" ? "active" : null}
                to="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className={location.pathname === "/authors" ? "active" : null}
                to="/authors"
              >
                Authors
              </Link>
            </li>
            <li>
              <Link
                className={
                  location.pathname === "/authors/new" ? "active" : null
                }
                to="/authors/new"
              >
                Add Author
              </Link>
            </li>
            <li>
              <Link
                className={location.pathname === "/books" ? "active" : null}
                to="/books"
              >
                Books
              </Link>
            </li>
            <li>
              <Link
                className={location.pathname === "/books/new" ? "active" : null}
                to="/books/new"
              >
                Add Book
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/authors/new" element={<NewAuthor />} />

        <Route path="/books" element={<Books />} />
        <Route path="/books/new" element={<NewBook />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
export default App;
