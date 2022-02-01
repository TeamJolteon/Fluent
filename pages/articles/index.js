import Header from '../../components/header.js';
import React, { useState } from 'react';
import ModalNav from '../../components/articlesPage/modalNav.js';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import SelectorNav from '../../components/articlesPage/collectionsNav.js';
import AddArticleModal from '../../components/articlesPage/addArticleModal.js';
import ArticleModal from '../../components/articlesPage/articleModal.js';

export default function Articles(props) {
  const [showAdd, setShowAdd] = useState(false);
  const [showArticle, setShowArticle] = useState(false);
  const handleAddOpen = () => setShowAdd(true);
  const handleAddClose = () => setShowAdd(false);

  const handleArticleOpen = () => setShowArticle(true);
  const handleArticleClose = () => setShowArticle(false);
    axios
    .get('/api/articlesAPI/getAllArticles')
    .then((response) => {
      console.log('response: ', response.data);

    })
    .catch((e) => {
      console.log(e);
    });
  return (
    <div>
      <SelectorNav/>
      <AddArticleModal show={showAdd} handleClose={handleAddClose}/>
      <ArticleModal show={showArticle} handleClose={handleArticleClose}/>

      <button onClick={handleAddOpen}>Add Article</button>
      <button onClick={handleArticleOpen}>Temp Button</button>
    </div>
  )
};