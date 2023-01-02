import React, { useEffect } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./App.css";
const App = () => {
  /*   useEffect(() => {
    const header = document.getElementById("header");
    const footer = document.getElementById("footer");
    const main = document.getElementById("main");

    if (header && footer && main) {
      const combinedHeight = header.offsetHeight + footer.offsetHeight;

      main.style.minHeight = `calc(100vh - ${combinedHeight}px)`;
    }
  }, []); */

  return (
    <div className="App">
      <Header />
      <Footer />
    </div>
  );
};

export default App;
