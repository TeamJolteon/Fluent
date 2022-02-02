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
import SpotlightComponent from '../../components/spotlight/spotlight.js';
import ArticlesFeed from '../../components/articlesPage/ArticlesFeed.js';
import SearchBar from '../../components/articlesPage/searchBar.js';
import searchBarStyles from '../../styles/ArticleStyles/searchBar.module.css';
import addArticleButtonStyles from '../../styles/ArticleStyles/addArticleButton.module.css';
import { getSession } from 'next-auth/client';

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
      <Header loggedin={true} />
      <SelectorNav/>
      <div className={searchBarStyles.searchBar}>
        <SearchBar/>
      </div>
      <ArticlesFeed />
      <div className={addArticleButtonStyles.addButton}>
        <button onClick={handleAddOpen}>Add Article</button>
      </div>
      <AddArticleModal show={showAdd} handleClose={handleAddClose}/>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  console.log(session);
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {
      product: 'coffee',
    },
  };
}

// setup on testing
// import axios from 'axios';
// import SelectorNav from '../../components/articlesPage/collectionsNav.js';

// export default function Articles(props) {
//     axios
//     .get('/api/articlesAPI/getAllArticles')
//     .then((response) => {
//       console.log('response: ', response.data);

//     })
//     .catch((e) => {
//       console.log(e);
//     });
//   return (
//     <div>
//       <div>Articles</div>
//       <SelectorNav/>
//     </div>
//   )
// };
