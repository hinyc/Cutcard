import React from 'react';
import styled from 'styled-components';

const SelectStyle = styled.select`
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

const LabelStyle = styled.div`
  padding: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
`;

const Option = styled.option`
  color: #bfc5c4;
`;

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
