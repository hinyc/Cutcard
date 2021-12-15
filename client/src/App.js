import { MainOutcomes } from './components/MainOutcomes';
import { MainIncomes } from './components/MainIncomse';
import './App.css';
import { useState } from 'react';

function App() {
  const [mainState, setMainState] = useState('income');

  const mainStateHandler = (target) => {
    setMainState(target);
  };

  return <div className="App">{mainState === 'outcome' ? <MainOutcomes mainStateHandler={mainStateHandler} /> : <MainIncomes mainStateHandler={mainStateHandler} />}</div>;
}

export default App;
