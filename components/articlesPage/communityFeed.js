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

const NothingFound = styled.div`
  display: block;
  margin: 0 auto;
  padding-top: 5rem;
`;

export default function CommunityFeed(props) {
  return (
    <div>
      <FeedContainerStyle>
        {props.data.length ? (
          props.data.map((item) => (
            <ArticleFeedItem
              language={props.language}
              data={item}
              key={item.article_id}
              getFeed={props.getFeed}
            />
          ))
        ) : (
          <NothingFound>Nothing Found</NothingFound>
        )}
      </FeedContainerStyle>
    </div>
  );
}
