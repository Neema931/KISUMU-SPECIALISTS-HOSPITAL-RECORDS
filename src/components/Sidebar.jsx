import { Link } from "react-router-dom";



function Sidebar() {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>

          <li>
            <Link to="/submit-record">Submit Record</Link>
          </li>

          <li>
            <Link to="/view-records">View Records</Link>
          </li>

          <li>
            <Link to="/">Logout</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;