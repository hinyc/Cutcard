import React, { useState } from 'react';
import { Input, Notification } from '../components/Input';
import { BigButton } from '../components/Button';
import { Container, Title } from '../components/Common';
import { Link } from 'react-router-dom';
import { CardSelect, Select } from '../components/Select';
import CardList from '../components/CardList';
import { FlexContainer } from '../components/Common';
import styled from 'styled-components';
import axios from 'axios';

const Text = styled.div`
  font-size: 14px;
  color: #7c8986;
  text-decoration: underline;
`;

function MyPage({ isLogin, setIsLogin, accessToken, setAccessToken, cardsList, userInfo, setUserInfo, userCards, setUserCards }) {
  const [nickname, setNickname] = useState('');

  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  console.log('MY Page', userCards);
  const [selected, setSelected] = useState('');
  const notSelectedCards = cardsList.filter((obj) => userCards.map((obj) => obj.cardId).includes(obj.id) === false);
  const [cards, setCards] = useState(notSelectedCards);
  const selectedCards = cardsList.filter((obj) => userCards.map((obj) => obj.cardId).includes(obj.id) === true);
  const [userCardList, setUserCardList] = useState(selectedCards);
  const [repaymentday, setRepaymentday] = useState(0);

  const onNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onPasswordChangeCheck = (e) => {
    setPasswordCheck(e.target.value);
  };

  const onCardChange = (e) => {
    //* 카드 옵션에서 선택된 옵션 제외
    setSelected(e.target.value); // card name
    const newCards = cards.filter((obj) => e.target.value !== obj.name);
    setCards(newCards);

    //* 선택된 카드 유저 리스트에 추가
    const selectedData = cards.filter((obj) => obj.name === e.target.value);
    const inputData = {
      id: userCardList.length, //
      cardId: selectedData[0].id,
      cardName: selectedData[0].name,
      isCut: false,
    };
    const newUserCardList = userCardList.concat(inputData);
    setUserCardList(newUserCardList);
  };

  const onCardDelete = (cardId) => {
    const deletedCard = userCardList.filter((obj) => obj.cardId === cardId);

    //* 삭제한 카드 리스트에 추가
    const updateCards = cards.concat({
      id: deletedCard[0].cardId,
      name: deletedCard[0].cardName,
    });
    updateCards.sort((a, b) => a.id - b.id);
    setCards(updateCards);

    //* 삭제한 카드 유저 목록에서 제거
    const updateUserCardList = userCardList.filter((obj) => obj.cardId !== cardId);
    setUserCardList(updateUserCardList);
  };

  const onRepaymentDaySelect = (e) => {
    const value = e.target.value;
    const repaymentDay = value.slice(0, value.length - 1);
    userCardList.map((obj) => (obj.repaymentDay = Number(repaymentDay)));
    setRepaymentday(Number(repaymentDay));
  };

  const onWantCutCardSelect = (obj) => {
    obj.isCut = !obj.isCut;
    setUserCardList(userCardList);
  };

  const onUpdateClick = () => {
    axios
      .patch(
        'http://localhost:4000/users/userinfo',
        {
          nickname: nickname,
          password: password,
          repaymentDay: repaymentday,
          cards: userCardList.map((obj) => {
            return {
              id: obj.id,
              isCut: false, //!
            };
          }),
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => console.log(res));
  };

  const onSignOutClick = () => {
    axios
      .delete('http://localhost:4000/users/userinfo', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log(res);
        setAccessToken('');
        setUserCards([]);
        setUserInfo({});
      })
      .then(() => {
        setIsLogin(false);
      });
  };

  return (
    <Container>
      <Title margin="66px 0 50px 0" text="회원정보 수정" />
      <Input label="닉네임" type="text" placeholder={userInfo.nickname} margin="auto" onChange={onNicknameChange} />
      <Input label="이메일" type="text" margin="auto" readOnly={true} value={userInfo.email} />
      {/* Password */}
      <Input
        marginLabel="18px 226px 0 0" //
        label="비밀번호 수정"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        margin="auto"
        value={password}
        // onChange={onPasswordChange}
      />
      <Input
        marginLabel="18px 225px 0 0" //
        label="비밀번호 확인"
        type="password"
        placeholder="비밀번호를 한번 더 입력해주세요"
        margin="auto"
        value={passwordCheck}
        // onChange={onPasswordChangeCheck}
      />
      {password === '' ? null : password === passwordCheck ? (
        <Notification margin="4px 186px 0 0">* 비밀번호가 일치합니다.</Notification>
      ) : (
        <Notification color="#FF6B6B" margin="4px 152px 0 0">
          * 비밀번호가 일치하지 않습니다.
        </Notification>
      )}
      {/* Card */}
      <CardSelect label="카드 등록" text="카드를 선택해주세요" options={cards} onChange={onCardChange} margin="0" />
      <FlexContainer>
        {userCardList.map((obj) => (
          <CardList
            key={obj.id}
            text={obj.name}
            onTextClick={() => onWantCutCardSelect(obj)}
            onClick={() => onCardDelete(obj.cardId)}
            background={obj.isCut ? '#97bfb4' : 'white'}
            color={obj.isCut ? 'white' : '#97bfb4'}
            btnBackground={obj.isCut ? '#97bfb4' : 'white'}
            xColor={obj.isCut ? 'white' : '#97bfb4'}
          />
        ))}
      </FlexContainer>
      <Select
        padding="25px 238px 9px 0"
        label="카드 상환일"
        text="카드 상환일을 선택해주세요 (1개 선택 가능)"
        options={['1일', '5일', '10일', '15일', '20일', '25일']} //! 해당없음?
        onChange={onRepaymentDaySelect}
      />
      {/* Button */}
      <Link to="/login">
        <BigButton text="수정하기" margin="28px auto 12px auto" onClick={onUpdateClick} />
      </Link>
      <Link to="/">
        <BigButton text="취소" background="white" color="#97BFB4" border="1px solid #97BFB4" margin="0 auto 50px auto" />
      </Link>
      <Container>
        <Link to="/">
          <Text onClick={onSignOutClick}>회원탈퇴</Text>
        </Link>
      </Container>
    </Container>
  );
}

export default MyPage;
