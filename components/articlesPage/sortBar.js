import React, { useState, useEffect } from 'react';

export default function SortBar({ allArticles }) {

  let sort = () => {
    let copy = allArticles.slice();
    // copy.sort((a, b) => (a.title < b.title) ?  -1 : 1);
    // copy.sort((a, b) => (a.dateWritten < b.dateWritten) ?  -1 : 1);
    copy.sort((a) => a.favorite === 'true' ?  -1 : 1);
    console.log(copy);
  };

  let removeNonFavs = () => {
    let copy = allArticles.slice();
    copy.forEach((article, i) => {
      console.log(article);
      if (article.favorite === false) {
        copy.splice(i, 1);
      }
    })
    console.log('sliced', copy);
    return copy;
  }

  useEffect(() => {
    sort();
    removeNonFavs();
  })

  return (
    <div>
      <label>
        Sort By:
        <select>
          <option>Newest</option>
          <option>Alphabetical</option>
          <option>Favorited</option>
        </select>
      </label>
    </div>
  )
}