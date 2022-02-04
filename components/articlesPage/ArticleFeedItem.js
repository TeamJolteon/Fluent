import React, { useState } from 'react';
import axios from 'axios';
import ArticleModal from './articleModal.js';
import styled from 'styled-components';
import addArticleButtonStyles from '../../styles/ArticleStyles/addArticleButton.module.css';
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

const DeleteArticle = styled.button`
  padding: 5px;
  display: block;
  margin-top: 10px;
  margin-left: 100px;
  border: none;
  cursor: pointer;
  background-color: #9cbfa7;
  color: #413a3e;
  border-radius: 4px;
  letter-spacing: 1px;
  cursor: pointer;
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

  let handleClick = () => {
    // e.preventDefault();
    axios
      .put('http://localhost:3000/api/articlesAPI/deleteArticle', {
        user_id: props.data.user_id,
        title: title,
        id: props.data.id,
      })
      .then((result) => {
        console.log('results from delete', result);
        props.getFeed();
        props.getCommunityFeed();
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  return (
    <ArticleFeedItemContainer>
      <ArticleTitleContainer>
        <div onClick={handleArticleOpen}>{title}</div>
        <Written>{author}</Written>
        <Link href={url}>Link</Link>
      </ArticleTitleContainer>
      <ArticleInfoContainer>
        {/* <Written>Written: {props.data.dateWritten}</Written> */}
        <Written>Uploaded: {props.data.date_uploaded.slice(0, 10)}</Written>
        <DeleteArticle onClick={handleClick}>Delete</DeleteArticle>
      </ArticleInfoContainer>
      <ArticleModal
        language={props.language}
        show={showArticle}
        handleClose={handleArticleClose}
        articleText={text}
        articleID={props.data.id}
      />
    </ArticleFeedItemContainer>
  );
}
