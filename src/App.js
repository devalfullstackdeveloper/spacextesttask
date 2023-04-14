import { BrowserRouter, Route, Routes } from "react-router-dom";
import FilterLaunch from "./Components/FilterLaunch";
import "../src/style.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FilterLaunch />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
