import React from "react";
import { withRouter, NavLink } from "react-router-dom";

function Header() {
    return (
        <div className="header">
            <div className="flex">
                <img src="/logo.png" alt="Hooks News Logo" className="logo" />
                <NavLink to="/" className="header-title">
                    Hook News
                </NavLink>
                <NavLink to="/" className="header-link">
                    new
                </NavLink>
                <div className="divider">|</div>
                <NavLink to="/top" className="header-link">
                    top
                </NavLink>
                <div className="divider">|</div>
                <NavLink to="/search" className="header-link">
                    search
                </NavLink>
                <div className="divider">|</div>
                <NavLink to="/create" className="header-link">
                    submit
                </NavLink>
            </div>
            <div className="flex">
              <NavLink to="/login" className="header-link">
                    login
              </NavLink>
            </div>
        </div>
    );
}

export default withRouter(Header);
