/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import AZURE from '../../config';
import axios from 'axios';
import Link from 'next/link';

const Form = styled.form`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
const Input = styled.input`
  background-color: #d2d9da;
  color: #413a3e;
  border: none;
  padding: 5px 12px;
  border-radius: 4px;
  outline: none;
`;

const SpeakerImg = styled.div``;
const Phrases = styled.div`
  margin: 20px;
`;
const PhraseTable = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin: 0.5rem;
  line-height: 1.5;
  flex: 1 1 auto;
  border: 1px solid #413a3e;
  border-radius: 4px;
`;
const PronuciationButton2 = styled.button`
  border-radius: 45%;
  border: none;
  background-color: #9cbfa7;
  margin-right: 8px;
  color: #413a3e;
  cursor: pointer;
`;
const PronuciationButton = styled.button`
  border-radius: 45%;
  border: none;
  cursor: pointer;
  background-color: #d2d9da;
  margin-right: 8px;
  color: #413a3e;
`;
const PhraseHeader = styled.div`
  display: none;
  font-weight: 700;
  font-size: 1.1em;
  background-color: #f2f2f2;
`;
const PhraseRow = styled.div`
  width: 100%;
  display: flex;
  padding: 0 10px;
  background-color: #d2d9da;
  flex-flow: row nowrap;
  text-transform: capitalize;
`;
const PhraseRow2 = styled.div`
  width: 100%;
  display: flex;
  padding: 0 10px;
  flex-flow: row nowrap;
  background-color: #9cbfa7;
  color: #413a3e;
  text-transform: capitalize;
`;
const PhraseTitles = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  padding: 0 10px;
  flex-flow: row nowrap;
  background-color: #413a3e;
  color: #f8f9f0;
  font-size: 19px;
  font-weight: 500;
  letter-spacing: 1.5px;
  text-transform: capitalize;
`;
const PhraseHeaders = styled.div`
  display: flex;
  flex-flow: row nowrap;
  flex-grow: 1;
  flex-basis: 0;
  padding: 0.5em;
  overflow: hidden;
  min-width: 0px;
  white-space: nowrap;
`;
const PhraseData = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  flex-grow: 1;
  flex-basis: 0;
  padding: 0.5em;
  width: 250px;
  height: 50px
  overflow: hidden;
  min-width: 0px;
  white-space: nowrap;
  font-weight: 550;
  letter-spacing: 0.5px;
`;
const ArticleLink1 = styled.a`
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    color: #d2d9da;
  }
`;
const ArticleLink = styled.a`
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    color: #9cbfa7;
  }
`;
const Title = styled.h1`
  display: flex;
  justify-content: center;
  letter-spacing: 1px;
  font-size: 36px;
`;
const Body = styled.div`
  font-family: 'Roboto', sans-serif;
  color: #413a3e;
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 2rem;
`;
const SortMenu = styled.select`
  border: white;
  margin-left: 15px;
  text-align: center;
  background-color: #f8f9f0;
  padding: 4px 0;
  box-shadow: 0 2px 3px 0 #413a3e;
  border-radius: 4px;
  background-color: #9cbfa7;
  color: #413a3e;
  outline: none;
`;

export default function VocabList({ userID, language }) {
  const [sorted, setSorted] = useState('A-Z');
  const [listData, setListData] = useState([]);
  const [currentList, setCurrentList] = useState([]);
  const [articleData, setArticleData] = useState([]);
  const [Ind, setListInd] = useState(0);
  const [searchList, setSearchList] = useState([]);
  const [searching, setSearching] = useState(false);
  const [currentValue, setCurrentValue] = useState('');
  const [listEasyfirst, setListEasyFirst] = useState([]);
  const [listHardfirst, setListHardFirst] = useState([]);
  const [listRecent, setListRecent] = useState([]);

  const currentLang = language;
  console.log(currentLang === 'Swedish');
  useEffect(() => {
    const getList = async () => {
      try {
        const res = await axios.get(
          '/api/vocabAPI/getVocabListAlphabetically',
          {
            params: {
              userID: userID,
              language: currentLang,
            },
          }
        );
        setCurrentList(res.data);
        setListData(res.data);
        console.log('response: ', res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getList();
  }, [currentLang]);

  useEffect(() => {
    setCurrentList(listEasyfirst);
  }, [listEasyfirst]);
  useEffect(() => {
    setCurrentList(listHardfirst);
  }, [listHardfirst]);
  useEffect(() => {
    setCurrentList(listRecent);
  }, [listRecent]);
  useEffect(() => {
    // difficultyHardFirst();
    // sortRecent();
    if (sorted === 'Difficulty 📈') {
      difficultyEasyFirst();
    } else if (sorted === 'Difficulty 📉') {
      difficultyHardFirst();
    } else if (sorted === 'Recent') {
      sortRecent();
    } else {
      setCurrentList(listData);
    }
  }, [sorted]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentValue('');
    setSearching(false);
  };
  // const handleChange = (e) => {};
  const search = (e) => {
    setCurrentValue(e.target.value);
    setSearching(true);
    if (currentValue.length < 2) {
      setCurrentList(listData);
    } else {
      const filteredList = currentList.filter((word) =>
        word.word.toLowerCase().includes(currentValue.toLowerCase())
      );
      setCurrentList(filteredList);
    }
  };

  const sortRecent = () => {
    const sortedByInterval = listData.sort(
      (a, b) => a.repetition - b.repetition
    );
    setListRecent(sortedByInterval);
  };
  const difficultyEasyFirst = () => {
    const filteredEasy = listData.filter((word) => {
      return word.efactor === 5;
    });
    const filteredMedium = listData.filter((word) => {
      return word.efactor === 3;
    });
    const filteredHard = listData.filter((word) => {
      return word.efactor < 3;
    });
    setListEasyFirst(filteredEasy.concat(filteredMedium, filteredHard));
  };
  const difficultyHardFirst = () => {
    const filteredEasy = listData.filter((word) => {
      return word.efactor === 5;
    });
    const filteredMedium = listData.filter((word) => {
      return word.efactor === 3 && word.efactor < 5;
    });
    const filteredHard = listData.filter((word) => {
      return word.efactor < 3;
    });
    setListHardFirst(filteredHard.concat(filteredMedium, filteredEasy));
  };

  const handleSortChange = (e) => {
    setSorted(e.target.value);
  };
  function synthesizeSpeech(str) {
    const speechConfig = sdk.SpeechConfig.fromSubscription(AZURE, 'westus');
    const synthesizer = new sdk.SpeechSynthesizer(speechConfig);
    synthesizer.speakTextAsync(
      str,
      (result) => {
        synthesizer.close();
        return result.audioData;
      },
      (error) => {
        console.log(error);
        synthesizer.close();
      }
    );
  }

  useEffect(() => {
    searching ? setCurrentList(searchList) : setCurrentList(listData);
  }, [searching]);

  return (
    <Body>
      <Title>Your Words</Title>
      <div>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <label>
            <Input
              type='text'
              placeholder='Search Words'
              onChange={(e) => search(e)}
              value={currentValue}
            />
          </label>
        </Form>
        <SortMenu onChange={(e) => handleSortChange(e)}>
          <option>A-Z</option>
          <option>Difficulty 📈</option>
          <option>Difficulty 📉</option>
          <option>Recent</option>
        </SortMenu>
        <Phrases>
          <PhraseTable>
            <PhraseTitles>
              <PhraseHeaders>{language}</PhraseHeaders>
              <PhraseHeaders>English</PhraseHeaders>
              <PhraseHeaders>Status</PhraseHeaders>
              <PhraseHeaders>Source</PhraseHeaders>
            </PhraseTitles>
            {currentList.map((word, index) => {
              if (index % 2 === 0) {
                return (
                  <PhraseRow>
                    <PhraseData>{word.translation}</PhraseData>
                    <PhraseData>
                      <PronuciationButton
                        onClick={() => synthesizeSpeech(word.word)}
                      >
                        <VolumeUpIcon />
                      </PronuciationButton>
                      {word.word}
                    </PhraseData>
                    {word.efactor === 5 ? (
                      <PhraseData>Got It</PhraseData>
                    ) : word.efactor < 3 ? (
                      <PhraseData>Not Yet</PhraseData>
                    ) : (
                      <PhraseData>Almost</PhraseData>
                    )}
                    <PhraseData>
                      <ArticleLink href={word.url} target='_blank'>
                        Link to Article
                      </ArticleLink>
                    </PhraseData>
                  </PhraseRow>
                );
              } else {
                return (
                  <PhraseRow2 key={word.id}>
                    <PhraseData>{word.translation}</PhraseData>
                    <PhraseData>
                      <PronuciationButton2
                        onClick={() => synthesizeSpeech(word.word)}
                      >
                        <VolumeUpIcon />
                      </PronuciationButton2>
                      {word.word}
                    </PhraseData>
                    {word.efactor === 5 ? (
                      <PhraseData>Got It</PhraseData>
                    ) : word.efactor === 3 ? (
                      <PhraseData>Almost</PhraseData>
                    ) : (
                      <PhraseData>Not Yet</PhraseData>
                    )}

                    <PhraseData>
                      {' '}
                      <ArticleLink1 href={word.url} target='_blank'>
                        Link to Article
                      </ArticleLink1>
                    </PhraseData>
                  </PhraseRow2>
                );
              }
            })}
          </PhraseTable>
        </Phrases>
      </div>
    </Body>
  );
}
// {
//   articleData.map((article) =>
//     word.article_id === article.id ? (
//       <PhraseData>{article.url}</PhraseData>
//     ) : null
//   );
// }
