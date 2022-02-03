import React, { useState } from 'react';
import ModalNav from './modalNav.js';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import articleStyles from '../../styles/ArticleStyles/articleModal.module.css';

import styled from 'styled-components';
const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');
const azureToken = require('../../otherconfig.js');

// import article from './fakeArticle.js';

const Body = styled.div`
  font-family: 'Roboto', sans-serif;
  color: #444;
`;

const SpotDiv = styled.div``;

const Words = styled.button`
  border: none;
  font-family: 'Roboto', sans-serif;
  color: #444;
  background-color: ${(props) => (props.selected ? '#FFFF00' : 'white')};
  margin: 0 3.5px;
  display: inline-block;
`;

const Translated = styled.div`
  color: red;
`;

export default function ArticleModal({ show, handleClose, articleText }) {
  const [wordSelected, setWordSelected] = useState(false);
  const [translatedWord, setTranslatedWord] = useState(null);
  const [wordHighlighted, setWordHighlighted] = useState(false);
  const [highlightedWords, setHighlightedWords] = useState(null);

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
        to: 'sv',
      },
      data: [
        {
          text: word,
        },
      ],
      responseType: 'json',
    }).then(function(response) {
      defineWord(word);
      setTranslatedWord(response.data[0].translations[0].text, null, 4);
      saveWord(word, (response.data[0].translations[0].text));
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
    })
  }

  // Save Word Function
  function saveWord(word, translated) {
    axios.post('http://localhost:3000/api/articlesAPI/postNewWord', {
      "user_id":1,
      "article_id": 1,
      "word": word,
      "definition":null,
      "language":"swedish",
      "translation": translated,
      "sentences":"Good morning"
    })
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.error(error);
    })
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
              bgcolor: 'background.paper',
              border: '2px solid #000',
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
                      <>
                        <Words
                          key = {word + 1}
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

                    // return (
                    //   <>
                    //     {word === highlightedWords ? (
                    //       <TranslatedSpan>{translatedWord}</TranslatedSpan>
                    //     ) : null}
                    //     <Words
                    //       selected={highlightedWords === word}
                    //       onClick={(e) => {
                    //         translator(word);
                    //         setHighlightedWords(word);
                    //       }}
                    //     >
                    //       {word}{' '}
                    //     </Words>
                    //   </>
                    // );
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
