/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
const SortMenu = styled.select`
  border: white;
  margin-left: 15px;
  text-align: center;
  background-color: #f8f9f0;
  padding: 4px 0;
  box-shadow: 0 2px 3px 0 #413a3e;
  border-radius: 4px;
  background-color: #413a3e;
  color: #f8f9f0;
`;
export default function SortBar(props) {

  let handleSortChange = (e) => {
    sort(e.target.value);
  };

  let sort = (status) => {
    let copy = props.allArticles.slice();
    if (status === 'Newest') {
      let newest = copy.sort((a, b) =>
        b.dateWritten < a.dateWritten ? -1 : 1
      );
      console.log('newest', newest);
      props.setFeed(newest);
    }
    if (status === 'Alphabetical') {
      let alphabetical = copy.sort((a, b) => (a.title < b.title) ? -1 : 1);
      props.setFeed(alphabetical);
    }
    if (status === 'Favorited') {
      let favs = removeNonFavs();
      props.setFeed(favs);
    }
  };

  let removeNonFavs = () => {
    let copy = props.allArticles.slice();
    copy.forEach((article, i) => {
      console.log(article);
      if (article.favorite === false) {
        copy.splice(i, 1);
      }
    });
    // props.setArticles(copy);
    console.log('favs', copy);
    return copy;
  };

  useEffect(() => {
    removeNonFavs();
    // sort();
  }, []);

  return (
    <div>
      <label>
        <SortMenu
          onChange={(e) => {
            handleSortChange(e);
          }}
        >
          <option>Newest</option>
          <option>Alphabetical</option>
          <option>Favorited</option>
        </SortMenu>
      </label>
    </div>
  );
}
