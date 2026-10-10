import { Link } from "react-router-dom";

export default function Dashboard() {
  const name = localStorage.getItem("userName") || "Student";
  return (
    <div className="page">
      <div className="dashboardHead">
        <div><p className="eyebrow">TEAMMATCH</p><h1>Welcome, {name} 👋</h1><p>Build your profile, find compatible teammates and collaborate.</p></div>
      </div>
      <div className="dashboardGrid">
        <Link className="dashCard" to="/profile"><span>📝</span><h3>Create / Update Profile</h3><p>Add skills, interests, bio and availability.</p></Link>
        <Link className="dashCard" to="/students"><span>🔎</span><h3>Find Teammates</h3><p>Search students by skill, interest or department.</p></Link>
        <Link className="dashCard" to="/requests"><span>✉️</span><h3>Team Requests</h3><p>View, accept or reject requests.</p></Link>
        <Link className="dashCard" to="/team"><span>👥</span><h3>My Team</h3><p>See students connected through accepted requests.</p></Link>
        <Link className="dashCard" to="/project"><span>📊</span><h3>Project Collaboration</h3><p>Create and update your project details.</p></Link>
      </div>
    </div>
  );
}
