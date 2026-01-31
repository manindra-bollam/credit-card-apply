import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
// import other pages as needed

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginForm />} />
      {/* Add more routes here as your app grows */}
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
