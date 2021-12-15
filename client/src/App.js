import React from "react";
import Button from "./components/Button";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Input from "./components/Input";

function App() {
  return (
    <>
      <Navbar />
      <Button text={"버튼"} />
      <Input
        label={"라벨"}
        type={"text"}
        text={"플레이스홀더"}
        readOnly={false}
      />
      <Footer />
    </>
  );
}

export default App;
