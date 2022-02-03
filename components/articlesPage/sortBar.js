import React, { useState, useEffect } from 'react';

export default function SortBar(props) {
  // const [filterStatus, setFilterStatus] = useState('');

  // let handleFiltering = () => {
  //   if (filterStatus)
  // }

  let handleSortChange = (e) => {
    // setFilterStatus(e.target.value);
    sort(e.target.value);
  }

  let sort = (status) => {
    let copy = props.allArticles.slice();
    if (status === 'Newest') {
      let newest = copy.sort((a, b) => (b.dateWritten < a.dateWritten ) ? -1 : 1);
      console.log('newest', newest);
      props.setArticles(newest);
    }
    if (status === 'Alphabetical') {
      let alphabetical = copy.sort((a, b) => (a.title < b.title) ? -1 : 1);
      props.setArticles(alphabetical);
    }
    if (status === 'Favorited') {
      let favs = removeNonFavs();
      props.setArticles(favs);
    }
  };

  let removeNonFavs = () => {
    let copy = props.allArticles.slice();
    copy.forEach((article, i) => {
      console.log(article);
      if (article.favorite === false) {
        copy.splice(i, 1);
      }
    })
    // props.setArticles(copy);
    console.log('favs', copy);
    return copy;
  }

  useEffect(() => {
    removeNonFavs();
    // sort();
  }, []);

  return (
    <div>
      <label>
        Sort By:
        <select onChange={(e) => { handleSortChange(e); }}>
          <option>Newest</option>
          <option>Alphabetical</option>
          <option>Favorited</option>
        </select>
      </label>
    </div>
  )
}