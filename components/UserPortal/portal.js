import styled from 'styled-components';
import Link from 'next/link';

const Title = styled.h1`
  display: flex;
  justify-content: center;
  padding-top: 2rem;
`;

const Body = styled.div`
  font-family: 'Roboto', sans-serif;
  color: #413a3e;
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
  padding-top: 2rem;
`;

const RouteButton = styled.button`
  width: 400px;
  padding: 20px 0px;
  margin: 18px;
  cursor: pointer;
  border-radius: 4px;
  background-color: #d2d9da;
  color: #413a3e;
  font-size: large;
  letter-spacing: 1.5px;
  border: none;
  transition: all 0.4s ease-in-out;
  &:hover {
    background-color: #413a3e;
    color: #f8f9f0;
    transform: scale(1.1);
  }
`;

export default function UserPortalComponent(props) {
  return (
    <Body>
      <Title>Welcome Back</Title>
      <Subheader>How would you like to learn today?</Subheader>
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
