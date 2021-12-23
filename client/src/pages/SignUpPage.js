import React, { useState } from 'react';
import { Input, EmailInput, Notification } from '../components/Input';
import { BigButton } from '../components/Button';
import { Container, Title } from '../components/Common';
import { useNavigate } from 'react-router-dom';
import { CardSelect, Select } from '../components/Select';
import CardList from '../components/CardList';
import { FlexContainer } from '../components/Common';
import axios from 'axios';

function SignUpPage({ cardsList }) {
  const [nickname, setNickname] = useState('');

  const [email, setEmail] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isEmailBtnClick, setIsEmailBtnClick] = useState(false);
  const [emailExists, setEmailExists] = useState(true);

  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  const [cards, setCards] = useState(cardsList);
  const [userCardList, setUserCardList] = useState([]);
  const [selected, setSelected] = useState('');
  const [repaymentDay, setRepaymentDay] = useState(0);

  const navigate = useNavigate();

  const canClick =
    nickname !== '' &&
    !emailExists &&
    isEmail &&
    isEmailBtnClick &&
    password === passwordCheck &&
    password !== '' &&
    userCardList.length !== 0 &&
    repaymentDay !== 0;

  const onNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const onEmailChange = (e) => {
    setIsEmailBtnClick(false);
    const emailValidator =
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    const result = emailValidator.test(e.target.value);
    setIsEmail(result);
    setEmail(e.target.value);
  };

  const onEmailFocus = () => {
    setEmailFocused(true);
  };

  const emailExistsCheck = () => {
    setIsEmailBtnClick(true);
    axios
      .post(
        'http://localhost:4000/users/exists',
        { email: email },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setEmailExists(false);
        }
      })
      .catch(() => setEmailExists(true));
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onPasswordChangeCheck = (e) => {
    setPasswordCheck(e.target.value);
  };

  const onCardChange = (e) => {
    setSelected(e.target.value); // card name

    const newCards = cards.filter((obj) => e.target.value !== obj.name); // 선택 옵션
    setCards(newCards);

    const selectedData = cards.filter((obj) => obj.name === e.target.value); // [{id, name}]
    const selectedDataUpdate = { ...selectedData[0], isCut: false };
    const newUserCardList = userCardList.concat(selectedDataUpdate);
    setUserCardList(newUserCardList);
  };

  const onCardDelete = (id) => {
    const deletedCard = userCardList.filter((obj) => obj.id === id);
    const updateCards = cards.concat(deletedCard);
    updateCards.sort((a, b) => a.id - b.id);
    setCards(updateCards);

    const updateUserCardList = userCardList.filter((obj) => obj.id !== id);
    setUserCardList(updateUserCardList);
  };

  const onRepaymentDaySelect = (e) => {
    const value = e.target.value;
    const repaymentDay = value.slice(0, value.length - 1);
    setRepaymentDay(Number(repaymentDay));
  };

  const onWantCutCardSelect = (e) => {
    const value = e.target.innerText; // card name
    const selected = userCardList.filter((obj) => obj.name === value)[0];
    const index = userCardList.findIndex((obj) => obj.name === value);
    selected.isCut = !selected.isCut;
    userCardList[index] = selected;
    setUserCardList([...userCardList]);
  };

  const onSignUpClick = () => {
    axios
      .post(
        'http://localhost:4000/users/signup',
        {
          email: email,
          password: password,
          nickname: nickname,
          repaymentDay: repaymentDay,
          cards: userCardList.map((obj) => {
            return {
              id: obj.id,
              isCut: obj.isCut,
            };
          }),
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then((res) => {
        console.log(res);
        navigate('/login');
      });
  };

  const onCancelClick = () => {
    navigate('/');
  };

  return (
    <Container>
      <Title margin="66px 0 50px 0" text="회원가입" />
      <Input
        label="닉네임"
        type="text"
        placeholder="닉네임을 입력해주세요"
        margin="auto"
        onChange={onNicknameChange}
      />
      {/* Email */}
      <EmailInput
        label="이메일"
        type="text"
        placeholder="이메일을 입력해주세요"
        margin="0 17px 0 106px"
        value={email}
        onChange={onEmailChange}
        onFocus={onEmailFocus}
        onClick={emailExistsCheck}
        disabled={!isEmail}
        opacity={!isEmail ? '50%' : 0}
        hoverOpacity={!isEmail ? '50%' : 0}
        cursor={!isEmail ? 'default' : 'pointer'}
      />
      {emailFocused ? (
        email !== '' && isEmail ? (
          isEmailBtnClick ? (
            emailExists ? (
              <Notification color="#FF6B6B" margin="4px 160px 0 0">
                * 이미 존재하는 이메일입니다.
              </Notification>
            ) : (
              <Notification>* 사용 가능한 이메일입니다.</Notification>
            )
          ) : null
        ) : (
          <Notification color="#FF6B6B" margin="4px 175px 0 0">
            * 이메일 형식을 지켜주세요
          </Notification>
        )
      ) : null}
      {/* Password */}
      <Input
        marginLabel="18px 255px 0 0"
        label="비밀번호"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        margin="auto"
        value={password}
        onChange={onPasswordChange}
      />
      <Input
        marginLabel="18px 225px 0 0"
        label="비밀번호 확인"
        type="password"
        placeholder="비밀번호를 한번 더 입력해주세요"
        margin="auto"
        value={passwordCheck}
        onChange={onPasswordChangeCheck}
      />
      {password === '' ? null : password === passwordCheck ? (
        <Notification margin="4px 186px 0 0">
          * 비밀번호가 일치합니다.
        </Notification>
      ) : (
        <Notification color="#FF6B6B" margin="4px 152px 0 0">
          * 비밀번호가 일치하지 않습니다.
        </Notification>
      )}
      {/* Card */}
      <CardSelect
        label="카드 등록"
        text="카드를 선택해주세요"
        options={cards}
        onChange={onCardChange}
        margin="0"
      />
      <FlexContainer>
        {userCardList.map((obj) => (
          <CardList
            key={obj.id}
            text={obj.name}
            onTextClick={onWantCutCardSelect}
            onClick={() => onCardDelete(obj.id)}
            background={obj.isCut ? '#97bfb4' : 'white'}
            color={obj.isCut ? 'white' : '#97bfb4'}
            btnBackground={obj.isCut ? '#97bfb4' : 'white'}
            xColor={obj.isCut ? 'white' : '#97bfb4'}
          />
        ))}
      </FlexContainer>
      <Select
        label="카드 상환일"
        text="카드 상환일을 선택해주세요 (1개 선택 가능)"
        options={['1일', '5일', '10일', '15일', '20일', '25일']}
        onChange={onRepaymentDaySelect}
        margin="0"
      />
      {/* Button */}
      <BigButton
        text="가입하기"
        margin="28px auto 12px auto"
        onClick={onSignUpClick}
        disabled={!canClick}
        opacity={!canClick ? "50%" : 0} // 조건 ? "불허" : "허락"
        hoverOpacity={!canClick ? "50%" : 0}
        cursor={!canClick ? "default" : "pointer"}
      />
      <BigButton
        text="취소"
        background="white"
        color="#97BFB4"
        border="1px solid #97BFB4"
        margin="0 auto 50px auto"
        onClick={onCancelClick}
      />
    </Container>
  );
}

export default SignUpPage;
