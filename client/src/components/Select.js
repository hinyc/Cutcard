import React from "react";
import styled from "styled-components";
import { Notification } from "./Input";

const SelectStyle = styled.select`
  box-sizing: border-box;
  height: ${(props) => props.height || "40px"};
  width: ${(props) => props.width || "335px"};
  padding: 0 13px;
  font-size: 16px;
  border: ${(props) => props.border || `1px solid #bfc5c4`};
  border-radius: 5px;
  color: #7c8986;
  margin: ${(props) => props.margin || "0 0 27px 0"};
  transition: ${(props) => props.transition || "0"};

  &:focus {
    outline: 1px solid #7c8986;
  }

  @media only screen and (max-width: 910px) {
    background-color: rgba(0, 0, 0, 0);
  }
`;

const LabelStyle = styled.div`
  color: #7c8986;
  padding: ${(props) => props.padding || "27px 250px 9px 0"};
  font-size: 16px;
  font-weight: 700;
`;

const Option = styled.option``;

export function Select(props) {
  const {
    label, //
    text,
    options,
    width,
    height,
    onChange,
    value,
    margin,
    padding,
    thisHeight,
    border,
    transition,
  } = props;
  return (
    <>
      <LabelStyle padding={padding}>{label}</LabelStyle>
      <SelectStyle
        width={width}
        hidden={height}
        height={thisHeight}
        onChange={onChange}
        value={value}
        margin={margin}
        border={border}
        transition={transition}
      >
        <Option>{text}</Option>
        {options.map((option, index) => (
          <Option key={index} value={option}>
            {option}
          </Option>
        ))}
      </SelectStyle>
    </>
  );
}

export function CardSelect(props) {
  const {
    label, //
    text,
    options,
    width,
    height,
    onChange,
    value,
    margin,
  } = props;
  return (
    <>
      <LabelStyle>{label}</LabelStyle>
      <SelectStyle
        width={width}
        hidden={height}
        onChange={onChange}
        value={value}
        margin={margin}
      >
        <Option>{text}</Option>
        {options.map((option) => (
          <Option key={option.id} value={option.name}>
            {option.name}
          </Option>
        ))}
      </SelectStyle>
      <Notification color="#7c8986" margin="4px 35px 0 0">
        * ????????? ???????????? ?????? ????????? ???????????? ?????? ???????????????.
      </Notification>
      <Notification color="#7c8986" margin="0 97px 0 0">
        ????????? ??????????????? ????????? ??????????????????.
      </Notification>
    </>
  );
}

export function InputSelect(props) {
  const {
    text, //
    options,
    width,
    height,
    onChange,
    value,
    margin,
  } = props;
  return (
    <>
      <SelectStyle
        width={width}
        hidden={height}
        onChange={onChange}
        value={value}
        margin={margin}
      >
        <Option>{text}</Option>
        {options.map((option, index) => (
          <Option key={index} value={option}>
            {option}
          </Option>
        ))}
      </SelectStyle>
    </>
  );
}
