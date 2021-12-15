import { MainOutcomes } from './components/MainOutcomes';
import { MainIncomes } from './components/MainIncomse';
import './App.css';
import { useState } from 'react';

function App() {
  const [mainState, setMainState] = useState('outcome');

  const mainStateHandler = () => {
    setMainState('income');
  };

  return <div className="App">{mainState === 'outcome' ? <MainOutcomes /> : <MainIncomes />}</div>;
}

export default App;
