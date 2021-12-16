import React from 'react';
import styled from 'styled-components';
import Item from './Item';
import Money from './Money';

export const Container = styled.div`
  border: solid 2px #97bfb4;
  display: flex;
  justify-content: space-between;
`;

export const Content = ({ item, money }) => {
  return (
    <>
      <Container>
        <Item item={item} />
        <Money money={money} />
      </Container>
    </>
  );
};

export default Content;
