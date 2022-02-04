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
  // const [filtered, setFiltered] = useState([]);

  let handleSearch = (e) => {
    let filtered = filterArticles();
    console.log('query', query);
    setQuery(e.target.value);
    // props.setArticles(filtered);
    if (filtered && query.length > 3) {
      props.setArticles(filtered);
    } else {
      props.setArticles(props.allArticles);
    }
  };

  let filterArticles = () => {
    var term = query.toLowerCase();
    console.log(term);
    if (query) {
      var filteredArticles = props.articles.filter((article) =>
        article.title.toLowerCase().includes(term)
      );
    }
    console.log('filtered', filteredArticles);
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
