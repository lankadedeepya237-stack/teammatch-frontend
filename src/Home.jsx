import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="hero page">
      <div className="heroIcon">👥</div>
      <h1>TeamMatch</h1>
      <h2>Project Team Finder</h2>
      <p>Find the right people • Share your skills • Build amazing projects</p>
      <div className="heroActions">
        <Link className="primary" to="/register">Get Started</Link>
        <Link className="secondary" to="/login">Login</Link>
      </div>
      <div className="featureGrid">
        <div className="feature"><b>👤 Profile</b><span>Show your skills and interests</span></div>
        <div className="feature"><b>🔎 Search</b><span>Find students by skill and department</span></div>
        <div className="feature"><b>🤝 Team</b><span>Send and accept team requests</span></div>
        <div className="feature"><b>📊 Project</b><span>Track your project progress</span></div>
      </div>
    </div>
  );
}
