import React, { useState } from 'react';
import searchBarStyles from '../../styles/ArticleStyles/searchBar.module.css';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState([]);

  let handleSearch = (e) => {
    setQuery(e.target.value);
  }
  return (
    <div className={searchBarStyles.searchBar}>
      <form>
        <input onChange={(e) => { handleSearch(e); }}/>
        <button>Search</button>
      </form>
    </div>
  )
};