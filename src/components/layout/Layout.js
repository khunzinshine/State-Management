import "./layout.css";

import React, { useContext } from "react";

import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  const {
    logout,
    user: { user }
  } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="s-layout">
      <div className="s-layout__sidebar">
        <a className="s-sidebar__trigger" href="#0">
          <i className="pi-align-justify"></i>
        </a>

        <nav className="s-sidebar__nav">
          <div className="s-header">State Management</div>
          <div className="s-navigation">Welcome - {user}!</div>
          <ul>
            <li>
              <Link className="s-sidebar__nav-link" to="/team/list">
                <i className="pi pi-fw pi-flag"></i>
                <em>Teams</em>
              </Link>
            </li>
            <li>
              <Link className="s-sidebar__nav-link" to="/player/list">
                <i className="pi pi-fw pi-list"></i>
                <em>Players</em>
              </Link>
            </li>
            <li>
              <Link
                onClick={handleLogout}
                className="s-sidebar__nav-link"
                to="/"
              >
                <i className="pi pi-fw pi-power-off"></i>
                <em>Logout</em>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <main className="s-layout__content">{children}</main>
    </div>
  );
};

export default React.memo(Layout);
