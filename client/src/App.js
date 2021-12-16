import React from 'react';
import { SmallButton, BigButton } from './components/Button';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { Input, LoginInput } from './components/Input';
import Main from './components/Main/Main';

import './App.css';
import { useState } from 'react';

function App() {
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
