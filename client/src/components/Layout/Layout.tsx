import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./layout.css";

const Layout: React.FC<{
  children: React.ReactElement;
}> = ({ children }) => {
  const theme = useAppSelector(
    (state: { theme: { value: string } }) => state.theme.value
  );
  console.log("theme", theme);
  return (
    <div className="layout_container">
      <Header />
      <div className="children_content">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
