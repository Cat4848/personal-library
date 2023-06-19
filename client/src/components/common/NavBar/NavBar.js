import { Link, useLocation } from "react-router-dom";

export default function NavBar() {
  const location = useLocation();
  return (
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
              className={location.pathname === "/authors/new" ? "active" : null}
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
  );
}
