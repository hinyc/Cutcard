import React from "react";
import Button from "./components/Button";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Button text={"버튼1"} />
      <Footer />
    </>
  );
}

export default App;
