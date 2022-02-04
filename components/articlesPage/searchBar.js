import React, { useState } from 'react';
import searchBarStyles from '../../styles/ArticleStyles/searchBar.module.css';

export default function SearchBar(props) {
  const [query, setQuery] = useState('');
  // const [filtered, setFiltered] = useState([]);

  let handleSearch = (e) => {
    let filtered = filterArticles();
    let personalsCopy = props.allPersonalArticles.slice();
    let communityCopy = props.allCommunityArticles.slice();
    console.log('', communityCopy);
    console.log('query', query);
    setQuery(e.target.value);
    // props.setArticles(filtered);
    if (filtered && query.length > 3 && props.display === 'personal') {
      props.setAllPersonalArticles(filtered);
    } else {
      props.setAllPersonalArticles(personalsCopy);
    }
    if (filtered && query.length > 3 && props.display === 'community') {
      props.setAllCommunityArticles(filtered);
    } else {
      props.setAllCommunityArticles(communityCopy);
    }
  }

  let filterArticles = () => {
    var term = query.toLowerCase();
    if (props.display === 'personal') {
      if (query) {
        var filteredArticles = props.allPersonalArticles.filter(article =>
          article.title.toLowerCase().includes(term));
      }
    }
    if (props.display === 'community') {
      if (query) {
        var filteredArticles = props.allCommunityArticles.filter(article =>
          article.title.toLowerCase().includes(term));
      }
    }
    console.log(filteredArticles);
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