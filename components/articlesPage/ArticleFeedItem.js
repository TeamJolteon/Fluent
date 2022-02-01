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
  let url = props.sampleData.url ? props.sampleData.url : '';
  let title = props.sampleData.title ? props.sampleData.title : '';
  let author = props.sampleData.author ? props.sampleData.author : '';
  let dateWritten = props.sampleData.dateWritten ? props.sampleData.dateWritten : '';
  let dateUploaded = props.sampleData.dateUploaded ? props.sampleData.dateUploaded: '';

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
          <span>{dateWritten}</span>
          <span>{dateUploaded}</span>
      </div>
    </div>
  )
}