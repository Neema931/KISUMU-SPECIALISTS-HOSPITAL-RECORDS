import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import api from "../../services/api";

function Assignments() {
  const [users, setUsers] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [form, setForm] = useState({ user_id: "", start_date: "", end_date: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (!user || user.role !== "ceo") {
      setError("Only CEO users may manage weekly assignments.");
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [uRes, aRes] = await Promise.all([
        api.get("/auth/users"),
        api.get("/reports/incharge"),
      ]);

      setUsers(uRes.data || []);
      setAssignments(aRes.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load data (requires CEO)");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post("/reports/incharge", form);
      setForm({ user_id: "", start_date: "", end_date: "" });
      fetchData();
    } catch (err) {
      console.error(err);
      setError("Failed to create assignment.");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this assignment?")) return;
    try {
      await api.delete(`/reports/incharge/${id}`);
      fetchData();
    } catch (err) {
      console.error(err);
      setError("Failed to delete assignment.");
    }
  };

  if (error && (!user || user.role !== "ceo")) {
    return (
      <MainLayout>
        <div style={{ padding: 20 }}>
          <h2>Weekly Incharge Assignments</h2>
          <p style={{ color: "var(--error)" }}>{error}</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div style={{ padding: 20 }}>
        <h2>Weekly Incharge Assignments</h2>

        {error && <p style={{ color: "var(--error)", marginBottom: 16 }}>{error}</p>}

        <form onSubmit={handleCreate} style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", marginBottom: 16 }}>
          <select value={form.user_id} onChange={(e) => setForm({ ...form, user_id: e.target.value })} required>
            <option value="">Select user</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>{u.name} — {u.department}</option>
            ))}
          </select>
          <input type="date" value={form.start_date} onChange={(e) => setForm({ ...form, start_date: e.target.value })} required />
          <input type="date" value={form.end_date} onChange={(e) => setForm({ ...form, end_date: e.target.value })} required />
          <button type="submit" className="submit-btn">Create</button>
        </form>

      {loading ? <p>Loading...</p> : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>User</th>
              <th>Department</th>
              <th>Start</th>
              <th>End</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((a) => (
              <tr key={a.id}>
                <td>{a.user_name}</td>
                <td>{users.find(u=>u.id===a.user_id)?.department || "-"}</td>
                <td>{a.start_date}</td>
                <td>{a.end_date}</td>
                <td><button onClick={() => handleDelete(a.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </MainLayout>
  );
}

export default Assignments;
