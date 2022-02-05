/* eslint-disable react-hooks/exhaustive-deps */
import Header from '../../components/header.js';
import React, { useState, useContext, useEffect } from 'react';
import ModalNav from '../../components/articlesPage/modalNav.js';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import SelectorNav from '../../components/articlesPage/collectionsNav.js';
import AddArticleModal from '../../components/articlesPage/addArticleModal.js';
import PersonalFeed from '../../components/articlesPage/personalFeed.js';
import CommunityFeed from '../../components/articlesPage/communityFeed.js';
import addArticleButtonStyles from '../../styles/ArticleStyles/addArticleButton.module.css';
import { getSession } from 'next-auth/client';
import { useAppContext } from '../state.js';
import SearchBar from '../../components/articlesPage/searchBar.js';
import searchBarStyles from '../../styles/ArticleStyles/searchBar.module.css';
import SortBar from '../../components/articlesPage/sortBar.js';
import SortBarStyles from '../../styles/ArticleStyles/sortBar.module.css';
import topBarStyles from '../../styles/ArticleStyles/topBar.module.css';
import styled from 'styled-components';

const AddArticle = styled.button`
  padding: 15px;
  display: block;
  margin: 20px auto;
  border: none;
  cursor: pointer;
  background-color: #9cbfa7;
  color: #413a3e;
  border-radius: 4px;
  font-size: 1rem;
  letter-spacing: 1px;
  &:hover {
    background-color: #d2d9da;
  }
`;

export default function Articles(props) {
  const userID = useAppContext().data[0].id;
  const initialLanguage = useAppContext().data[0].default_language;
  const [language, setLanguage] = useState(null);
  const [userID2, setUserID2] = useState(null);

  useEffect(() => {
    if (language === null) {
      setLanguage(initialLanguage);
    }
    if (userID2 === null) {
      setUserID2(userID);
    }
  });

  const [showAdd, setShowAdd] = useState(false);
  const [showArticle, setShowArticle] = useState(false);
  const [allCommunityArticles, setAllCommunityArticles] = useState([]);
  const [originalCommunityArticles, setOriginalCommunityArticles] = useState(
    []
  );
  const [allPersonalArticles, setAllPersonalArticles] = useState([]);
  const [originalPersonalArticles, setOriginalPersonalArticles] = useState([]);
  const [feedSelection, setFeedSelection] = useState(true);
  const [feed, setFeed] = useState([]);
  const [display, setDisplay] = useState('personal');

  const handleAddOpen = () => setShowAdd(true);
  const handleAddClose = () => setShowAdd(false);

  var derivedFeed = feedSelection ? allPersonalArticles : allCommunityArticles;

  const fetchCommunityArticles = () => {
    axios
      .get('http://localhost:3000/api/articlesAPI/getAllArticles')
      .then((response) => {
        setAllCommunityArticles(response.data);
        setOriginalCommunityArticles(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const fetchUserArticles = () => {
    axios({
      url: 'http://localhost:3000/api/articlesAPI/getUserArticles',
      method: 'get',
      params: {
        id: userID,
      },
    })
      .then((response) => {
        setAllPersonalArticles(response.data);
        setOriginalPersonalArticles(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchCommunityArticles();
    fetchUserArticles();
  }, [userID]);

  return (
    <div>
      <Header loggedin={true} language={language} setLanguage={setLanguage} />
      <SelectorNav setDisplay={setDisplay} />
      <div className={topBarStyles.topBar}>
        <div className={SortBarStyles.sortBar}>
          <SortBar
            originalCommunityArticles={originalCommunityArticles}
            originalPersonalArticles={originalPersonalArticles}
            allPersonalArticles={allPersonalArticles}
            display={display}
            setAllCommunityArticles={setAllCommunityArticles}
            setAllPersonalArticles={setAllPersonalArticles}
            allArticles={derivedFeed}
            setFeed={setFeedSelection}
          />
        </div>
        <div className={searchBarStyles.searchBar}>
          <SearchBar
            setFeed={setFeedSelection}
            allPersonalArticles={allPersonalArticles}
            allCommunityArticles={allCommunityArticles}
            originalCommunityArticles={originalCommunityArticles}
            originalPersonalArticles={originalPersonalArticles}
            display={display}
            setAllPersonalArticles={setAllPersonalArticles}
            setAllCommunityArticles={setAllCommunityArticles}
          />
        </div>
      </div>
      {display === 'community' ? (
        <CommunityFeed
          getFeed={fetchCommunityArticles}
          language={language}
          data={allCommunityArticles}
        />
      ) : (
        <PersonalFeed
          getFeed={fetchUserArticles}
          getCommunityFeed={fetchCommunityArticles}
          language={language}
          data={allPersonalArticles}
        />
      )}
      <div className={addArticleButtonStyles.addButton}>
        <AddArticle onClick={handleAddOpen}>Add Article</AddArticle>
      </div>
      <AddArticleModal
        show={showAdd}
        setShowAdd={setShowAdd}
        handleClose={handleAddClose}
        userID={userID}
      />
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
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
