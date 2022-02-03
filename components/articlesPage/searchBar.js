import React, { useState } from 'react';
import searchBarStyles from '../../styles/ArticleStyles/searchBar.module.css';

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
  }

  let filterArticles = () => {
    var term = query.toLowerCase();
    console.log(term);
    if (query) {
      var filteredArticles = props.articles.filter(article =>
        article.title.toLowerCase().includes(term));
    }
    console.log('filtered', filteredArticles);
    return filteredArticles;
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