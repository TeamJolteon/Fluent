/* eslint-disable react/display-name */
import VocabList from './VocabList';
import styled from 'styled-components';
import Search from './Search';
import Sort from './Sort';

const Title = styled.h1`
  display: flex;
  justify-content: center;
`;

export default function VLmain() {
  return (
    <div>
      <Title>Your Words</Title>
      <Sort />
      <Search />
      <VocabList />
    </div>
  );
}
