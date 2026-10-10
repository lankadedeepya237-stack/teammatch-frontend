import { useEffect, useState } from "react";
import api from "./api";

export default function Requests() {
  const userId = Number(localStorage.getItem("userId"));
  const [received, setReceived] = useState([]);
  const [sent, setSent] = useState([]);

  const load = async () => {
    const [a, b] = await Promise.all([api.get(`/requests/received/${userId}`), api.get(`/requests/sent/${userId}`)]);
    setReceived(a.data); setSent(b.data);
  };
  useEffect(() => { load().catch(() => {}); }, [userId]);

  const action = async (id, type) => {
    try { await api.put(`/requests/${id}/${type}`); await load(); } catch (err) { alert(err.response?.data || "Action failed"); }
  };

  return (
    <div className="page">
      <h1>Team Requests</h1>
      <div className="requestSection"><h2>Received</h2>
        {received.length === 0 ? <div className="empty">No received requests.</div> : received.map(r => <div className="requestCard" key={r.id}><div><b>{r.senderName}</b><p>{r.message}</p><small>Status: {r.status}</small></div>{r.status === "PENDING" && <div><button className="accept" onClick={() => action(r.id, "accept")}>Accept</button><button className="reject" onClick={() => action(r.id, "reject")}>Reject</button></div>}</div>)}
      </div>
      <div className="requestSection"><h2>Sent</h2>
        {sent.length === 0 ? <div className="empty">No sent requests.</div> : sent.map(r => <div className="requestCard" key={r.id}><div><b>{r.receiverName}</b><p>{r.message}</p></div><span className={`status ${r.status.toLowerCase()}`}>{r.status}</span></div>)}
      </div>
    </div>
  );
}
