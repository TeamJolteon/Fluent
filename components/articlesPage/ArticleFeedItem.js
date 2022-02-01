import React from 'react';

const articleFeedItemContainerStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
}

const articleTitleContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  height: '100px',
}

const articleInfoContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  height: '100px',
}


export default function ArticleFeedItem (props) {
  let url = props.data.url ? props.data.url : '';
  let title = props.data.title ? props.data.title : '';
  let author = props.data.author ? props.data.author : '';
  let dateWritten = props.data.dateWritten ? props.data.dateWritten : '';
  let dateUploaded = props.data.dateUploaded ? props.data.dateUploaded: '';

  return (
    <div
      className='articleFeedItemContainer'
      style={articleFeedItemContainerStyle}>
      <div
        className='articleTitleContainer'
        style={articleTitleContainerStyle}>
          <span onClick={console.log('opened')}>{title}</span>
          <span>{author}</span>
          <a href={url}>Link</a>
      </div>
      <div
        className='articleInfoContainer'
        style={articleInfoContainerStyle}>
          <span>written: {dateWritten}</span>
          <span>uploaded: {dateUploaded}</span>
      </div>
    </div>
  )
}