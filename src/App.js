import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./hos/component/pages/HomePage";
import StarPage from "./hos/component/pages/StarPage";

function App() {
  return (
    <BrowserRouter>
      <h3>명절 비상 진료 의료센터 조회</h3>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/star" element={<StarPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
