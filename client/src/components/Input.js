import React from 'react';
import styled from 'styled-components';

const InputStyle = styled.input`
  height: 1rem;
  width: 15rem;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #dbdbdb;
  border-radius: 0.25em;
  &:focus {
    outline: 1px solid #191919;
  }
`;

const LabelStyle = styled.div`
  padding: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
`;

function Input({ label, type, text, readOnly }) {
  return (
    <>
      <LabelStyle>{label}</LabelStyle>
      <InputStyle
        type={type}
        placeholder={text}
        spellCheck="false" // always
        readOnly={readOnly}
      />
    </>
  );
}

export default Input;
