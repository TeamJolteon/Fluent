import Header from '../../components/header.js';
import React, { useState, useContext } from 'react';
import ModalNav from '../../components/articlesPage/modalNav.js';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import SelectorNav from '../../components/articlesPage/collectionsNav.js';
import AddArticleModal from '../../components/articlesPage/addArticleModal.js';

// import ArticleModal from '../../components/articlesPage/articleModal.js';

// import SpotlightComponent from '../../components/spotlight/spotlight.js';
import ArticlesFeed from '../../components/articlesPage/ArticlesFeed.js';
import addArticleButtonStyles from '../../styles/ArticleStyles/addArticleButton.module.css';
import { getSession } from 'next-auth/client';
import {useAppContext} from '../state.js'
import SearchBar from '../../components/articlesPage/searchBar.js';
import searchBarStyles from '../../styles/ArticleStyles/searchBar.module.css';
import sample from '../../components/articlesPage/articleDummyData/articleDummyData.js';
import SortBar from '../../components/articlesPage/sortBar.js';
import SortBarStyles from '../../styles/ArticleStyles/sortBar.module.css';
import topBarStyles from '../../styles/ArticleStyles/topBar.module.css';

export default function Articles(props) {

  // const userID = useAppContext().data[0].id;
  // console.log('user', userID);

  const [showAdd, setShowAdd] = useState(false);
  const [showArticle, setShowArticle] = useState(false);
  const [allArticles, setAllArticles] = useState(sample);
  const [articles, setArticles] = useState(sample);

  const handleAddOpen = () => setShowAdd(true);
  const handleAddClose = () => setShowAdd(false);

  // const handleArticleOpen = () => setShowArticle(true);
  // const handleArticleClose = () => setShowArticle(false);

  axios
    .get('http://localhost:3000/api/articlesAPI/getAllArticles')
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
      <div className={topBarStyles.topBar}>
        <div className={SortBarStyles.sortBar}>
          <SortBar
            allArticles={allArticles}
            articles={articles}
            setArticles={setArticles}
          />
        </div>
        <div className={searchBarStyles.searchBar}>
            <SearchBar
              allArticles={allArticles}
              articles={articles}
              setArticles={setArticles}
            />
        </div>
      </div>
      <ArticlesFeed data={articles}/>
      <div className={addArticleButtonStyles.addButton}>
        <button onClick={handleAddOpen}>Add Article</button>
      </div>
      <AddArticleModal
        show={showAdd}
        setShowAdd={setShowAdd}
        handleClose={handleAddClose}
      />
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
