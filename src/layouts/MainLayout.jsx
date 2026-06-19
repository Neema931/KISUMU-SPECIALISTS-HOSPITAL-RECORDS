import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

function MainLayout({ children }) {
  return (
    <div className="app-container">
      <Navbar />


      <div className="main-content">
        <Sidebar />

        <div className="page-content">
            {children}
        </div>
      </div>
    </div>
  );
}

export default MainLayout;