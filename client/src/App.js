import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import { NewBookForm } from "./components/books/NewBookForm";
import { Books } from "./components/books/Books";
import NotFound from "./components/NotFound/NotFound";
import { Authors } from "./components/authors/Authors";
import { NewAuthorForm } from "./components/authors/NewAuthorForm";
import { NavBar } from "./components/common/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/authors/new" element={<NewAuthorForm />} />

        <Route path="/books" element={<Books />} />
        <Route path="/books/new" element={<NewBookForm />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
export default App;
