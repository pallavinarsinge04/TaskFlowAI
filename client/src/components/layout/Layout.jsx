import Sidebar from "../Sidebar/Sidebar";
import "./Layout.css";

function Layout({ children }) {
  return (
    <>
      <Sidebar />

      <main className="main-content">
        {children}
      </main>
    </>
  );
}

export default Layout;