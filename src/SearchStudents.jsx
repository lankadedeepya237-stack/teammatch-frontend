import { useState } from "react";
import api from "./api";

export default function SearchStudents() {
  const userId = Number(localStorage.getItem("userId"));
  const [filters, setFilters] = useState({ skill: "", department: "", interest: "", name: "" });
  const [students, setStudents] = useState([]);
  const [searched, setSearched] = useState(false);
  const change = e => setFilters({ ...filters, [e.target.name]: e.target.value });

  const search = async e => {
    e.preventDefault();
    try {
      const res = await api.get("/students", { params: { ...filters, excludeUserId: userId } });
      setStudents(res.data); setSearched(true);
    } catch { alert("Could not load students"); }
  };

  const sendRequest = async student => {
    const message = window.prompt(`Message for ${student.name}:`, "Hi, would you like to join my project team?");
    if (message === null) return;
    try {
      await api.post("/requests", { senderId: userId, receiverId: student.id, message });
      alert("Team request sent");
    } catch (err) { alert(err.response?.data || "Could not send request"); }
  };

  return (
    <div className="page">
      <h1>Find Your Teammates</h1>
      <p className="muted">Search by skill, interest, department or name.</p>
      <form className="searchBar" onSubmit={search}>
        <input name="skill" value={filters.skill} onChange={change} placeholder="Skill e.g. React" />
        <input name="interest" value={filters.interest} onChange={change} placeholder="Interest e.g. AI" />
        <input name="name" value={filters.name} onChange={change} placeholder="Student name" />
        <select name="department" value={filters.department} onChange={change}><option value="">All Departments</option><option>CSE</option><option>ECE</option><option>EEE</option><option>MECH</option><option>CIVIL</option><option>Other</option></select>
        <button className="primary">Search</button>
      </form>
      {searched && students.length === 0 && <div className="empty">No matching students found.</div>}
      <div className="studentGrid">
        {students.map(s => (
          <div className="studentCard" key={s.id}>
            <div className="avatar">{s.name?.charAt(0).toUpperCase()}</div>
            <h3>{s.name}</h3><p>{s.department} • {s.studentId}</p>
            <p><b>Skills:</b> {s.profile?.skills || "Not added"}</p>
            <p><b>Interests:</b> {s.profile?.interests || "Not added"}</p>
            <p>{s.profile?.bio || "No bio yet."}</p>
            {s.compatibility > 0 && <span className="match">{s.compatibility}% skill/interest match</span>}
            <button className="primary full" onClick={() => sendRequest(s)}>Send Team Request</button>
          </div>
        ))}
      </div>
    </div>
  );
}
