import React, { useState } from "react";
import { Input, Notification } from "../components/Input";
import { BigButton } from "../components/Button";
import { Container, Title } from "../components/Common";
import { Link } from "react-router-dom";
import { CardSelect, Select } from "../components/Select";
import CardList from "../components/CardList";
import { FlexContainer } from "../components/Common";
import styled from "styled-components";

import { dummy } from "../dummyData";

const Text = styled.div`
  font-size: 14px;
  color: #7c8986;
  text-decoration: underline;
`;

function MyPage({ cardsList }) {
  //? 원본 카드 리스트
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  // const userCards = dummy.userCards; //? cardId, repaymentDay
  // TODO: 초기 카드 목록은 유저카드 리스트에서 선택 안된 목록
  const [cards, setCards] = useState(cardsList);

  // TODO: 서버에서 받아온 cardId 값과 원본 카드리스트의 아이디값과 비교하여 있는 값만 출력
  // const userCards = cardsList.filter((obj) => obj.id === dummy.userCards.cardId)
  const [userCardList, setUserCardList] = useState([]);
  const [selected, setSelected] = useState("");
  const [wantCut, setWantCut] = useState(false);

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onPasswordChangeCheck = (e) => {
    setPasswordCheck(e.target.value);
  };

  const onCardChange = (e) => {
    setSelected(e.target.value);
    const newCards = cards.filter((obj) => e.target.value !== obj.name);
    setCards(newCards);

    const selectedData = cards.filter((obj) => obj.name === e.target.value);
    const newUserCardList = userCardList.concat(selectedData);
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
    console.log(e.target.value);
  };

  const onWantCutCardSelect = (e) => {
    setWantCut(!wantCut);
  };

  return (
    <Container>
      <Title margin="66px 0 50px 0" text="회원정보 수정" />
      <Input
        label="닉네임"
        type="text"
        placeholder="닉네임을 입력해주세요"
        margin="auto"
      />
      <Input label="이메일" type="text" margin="auto" readOnly={true} />
      {/* Password */}
      <Input
        marginLabel="18px 226px 0 0"
        label="비밀번호 수정"
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
      {password === "" ? null : password === passwordCheck ? (
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
            background={wantCut === true ? "#97bfb4" : "white"}
            color={wantCut === true ? "white" : "#97bfb4"}
            btnBackground={wantCut === true ? "#97bfb4" : "white"}
            xColor={wantCut === true ? "white" : "#97bfb4"}
          />
        ))}
      </FlexContainer>
      <Select
        padding="25px 238px 9px 0"
        label="카드 상환일"
        text="카드 상환일을 선택해주세요"
        options={["1일", "5일", "10일", "15일", "20일", "25일"]}
        onChange={onRepaymentDaySelect}
      />
      {/* Button */}
      <Link to="/login">
        <BigButton text="수정하기" margin="28px auto 12px auto" />
      </Link>
      <Link to="/">
        <BigButton
          text="취소"
          background="white"
          color="#97BFB4"
          border="1px solid #97BFB4"
          margin="0 auto 50px auto"
        />
      </Link>
      <Container>
        <Link to="/">
          <Text>회원탈퇴</Text>
        </Link>
      </Container>
    </Container>
  );
}

export default MyPage;
