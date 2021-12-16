import React from "react";
import Button from "./components/Button";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Input from "./components/Input";

import { MainOutcomes } from "./components/MainOutcomes";
import { MainIncomes } from "./components/MainIncomse";
import "./App.css";
import { useState } from "react";
import { Calendar } from "./components/Calendar";

function App() {
  const [mainState, setMainState] = useState("income");

  const mainStateHandler = (target) => {
    setMainState(target);
  };

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
      <div className="App">
        {mainState === "outcome" ? (
          <MainOutcomes mainStateHandler={mainStateHandler} />
        ) : (
          <MainIncomes mainStateHandler={mainStateHandler} />
        )}
      </div>
      <Footer />
    </>
  );
}

export default App;
