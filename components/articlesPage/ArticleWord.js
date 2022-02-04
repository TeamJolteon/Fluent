import React, { useState } from 'react';

const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');
const azureToken = require('../../otherconfig.js');

const wordPairContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  height: '30px',
  width: 'auto',
  fontFamily: 'Roboto, sans-serif'
}

const translatedVisible = {
  opacity: '1',
  height: '50%'
}

const translatedInvisible = {
  opacity: '0',
  height: '50%'
}

const wordSelectedStyle = {
  height: '50%',
  backgroundColor: 'yellow',
  marginRight: '3.5px',
  display: 'inline-block'
}

const wordNotSelectedStyle = {
  height: '50%',
  marginRight: '3.5px',
  display: 'inline-block'
}

export default function ArticleWord(props) {
  const [wordSelected, setWordSelected] = useState(false);
  const [translatedWord, setTranslatedWord] = useState('');
  const [wordHighlighted, setWordHighlighted] = useState(false);

  const translatedWordContainerStyle = translatedWord ? translatedVisible : translatedInvisible;
  const translated = props.translatedWord ? props.translatedWord : '';
  const selected = wordSelected ? wordSelectedStyle : wordNotSelectedStyle;

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
      setTranslatedWord(response.data[0].translations[0].text, null, 4);
      saveWord(props.word, (response.data[0].translations[0].text));
    });
    return null;
  }

  const clickWord = () => {
    setWordSelected(!wordSelected);
    translator(props.word);
  }

  return (
    <span
      className="wordPairContainer"
      style={wordPairContainerStyle}>
      <span
        className="translatedWordContainer"
        style={translatedWordContainerStyle}>
          {translatedWord}
        </span>
      <span
        className="defaultWordContainer"
        onClick={clickWord}
        style={selected}>
          {props.word}
      </span>
    </span>
  )
}