import React from "react";
import styled from "styled-components";

const SelectStyle = styled.select`
  box-sizing: border-box;
  height: ${(props) => props.height || "40px"};
  width: ${(props) => props.width || "335px"};
  padding: 0 13px;
  font-size: 16px;
  border: 1px solid #bfc5c4;
  border-radius: 5px;
  color: #bfc5c4;
  margin-bottom: 27px;

  &:focus {
    outline: 1px solid #7c8986;
  }
`;

const LabelStyle = styled.div`
  color: #7c8986;
  padding: 27px 250px 9px 0;
  font-size: 16px;
  font-weight: 700;
  /* margin: "100px 270px 0 0"; */
`;

const Option = styled.option``;

function Select({ label, text, options, width, height }) {
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
