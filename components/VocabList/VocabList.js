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

const Form = styled.form`
  display: flex;
  justify-content: center;
  margin-right: 10px;
  margin-top: 20px;
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
  border: 1px solid #d0d0d0;
`;
const PronuciationButton = styled.button`
  border-radius: 45%;
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
  flex-flow: row nowrap;
`;
const PhraseHeaders = styled.div`
  display: flex;
  flex-flow: row nowrap;
  flex-grow: 1;
  flex-basis: 0;
  padding: 0.5em;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0px;
  white-space: nowrap;
  border-bottom: 1px solid #d0d0d0;
`;
const PhraseData = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  flex-grow: 1;
  flex-basis: 0;
  padding: 0.5em;
  word-break: break-word;
  width: 250px;
  height: 50px
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0px;
  white-space: nowrap;
  border-bottom: 1px solid #d0d0d0;
`;

export default function VocabList() {
  const [sorted, setSorted] = useState('A-Z');
  const [currentLang, setCurrentLang] = useState('Swedish');
  const [listData, setListData] = useState([]);
  const [currentList, setCurrentList] = useState([]);
  const [articleData, setArticleData] = useState([]);
  const [Ind, setListInd] = useState(0);
  const [searchList, setSearchList] = useState([]);
  const [searching, setSearching] = useState(false);
  const [zaClicked, setZAClicked] = useState(false);
  const [currentValue, setCurrentValue] = useState('');
  const [listZA, setListZA] = useState([]);
  const [listEasyfirst, setListEasyFirst] = useState([]);
  const [listHardfirst, setListHardFirst] = useState([]);
  const [listRecent, setListRecent] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentValue('');
    setSearching(!searching);
  };
  const handleChange = (e) => {
    setCurrentValue(e.target.value);
    setSearching(!searching);
    search();
  };
  const search = () => {
    const filteredList = listData.filter((word) =>
      word.word.toLowerCase().includes(currentValue.toLowerCase())
    );
    setSearchList(filteredList);
  };
  const zToA = () => {
    const reversed = listData.reverse();
    setListZA(reversed);
  };
  const sortRecent = () => {
    const sortedByInterval = listData.sort(
      (a, b) => a.repetition - b.repetition
    );
    console.log(sortedByInterval);
    setListRecent(sortedByInterval);
  };
  const difficultyEasyFirst = () => {
    const filteredEasy = listData.filter((word) => {
      return word.efactor === 5;
    });
    const filteredMedium = listData.filter((word) => {
      return word.efactor > 3 && word.efactor < 5;
    });
    const filteredHard = listData.filter((word) => {
      return word.efactor < 3;
    });
    setListEasyFirst(filteredEasy.concat(filteredMedium).concat(filteredHard));
  };
  const difficultyHardFirst = () => {
    const filteredEasy = listData.filter((word) => {
      return word.efactor === 5;
    });
    const filteredMedium = listData.filter((word) => {
      return word.efactor > 3 && word.efactor < 5;
    });
    const filteredHard = listData.filter((word) => {
      return word.efactor < 3;
    });
    setListHardFirst(filteredHard.concat(filteredMedium).concat(filteredEasy));
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
  }, [searching, searchList]);
  useEffect(() => {
    const getList = async () => {
      try {
        const res = await axios.get(
          '/api/vocabAPI/getVocabListAlphabetically',
          {
            params: {
              language: currentLang,
            },
          }
        );
        setListData(res.data);
        setCurrentList(res.data);
        // console.log('response: ', res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getList();
  }, [currentLang]);
  useEffect(() => {
    zToA();
    sortRecent();
    difficultyHardFirst();
    difficultyEasyFirst();
  }, [currentLang]);
  useEffect(() => {
    const getArticles = async () => {
      try {
        const res = await axios.get('/api/articlesAPI/getAllArticles');
        setArticleData(res.data);
        // console.log('responseArticles: ', res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getArticles();
  }, []);

  useEffect(() => {
    if (sorted === 'A-Z') {
      setCurrentList(listData);
    } else if (sorted === 'Z-A') {
      setCurrentList(listZA);
    } else if (sorted === 'Difficulty 📈') {
      setCurrentList(listEasyfirst);
    } else if (sorted === 'Difficulty 📉') {
      setCurrentList(listHardfirst);
    } else if (sorted === 'Recent') {
      setCurrentList(listRecent);
    } else {
      setCurrentList(listData);
    }
  }, [sorted]);
  return (
    <div>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <label>
          <input
            type='text'
            placeholder='Search Words'
            onChange={(e) => handleChange(e)}
            value={currentValue}
          />
        </label>
        <button type='submit'>Search</button>
      </Form>
      Sort By:
      <select onChange={(e) => handleSortChange(e)}>
        <option>A-Z</option>
        <option>Z-A</option>
        <option>Difficulty 📈</option>
        <option>Difficulty 📉</option>
        <option>Recent</option>
      </select>
      <Phrases>
        <PhraseTable>
          <PhraseRow>
            <PhraseHeaders>{currentLang}</PhraseHeaders>
            <PhraseHeaders>English</PhraseHeaders>
            <PhraseHeaders>Pronunciation</PhraseHeaders>
            <PhraseHeaders>Status</PhraseHeaders>
            <PhraseHeaders>Source</PhraseHeaders>
          </PhraseRow>
          {currentList.map((word) => {
            return (
              <PhraseRow key={word.id}>
                <PhraseData>{word.translation}</PhraseData>
                <PhraseData>{word.word}</PhraseData>
                <PhraseData>
                  <PronuciationButton
                    onClick={() => synthesizeSpeech(word.word)}
                  >
                    <VolumeUpIcon />
                  </PronuciationButton>
                </PhraseData>
                {word.efactor === 5 ? (
                  <PhraseData>Got It</PhraseData>
                ) : word.efactor < 3 ? (
                  <PhraseData>Not Yet</PhraseData>
                ) : (
                  <PhraseData>Almost</PhraseData>
                )}

                {articleData.map((article) =>
                  word.article_id === article.id ? (
                    <PhraseData>{article.url}</PhraseData>
                  ) : null
                )}
              </PhraseRow>
            );
          })}
        </PhraseTable>
      </Phrases>
    </div>
  );
}
