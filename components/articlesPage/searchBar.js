import React, { useState } from 'react';
import searchBarStyles from '../../styles/ArticleStyles/searchBar.module.css';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  justify-content: center;
`;
const Input = styled.input`
  background-color: #d2d9da;
  color: #413a3e;
  border: none;
  padding: 5px 12px;
  border-radius: 4px;
  outline: none;
`;
export default function SearchBar(props) {
  const [query, setQuery] = useState('');

  let personalCopy = props.originalPersonalArticles;
  let communityCopy = props.originalCommunityArticles;

  let handleSearch = (e) => {
    let filtered = filterArticles();
    setQuery(e.target.value);
    if (props.display === 'personal') {
      if (filtered && query.length > 3) {
        props.setAllPersonalArticles(filtered);
      }
      if (query.length < 3) {
        props.setAllPersonalArticles(personalCopy);
      }
    }
    if (filtered && query.length > 3 && props.display === 'community') {
      props.setAllCommunityArticles(filtered);
    } else {
      props.setAllCommunityArticles(communityCopy);
    }
  };

  let filterArticles = () => {
    var term = query.toLowerCase();
    if (props.display === 'personal') {
      if (query) {
        var filteredArticles = props.allPersonalArticles.filter((article) =>
          article.title.toLowerCase().includes(term)
        );
      }
    }
    if (props.display === 'community') {
      if (query) {
        var filteredArticles = props.allCommunityArticles.filter((article) =>
          article.title.toLowerCase().includes(term)
        );
      }
    }
    return filteredArticles;
  };

  return (
    <div className={searchBarStyles.searchBar}>
      <Form>
        <Input
          onChange={(e) => {
            handleSearch(e);
          }}
          placeholder='Search Articles'
        />
      </Form>
    </div>
  );
}
