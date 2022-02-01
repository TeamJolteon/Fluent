/* eslint-disable react/display-name */
import VocabList from './VocabList';
import styled from 'styled-components';
import Search from './Search';

const Title = styled.h1`
  display: flex;
  justify-content: center;
`;
const Body = styled.div`
  font-family: 'Roboto', sans-serif;
  color: #444;
`;

export default function VLmain() {
  return (
    <Body>
      <Title>Your Words</Title>
      <Search />
      <VocabList />
    </Body>
  );
}
