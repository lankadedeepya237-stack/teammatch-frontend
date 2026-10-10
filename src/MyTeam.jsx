import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "./api";

export default function MyTeam() {
  const userId = Number(localStorage.getItem("userId"));
  const [members, setMembers] = useState([]);
  useEffect(() => { api.get(`/requests/team/${userId}`).then(r => setMembers(r.data)).catch(() => {}); }, [userId]);

  return (
    <div className="page">
      <div className="sectionTitle"><div><h1>My Team</h1><p className="muted">Students connected through accepted team requests.</p></div><Link className="primary" to="/project">Project Details</Link></div>
      <div className="teamGrid">
        {members.map(m => <div className="memberCard" key={m.id}><div className="avatar">{m.name?.charAt(0).toUpperCase()}</div><h3>{m.name}</h3><p>{m.department}</p><p>{m.studentId}</p><p>{m.email}</p></div>)}
      </div>
    </div>
  );
}
