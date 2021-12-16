import React from 'react';
import { SmallButton, BigButton } from './components/Button';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { Input, LoginInput } from './components/Input';
import Main from './components/Main/Main';

import './App.css';
import { useState } from 'react';

function App() {
  // main pages ; income, outcome changer
  const [mainState, setMainState] = useState('income');

  const mainStateHandler = (target) => {
    setMainState(target);
  };

  // dumy data
  const dumy = {
    inComes: [
      {
        date: '2021-12-14',
        category: 'salary',
        money: 5000000,
      },
      {
        date: '2021-12-14',
        category: 'bonus',
        money: 1000000,
      },
    ],
    outComes: [
      {
        date: '2021-12-3',
        isCash: false,
        card: 'shinhan',
        money: 50000,
      },
      {
        date: '2021-12-14',
        isCash: true,
        card: null,
        money: 400000,
      },
      {
        date: '2021-12-26',
        isCash: false,
        card: 'samsung',
        money: 53000,
      },
    ],
  };
  const dumyOutcome = {};

  return (
    <>
      <Navbar />
      <SmallButton text={'작은 버튼'} />
      <BigButton text={'큰 버튼'} />
      <Input label={'라벨'} type={'text'} text={'플레이스홀더'} readOnly={false} />
      <LoginInput label={'로그인'} type={'text'} text={'플레이스홀더'} readOnly={false} />
      <div className="App">
        <Main />
      </div>
      <Footer />
    </>
  );
}

export default App;
