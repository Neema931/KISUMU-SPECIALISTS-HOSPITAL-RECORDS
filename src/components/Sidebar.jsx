import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Sidebar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0 12px'}}>
        <button onClick={() => setCollapsed(!collapsed)} style={{background:'transparent',border:'none',color:'var(--text-light)'}}>{collapsed ? '➡' : '⬅'}</button>
      </div>
      <nav>
        <ul>
          <li><Link to="/dashboard"> Dashboard</Link></li>
          <li><Link to="/outpatient"> Outpatient</Link></li>
          <li><Link to="/maternity">Maternity</Link></li>
          <li><Link to="/medsurg"> MedSurg</Link></li>
          <li><Link to="/theatre">Theatre</Link></li>
          <li><Link to="/radiology">Radiology</Link></li>
          <li><Link to="/physiotherapy">Physiotherapy</Link></li>
          <li><Link to="/laboratory">Laboratory</Link></li>
          <li><Link to="/hospital">Hospital Summary</Link></li>
          <li><Link to="/reports">Reports Archive</Link></li>
          {user && user.role === "ceo" && (
            <>
              <li><Link to="/users">👥 Users</Link></li>
              <li><Link to="/admin">⚙️ Settings</Link></li>
            </>
          )}
          <li><button className="logout-btn" type="button" onClick={handleLogout}>Logout</button></li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;