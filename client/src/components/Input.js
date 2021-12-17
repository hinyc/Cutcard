import React from "react";
import styled from "styled-components";

const LabelStyle = styled.div`
  padding: 9px;
  font-size: 16px;
  font-weight: 700;
  color: #7c8986;
  margin: ${(props) => props.marginLabel || "18px 270px 0 0"};
`;

const InputStyle = styled.input`
  box-sizing: border-box;
  display: block;
  height: ${(props) => props.height || "40px"};
  width: ${(props) => props.width || "335px"};
  padding-left: 13px;
  font-size: 16px;
  border: 1px solid #bfc5c4;
  border-radius: 5px;
  color: #7c8986;
  margin: ${(props) => props.margin || "0"};

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

export function Input(props) {
  const {
    label,
    type,
    placeholder,
    readOnly,
    width,
    height,
    value,
    margin,
    marginLabel,
    onChange,
  } = props;

  return (
    <>
      <LabelStyle marginLabel={marginLabel}>{label}</LabelStyle>
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
      />
    </>
  );
}

export function LoginInput({ label, type, placeholder, readOnly, margin }) {
  return (
    <>
      <LabelStyle>{label}</LabelStyle>
      <InputStyle
        type={type}
        placeholder={placeholder}
        spellCheck="false" // always
        readOnly={readOnly}
        height="50px"
        margin={margin}
      />
    </>
  );
}
