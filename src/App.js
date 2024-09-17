import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./hos/component/pages/HomePage";
import StarPage from "./hos/component/pages/StarPage";
import SearchPage from "./hos/component/pages/SearchPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/star" element={<StarPage />}></Route>
        <Route path="/search" element={<SearchPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
