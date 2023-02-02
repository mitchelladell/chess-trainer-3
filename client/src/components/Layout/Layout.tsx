import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./layout.css";

const Layout: React.FC<{
  children: React.ReactElement;
}> = ({ children }) => (
  <div className="layout_container">
    <Header />
    <div className="children_content">{children}</div>
    <Footer />
  </div>
);

export default Layout;
