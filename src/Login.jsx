import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const change = e => setData({ ...data, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    try {
      const res = await api.post("/login", data);
      localStorage.setItem("userId", res.data.id);
      localStorage.setItem("userName", res.data.name);
      localStorage.setItem("userEmail", res.data.email);
      localStorage.setItem("department", res.data.department || "");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data || "Login failed");
    }
  };

  return (
    <div className="page formPage">
      <div className="card formCard">
        <h2>Welcome back</h2>
        <p className="muted">Login to find your project teammates.</p>
        <form onSubmit={submit}>
          <label>Email<input type="email" name="email" value={data.email} onChange={change} required /></label>
          <label>Password<input type="password" name="password" value={data.password} onChange={change} required /></label>
          <button className="primary full" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
