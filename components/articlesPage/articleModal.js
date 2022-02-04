/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { useAppContext } from '../../pages/state.js';
import ModalNav from './modalNav.js';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import articleStyles from '../../styles/ArticleStyles/articleModal.module.css';
import ArticleWord from './articleWord.js';

import styled from 'styled-components';
const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');
const azureToken = require('../../otherconfig.js');

// import article from './fakeArticle.js';
// White : #F8F9F0 coffee: #413A3E grey: #D2D9DA blue: #9CBFA7
const Body = styled.div`
  font-family: 'Roboto', sans-serif;
  color: #f8f9f0;
`;

const SpotDiv = styled.div``;

const Words = styled.button`
  border: none;
  font-family: 'Roboto', sans-serif;
  color: #413a3e;
  background-color: #f8f9f0;
  margin: 10px 3.5px;
  display: inline-block;
  background-color: ${(props) => (props.selected ? '#9CBFA7' : '#f8f9f0')};
`;
const Translated = styled.div`
  color: #762d38;
`;

export default function ArticleModal({
  show,
  handleClose,
  articleText,
  language,
}) {
  const [wordSelected, setWordSelected] = useState(false);
  const [translatedWord, setTranslatedWord] = useState(null);
  const [wordHighlighted, setWordHighlighted] = useState(false);
  const [highlightedWords, setHighlightedWords] = useState(null);
  const [languageAbbrev, setLanguageAbbrev] = useState(null);

  const userID = useAppContext().data[0].id;
  console.log(language);

  function languageConverter(languageName) {
    if (languageName === 'Swedish') {
      return 'sv';
    } else if (languageName === 'German') {
      return 'de';
    } else if (languageName === 'French') {
      return 'fr';
    } else if (languageName === 'Italian') {
      return 'it';
    } else if (languageName === 'Portugese') {
      return 'pt';
    }
  }

  // console.log(languageConverter(language));
  // Translator Function
  function translator(word) {
    var subscriptionKey = azureToken;
    var endpoint = 'https://api.cognitive.microsofttranslator.com';
    var location = 'westus3';

    axios({
      baseURL: endpoint,
      url: '/translate',
      method: 'post',
      headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Ocp-Apim-Subscription-Region': location,
        'Content-type': 'application/json',
        'X-ClientTraceId': uuidv4().toString(),
      },
      params: {
        'api-version': '3.0',
        from: 'en',
        to: languageConverter(language),
      },
      data: [
        {
          text: word,
        },
      ],
      responseType: 'json',
    }).then(function (response) {
      setTranslatedWord(response.data[0].translations[0].text, null, 4);
      saveWord(word, response.data[0].translations[0].text);
    });
    return null;
  }

  // define word function
  function defineWord(word) {
    axios({
      url: `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
      method: 'get',
    })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Save Word Function
  function saveWord(word, translated) {
    axios
      .post('http://localhost:3000/api/articlesAPI/postNewWord', {
        user_id: userID,
        article_id: null,
        word: word,
        definition: null,
        language: 'swedish',
        translation: translated,
        sentences: 'Good morning',
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      <Modal open={show} onClose={handleClose}>
        <div className={articleStyles.flex}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 850,
              height: 750,
              bgcolor: '#F8F9F0',
              border: '2px solid #413A3E',
              boxShadow: 24,
              p: 4,
              overflow: 'scroll',
            }}
          >
            <Body>
              <SpotDiv>
                <div>
                  {articleText.split(' ').map((word, index) => {
                    return (
                      // <ArticleWord word={word} key={index}/>
                      <>
                        <Words
                          selected={highlightedWords === word}
                          onClick={() => {
                            translator(word);
                            setHighlightedWords(word);
                            setWordHighlighted(!wordHighlighted);
                          }}
                        >
                          {word === highlightedWords && wordHighlighted ? (
                            <Translated>{translatedWord}</Translated>
                          ) : (
                            word
                          )}
                        </Words>
                      </>
                    );
                  })}
                </div>
              </SpotDiv>
            </Body>
          </Box>
        </div>
      </Modal>
    </div>
  );
}
