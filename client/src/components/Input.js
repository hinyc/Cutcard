import React from 'react';
import styled from 'styled-components';

const LabelStyle = styled.div`
  padding: 9px;
  font-size: 16px;
  font-weight: 700;
  color: #7c8986;
  margin: ${(props) => props.marginLabel || '18px 270px 0 0'};
`;

const InputStyle = styled.input`
  box-sizing: border-box;
  display: block;
  height: ${(props) => props.height || '40px'};
  width: ${(props) => props.width || '335px'};
  padding-left: 13px;
  font-size: 16px;
  border: 1px solid #bfc5c4;
  border-radius: 5px;
  color: #7c8986;
  margin: ${(props) => props.margin || '0'};
  bottom: ${(props) => props.bottom || '0'};
  position: ${(props) => props.position || 'none'};

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

const EmailExist = styled.button`
  color: white;
  width: 89px;
  height: 32px;
  box-sizing: border-box;
  outline: 0;
  border: 0;
  background-color: #97bfb4;
  font-size: 16px;
  border-radius: 5px;
  opacity: ${(props) => props.opacity || '100%'};

  &:hover {
    cursor: ${(props) => props.cursor || 'pointer'};
    opacity: ${(props) => props.hoverOpacity || '80%'};
  }

  &:active {
    cursor: pointer;
    opacity: 95%;
  }
`;

const EmailContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const Notification = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: ${(props) => props.color || '#6B95FF'};
  margin: ${(props) => props.margin || '4px 170px 0 0'};
`;

export function EmailInput(props) {
  const { label, type, placeholder, readOnly, width, height, margin, marginLabel, value, onChange, onFocus, onClick, disabled, opacity, hoverOpacity, cursor } = props;

  return (
    <>
      <LabelStyle marginLabel={marginLabel}>{label}</LabelStyle>
      <EmailContainer>
        <InputStyle
          type={type}
          placeholder={placeholder}
          spellCheck="false" // always
          readOnly={readOnly}
          width={width}
          height={height}
          margin={margin}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
        />
        <EmailExist onClick={onClick} disabled={disabled} opacity={opacity} hoverOpacity={hoverOpacity} cursor={cursor}>
          중복 확인
        </EmailExist>
      </EmailContainer>
    </>
  );
}

export function Input(props) {
  const { label, type, placeholder, readOnly, width, height, value, margin, marginLabel, onChange, min, max, position, bottom } = props;

  return (
    <>
      <LabelStyle marginLabel={marginLabel}>{label}</LabelStyle>
      <InputStyle
        type={type}
        min={min}
        max={max}
        placeholder={placeholder}
        spellCheck="false" // always
        readOnly={readOnly}
        width={width}
        height={height}
        margin={margin}
        value={value}
        onChange={onChange}
        position={position}
        bottom={bottom}
      />
    </>
  );
}

export function LoginInput({ onChange }) {
  return (
    <>
      <LabelStyle>이메일</LabelStyle>
      <InputStyle
        type="text"
        placeholder="이메일을 입력해주세요"
        spellCheck="false" // always
        height="50px"
        margin="auto"
        onChange={onChange}
      />
    </>
  );
}

export function PasswordInput({ onChange, onKeyPress }) {
  return (
    <>
      <LabelStyle marginLabel="18px 258px 0 0">비밀번호</LabelStyle>
      <InputStyle
        type="password"
        placeholder="비밀번호를 입력해주세요"
        spellCheck="false" // always
        height="50px"
        margin="0 auto"
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
    </>
  );
}

export const PriceInput = (props) => {
  const { type, placeholder, readOnly, width, height, value, margin, onChange, min, max, position, bottom } = props;
  return (
    <InputStyle
      type={type}
      min={min}
      max={max}
      placeholder={placeholder}
      spellCheck="false" // always
      readOnly={readOnly}
      width={width}
      height={height}
      margin={margin}
      value={value}
      onChange={onChange}
      position={position}
      bottom={bottom}
    />
  );
};
