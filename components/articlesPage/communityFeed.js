import React, { useState } from 'react';
import ArticleFeedItem from './ArticleFeedItem.js';

const feedContainerStyle = {
  width: '50%',
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '25%',
  justifyContent: 'center'
}

// from state, array of articles where either user_id === logged in user or public === true

export default function CommunityFeed (props) {
  return (
    <div>
      <div
      className="feedContainer"
      style={feedContainerStyle}>
      {props.data.length ?
        (props.data.map(item =>
          <ArticleFeedItem
            data={item}
            key={item.article_id}/>
        )) : 'Nothing Found'
      }
      </div>
    </div>
  )
}