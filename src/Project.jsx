import { useEffect, useState } from "react";
import api from "./api";

export default function Project() {
  const userId = Number(localStorage.getItem("userId"));
  const [data, setData] = useState({ ownerId: userId, name: "", description: "", technology: "", deadline: "", status: "NOT STARTED" });
  const [projects, setProjects] = useState([]);

  const load = () => api.get(`/projects/user/${userId}`).then(r => setProjects(r.data));
  useEffect(() => { load().catch(() => {}); }, [userId]);
  const change = e => setData({ ...data, [e.target.name]: e.target.value });

  const create = async e => {
    e.preventDefault();
    try { await api.post("/projects", { ...data, ownerId: userId }); alert("Project created"); setData({ ownerId: userId, name: "", description: "", technology: "", deadline: "", status: "NOT STARTED" }); await load(); }
    catch (err) { alert(err.response?.data || "Could not create project"); }
  };

  const updateStatus = async p => {
    const status = window.prompt("Enter status: NOT STARTED, PLANNING, DEVELOPMENT, TESTING, COMPLETED", p.status);
    if (!status) return;
    try { await api.put(`/projects/${p.id}`, { ownerId: userId, status }); await load(); } catch { alert("Could not update status"); }
  };

  return (
    <div className="page">
      <h1>Project Collaboration</h1>
      <div className="projectLayout">
        <div className="card formCard">
          <h2>Create Project</h2>
          <form onSubmit={create}>
            <label>Project Name<input name="name" value={data.name} onChange={change} required /></label>
            <label>Description<textarea name="description" value={data.description} onChange={change} rows="4" /></label>
            <label>Technology<input name="technology" value={data.technology} onChange={change} placeholder="React, Spring Boot, MySQL" /></label>
            <label>Deadline<input name="deadline" value={data.deadline} onChange={change} placeholder="30-11-2026" /></label>
            <label>Status<select name="status" value={data.status} onChange={change}><option>NOT STARTED</option><option>PLANNING</option><option>DEVELOPMENT</option><option>TESTING</option><option>COMPLETED</option></select></label>
            <button className="primary full">Create Project</button>
          </form>
        </div>
        <div><h2>My Projects</h2>{projects.length === 0 && <div className="empty">No projects yet.</div>}{projects.map(p => <div className="projectCard" key={p.id}><h3>{p.name}</h3><p>{p.description}</p><p><b>Technology:</b> {p.technology || "-"}</p><p><b>Deadline:</b> {p.deadline || "-"}</p><span className="status development">{p.status}</span><button className="secondary small" onClick={() => updateStatus(p)}>Update Status</button></div>)}</div>
      </div>
    </div>
  );
}
