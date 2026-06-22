import MainLayout from "../../layouts/MainLayout";
import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <MainLayout>
      <div style={{ padding: 20 }}>
        <h1>Admin Dashboard</h1>
        <p>Use this section to manage who is in charge of each department each week.</p>
        <div style={{ marginTop: 20 }}>
          <Link to="/admin/assignments" className="submit-btn">
            Manage Weekly Assignments
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}

export default AdminDashboard;
