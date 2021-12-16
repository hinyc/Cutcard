import React from 'react';
import styled from 'styled-components';

export const Container = styled.div`
  color: #7c8986;
  position: absolute;
  top: 30px;
  left: 49px;
`;

export const SubTitle = ({ title }) => {
  return <Container>{title}</Container>;
};

export default SubTitle;
