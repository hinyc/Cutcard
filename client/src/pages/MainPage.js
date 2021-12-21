import React from 'react';
import Main from '../components/Main/Main';
function MainPage({ isLogin }) {
  return (
    <div>
      <Main isLogin={isLogin} />
    </div>
  );
}

export default MainPage;
