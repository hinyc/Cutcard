import React from 'react';
import styled from 'styled-components';

const LabelStyle = styled.div`
  padding: 9px 13px;
  font-size: 16px;
  font-weight: 700;
  color: #7c8986;
`;

const InputStyle = styled.input`
  box-sizing: border-box;
  height: ${(props) => props.height || '40px'};
  width: ${(props) => props.width || '335px'};
  padding-left: 13px;
  font-size: 16px;
  border: 1px solid #bfc5c4;
  border-radius: 5px;
  color: #7c8986;

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

export function Input({ label, type, text, readOnly, width, height }) {
  return (
    <>
      <LabelStyle>{label}</LabelStyle>
      <InputStyle
        type={type}
        placeholder={text}
        spellCheck="false" // always
        readOnly={readOnly}
        width={width}
        height={height}
      />
    </>
  );
}

export function LoginInput({ label, type, text, readOnly }) {
  return (
    <>
      <LabelStyle>{label}</LabelStyle>
      <InputStyle
        type={type}
        placeholder={text}
        spellCheck="false" // always
        readOnly={readOnly}
        height="50px"
      />
    </>
  );
}
