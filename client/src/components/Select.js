import React from 'react';
import styled from 'styled-components';

const SelectStyle = styled.select`
  box-sizing: border-box;
  height: ${(props) => props.height || '40px'};
  width: ${(props) => props.width || '335px'};
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

const Option = styled.option``;

function Select({ label, text, readOnly, options, width, height }) {
  return (
    <>
      <LabelStyle>{label}</LabelStyle>
      <SelectStyle width={width} hidden={height}>
        <Option value="value" defaultValue>
          {text}
        </Option>
        {options.map((option, index) => (
          <Option key={index} value={option}>
            {option}
          </Option>
        ))}
      </SelectStyle>
    </>
  );
}

export default Select;
