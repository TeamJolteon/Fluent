import styled from 'styled-components';
import Link from 'next/link';

const Title = styled.h1`
  display: flex;
  justify-content: center;
`;
const Body = styled.div`
  font-family: 'Roboto', sans-serif;
  color: #444;
`;
const RoutesDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;
const Subheader = styled.h2`
  display: flex;
  justify-content: center;
`;
const RouteButton = styled.button`
  width: 500px;
  height: 50px;
  margin: 10px;
  font-size: large;
`;

export default function UserPortalComponent() {
  return (
    <Body>
      <Title>Welcome Back</Title>
      <Subheader>How would you like to learn today...</Subheader>
      <RoutesDiv>
        <RouteButton>
          <Link href='/articles'>Read Articles</Link>
        </RouteButton>
        <RouteButton>
          <Link href='/flashcards'>Review Flash Cards</Link>
        </RouteButton>
        <RouteButton>
          <Link href='/vocab'>Review Vocab List</Link>
        </RouteButton>
      </RoutesDiv>
    </Body>
  );
}
