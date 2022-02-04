import React, { useState } from 'react';
import ArticleFeedItem from './ArticleFeedItem.js';
import styled from 'styled-components';

const FeedContainerStyle = styled.div`
  max-width: 1200px;
  height: 400px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  overflow-y: scroll;
`;

// from state, array of articles where either user_id === logged in user or public === true

export default function PersonalFeed (props) {
  return (
    <div>
      <FeedContainerStyle>
        {props.data.length
          ? props.data.map((item) => (
              <ArticleFeedItem data={item} key={item.article_id} />
            ))
          : 'Nothing Found'}
      </FeedContainerStyle>
    </div>
  );
}