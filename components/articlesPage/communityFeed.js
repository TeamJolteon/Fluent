import React, { useState } from 'react';
import ArticleFeedItem from './ArticleFeedItem.js';
import styled from 'styled-components';
const feedContainerStyle = {
  width: '50%',
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '25%',
  justifyContent: 'center',
};
const NothingFound = styled.div`
  display: block;
  margin: 0 auto;
  padding-top: 5rem;
`;

// from state, array of articles where either user_id === logged in user or public === true

export default function CommunityFeed(props) {
  return (
    <div>
      <div className='feedContainer' style={feedContainerStyle}>
        {props.data.length ? (
          props.data.map((item) => (
            <ArticleFeedItem
              language={props.language}
              data={item}
              key={item.article_id}
            />
          ))
        ) : (
          <NothingFound>Nothing Found</NothingFound>
        )}
      </div>
    </div>
  );
}
