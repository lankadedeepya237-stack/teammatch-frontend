import { useEffect, useState } from "react";
import api from "./api";

export default function Profile() {
  const userId = Number(localStorage.getItem("userId"));
  const [data, setData] = useState({ userId, skills: "", interests: "", bio: "", availability: "" });

  useEffect(() => {
    api.get(`/profile/${userId}`).then(res => setData(res.data)).catch(() => {});
  }, [userId]);

  const change = e => setData({ ...data, [e.target.name]: e.target.value });

  const save = async e => {
    e.preventDefault();
    try {
      const res = await api.post("/profile", { ...data, userId });
      setData(res.data);
      alert("Profile saved successfully");
    } catch (err) { alert(err.response?.data || "Could not save profile"); }
  };

  return (
    <div className="page formPage">
      <div className="card formCard wide">
        <h2>My Profile</h2>
        <p className="muted">Show teammates what you can contribute.</p>
        <form onSubmit={save}>
          <label>Skills<input name="skills" value={data.skills || ""} onChange={change} placeholder="Java, React, MySQL" /></label>
          <label>Interests<input name="interests" value={data.interests || ""} onChange={change} placeholder="AI, Web Development" /></label>
          <label>Availability<select name="availability" value={data.availability || ""} onChange={change}><option value="">Select</option><option>Morning</option><option>Afternoon</option><option>Evening</option><option>Flexible</option></select></label>
          <label>Short Bio<textarea name="bio" value={data.bio || ""} onChange={change} rows="5" placeholder="Tell teammates about your goals..." /></label>
          <button className="primary full">Save Profile</button>
        </form>
      </div>
    </div>
  );
}
