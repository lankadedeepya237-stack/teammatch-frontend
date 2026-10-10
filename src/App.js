import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import SearchStudents from "./SearchStudents";
import Requests from "./Requests";
import MyTeam from "./MyTeam";
import Project from "./Project";
import Navbar from "./Navbar";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/students" element={<SearchStudents />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/team" element={<MyTeam />} />
        <Route path="/project" element={<Project />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
