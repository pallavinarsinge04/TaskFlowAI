import Sidebar from "./Sidebar";
import { useState } from "react";

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="app-layout">

      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className={`main-content ${collapsed ? "collapsed" : ""}`}>
        {children}
      </div>

    </div>
  );
}

export default Layout;