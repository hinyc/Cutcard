import React from 'react';
import styled from 'styled-components';

export const Container = styled.div`
  text-align: left;
  width: 100px;
`;
export const Item = ({ item }) => {
  return <Container>{item}</Container>;
};

export default Item;
