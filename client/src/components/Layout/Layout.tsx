import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./layout.css";

const Layout: React.FC<{
  children: React.ReactElement;
  isLoggedIn: boolean;
}> = ({ children, isLoggedIn }) => (
  <div className="layout_container">
    <Header isLoggedIn />
    <div style={{ flex: 1 }}>{children}</div>
    <Footer />
  </div>
);

export default Layout;
