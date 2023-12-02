import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Home from "./pages/home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/auth/register" element={<Register />}></Route>
        <Route path="/auth/login" element={<Login />}></Route>
      </Routes>
    </>
  );
}

export default App;
