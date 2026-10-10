import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const logged = !!localStorage.getItem("userId");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link className="brand" to="/">TeamMatch</Link>
      <div className="navlinks">
        <Link to="/">Home</Link>
        {logged ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/students">Find Teammates</Link>
            <Link to="/requests">Requests</Link>
            <Link to="/team">My Team</Link>
            <button className="navbtn" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
