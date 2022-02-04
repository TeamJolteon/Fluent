import React, { useState } from 'react';
import ArticleModal from './articleModal.js';
import styled from 'styled-components';
const ArticleFeedItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #d2d9da;
  align-items: center;
  width: 800px;
  margin: 20px auto;
  padding: 25px;
`;

const ArticleTitleContainer = styled.div`
  width: 70%;
  cursor: pointer;
`;

const ArticleInfoContainer = styled.div`
  width: 30%;
  text-align: right;
`;
const Written = styled.div`
  font-style: italic;
  padding: 3px 0;
  font-size: 13px;
`;
const Link = styled.a`
  padding: 3px 0;
  font-size: 14px;
  color: #413a3e;
  text-decoration: underline;
  cursor: pointer;
`;

export default function ArticleFeedItem(props) {
  const [showArticle, setShowArticle] = useState(false);
  const handleArticleOpen = () => setShowArticle(true);
  const handleArticleClose = () => setShowArticle(false);

  let url = props.data.url ? props.data.url : '';
  let text = props.data.text ? props.data.text : '';
  let title = props.data.title ? props.data.title : '';
  let author = props.data.author ? props.data.author : '';
  let dateWritten = props.data.dateWritten;
  let dateUploaded = props.data.date_uploaded;
  console.log('date written', props.dateWritten);

  return (
    <ArticleFeedItemContainer>
      <ArticleTitleContainer>
        <div onClick={handleArticleOpen}>{title}</div>
        <Written>{author}</Written>
        <Link href={url}>Link</Link>
      </ArticleTitleContainer>
      <ArticleInfoContainer>
        <Written>Written: {props.data.dateWritten}</Written>
        <Written>Uploaded: {props.data.date_uploaded}</Written>
      </ArticleInfoContainer>
      <ArticleModal
        language={props.language}
        show={showArticle}
        handleClose={handleArticleClose}
        articleText={text}
        articleId={props.data.id}
      />
    </ArticleFeedItemContainer>
  );
}
