import { useState } from 'react';
import styled from 'styled-components';
import { Input } from '../Input';
import { SmallButton } from '../Button';
import Select from '../Select';

//! Right
export const SubmitContainer = styled.div`
  box-sizing: border-box;
  /* border: solid 2px #97bfb4; */
  width: 300px;
  position: relative;
`;

export const SubHead = styled.div`
  border: solid 2px #97bfb4;
  color: #97bfb4;
  font-size: 26px;
  height: 70px;
  line-height: 70px;
`;

export const InputContainer = styled.div`
  width: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 100px;
`;

export const InputDate = styled.div`
  box-sizing: border-box;
  height: ${(props) => props.height || '40px'};
  width: ${(props) => props.width || '335px'};
  padding-left: 13px;
  font-size: 16px;
  border: 1px solid #bfc5c4;
  border-radius: 5px;
  color: #7c8986;
  text-align: left;
  line-height: 40px;

  ::-webkit-input-placeholder {
    color: #bfc5c4;
  } /* Chrome/Opera/Safari */
  ::-moz-placeholder {
    color: #bfc5c4;
  } /* Firefox 19+ */
  :-ms-input-placeholder {
    color: #bfc5c4;
  } /* IE 10+ */
  :-moz-placeholder {
    color: #bfc5c4;
  } /* Firefox 18- */

  &:focus {
    outline: 1px solid #7c8986;
  }
`;

const testIncomeSubmiter = (getDate, category, price) => {
  console.log(
    `{
      year: ${getDate.split('-')[0]},
      month: ${getDate.split('-')[1]},
      date: ${getDate.split('-')[2]},
      category: ${category},
      price: ${price}
    }`
  );
};
const testOutComeSubmiter = (getDate, category, cash, card, price) => {
  console.log(
    `{
      year: ${getDate.split('-')[0]},
      month: ${getDate.split('-')[1]},
      date: ${getDate.split('-')[2]},
      category: ${category},
      cash: ${cash},
      card: ${card},
      price: ${price}
    }`
  );
};

const AddInCome = ({ getDate }) => {
  const [category, setCategory] = useState('미선택');
  const [price, setPrice] = useState(0);

  const addValueHandler = (e) => {
    setPrice(e.target.value);
  };

  return (
    <>
      <InputContainer>
        <InputDate text="날짜" width={`200px`}>
          {getDate}
        </InputDate>
        <Select text="수입 카테고리" width={`200px`} options={['월급', '보너스', '기타']} />
        <Input text="금액을 입력해주세요" width={`200px`} onChange={addValueHandler} />
        <SmallButton //
          text="입력"
          width={`200px`}
          margin={`18px 0 0 0 `}
          onClick={() => testIncomeSubmiter(getDate, category, price)}
        />
      </InputContainer>
    </>
  );
};

const AddOutCome = ({ getDate }) => {
  const [category, setCategory] = useState('미선택');
  const [card, setCard] = useState('미선택');
  const [cash, setCash] = useState('true/false');
  const [price, setPrice] = useState(0);
  return (
    <>
      <InputContainer>
        <InputDate text="날짜" width={`200px`}>
          {getDate}
        </InputDate>
        <Select text="지출 카테고리" width={`200px`} options={['식비', '공과금', '기타']} />
        <Select text="현금, 카드" width={`200px`} options={['현금', '카드']} />
        <Select text="사용 카드" width={`200px`} options={['삼성', '하나']} />
        <Input text="금액을 입력해주세요" width={`200px`} />
        <SmallButton //
          text="입력"
          margin={`18px 0 0 0 `}
          width={`200px`}
          onClick={() => testOutComeSubmiter(getDate, category, card, cash, price)}
        />
      </InputContainer>
    </>
  );
};

const Submit = ({ mainState, getDate }) => {
  return (
    <>
      <SubmitContainer>
        {mainState === 'income' ? ( //
          <AddInCome getDate={getDate} />
        ) : mainState === 'outcome' ? (
          <AddOutCome getDate={getDate} />
        ) : null}
      </SubmitContainer>
    </>
  );
};

export default Submit;
