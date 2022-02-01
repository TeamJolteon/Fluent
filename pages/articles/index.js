import Header from '../../components/header.js';
import React, { useState } from 'react';
import ModalNav from '../../components/articlesPage/modalNav.js';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import SelectorNav from '../../components/articlesPage/collectionsNav.js';
import AddArticleModal from '../../components/articlesPage/addArticleModal.js';

export default function Articles(props) {
  const [show, setShow] = useState(false);
  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);
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
      <div>Articles</div>
      <SelectorNav/>
      <AddArticleModal show={show} handleClose={handleClose}/>
      <button onClick={handleOpen}>Add Article</button>
    </div>
  )
};