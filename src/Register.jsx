import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({ name: "", email: "", password: "", studentId: "", department: "" });

  const change = e => setData({ ...data, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    try {
      const res = await api.post("/register", data);
      alert(res.data);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data || "Registration failed");
    }
  };

  return (
    <div className="page formPage">
      <div className="card formCard">
        <h2>Create your TeamMatch account</h2>
        <p className="muted">Register as a student and start finding teammates.</p>
        <form onSubmit={submit}>
          <label>Full Name<input name="name" value={data.name} onChange={change} required /></label>
          <label>Email<input type="email" name="email" value={data.email} onChange={change} required /></label>
          <label>Password<input type="password" name="password" value={data.password} onChange={change} required /></label>
          <label>Student ID<input name="studentId" value={data.studentId} onChange={change} required /></label>
          <label>Department
            <select name="department" value={data.department} onChange={change} required>
              <option value="">Select department</option>
              <option>CSE</option><option>ECE</option><option>EEE</option><option>MECH</option><option>CIVIL</option><option>Other</option>
            </select>
          </label>
          <button className="primary full" type="submit">Create Account</button>
        </form>
      </div>
    </div>
  );
}
