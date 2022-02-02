// /* eslint-disable react/jsx-key */
// import styled from 'styled-components';
// import article from './fakeArticle';
// import React, { useState } from 'react';
// const axios = require('axios').default;
// const { v4: uuidv4 } = require('uuid');
// const azureToken = require('../../otherconfig.js');

// const Body = styled.div`
//   font-family: 'Roboto', sans-serif;
//   color: #444;
// `;

// const SpotDiv = styled.div``;
// const Words = styled.button`
//   border: none;
//   font-family: 'Roboto', sans-serif;
//   color: #444;
//   background-color: ${(props) => (props.selected ? '#FFFF00' : 'white')};
// `;
// const TranslatedSpan = styled.span`
//   color: red;
// `;
// export default function SpotlightComponent() {
//   const [highlightedWords, setHighlightedWords] = useState(null);
//   const [translatedWord, setTranslatedWord] = useState(null);
//   const [wordSelected, setWordSelected] = useState(false);
//   function translator(word) {
//     var subscriptionKey = azureToken;
//     var endpoint = 'https://api.cognitive.microsofttranslator.com';
//     var location = 'westus3';

//     axios({
//       baseURL: endpoint,
//       url: '/translate',
//       method: 'post',
//       headers: {
//         'Ocp-Apim-Subscription-Key': subscriptionKey,
//         'Ocp-Apim-Subscription-Region': location,
//         'Content-type': 'application/json',
//         'X-ClientTraceId': uuidv4().toString(),
//       },
//       params: {
//         'api-version': '3.0',
//         from: 'en',
//         to: 'sv',
//       },
//       data: [
//         {
//           text: word,
//         },
//       ],
//       responseType: 'json',
//     }).then(function (response) {
//       setTranslatedWord(response.data[0].translations[0].text, null, 4);
//     });
//     return null;
//   }

//   return (
//     <Body>
//       <SpotDiv>
//         <div>
//           {article.article.split(' ').map((word, index) => {
//             return (
//               <>
//                 {word === highlightedWords ? (
//                   <TranslatedSpan>{translatedWord}</TranslatedSpan>
//                 ) : null}
//                 <Words
//                   selected={highlightedWords === word}
//                   onClick={() => {
//                     translator(word);
//                     setHighlightedWords(word);
//                   }}
//                 >
//                   {word}{' '}
//                 </Words>
//               </>
//             );
//           })}
//         </div>
//       </SpotDiv>
//     </Body>
//   );
// }
