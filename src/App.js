import './App.css';
import Header from "./Header"
import User from "./User"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="users" element={<div><Header/><Home/></div>} />
          <Route path="users/:id" element={<div><Header/><User/></div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
