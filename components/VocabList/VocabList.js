/* eslint-disable react/jsx-key */
/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import AZURE from '../../config';
import fakeData from './fakeListData';
import axios from 'axios';

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
  const [articleData, setArticleData] = useState([]);
  const [Ind, setListInd] = useState(0);
  // console.log('FROM VLSIT: ', props.list);
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
        console.log('response: ', res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getList();
  }, [currentLang]);
  useEffect(() => {
    const getArticles = async () => {
      try {
        const res = await axios.get('/api/articlesAPI/getAllArticles');
        setArticleData(res.data);
        console.log('responseArticles: ', res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getArticles();
  }, []);

  return (
    <div>
      Sort By:
      <select>
        <option onChange={() => setSorted('A-Z')}>A-Z</option>
        <option onChange={() => setSorted('Z-A')}>Z-A</option>
        <option onChange={() => setSorted('EasyFirst')}>Diffiulty 📈</option>
        <option onChange={() => setSorted('HardFirst')}>Difficulty 📉</option>
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
          {listData.map((word) => {
            return (
              <PhraseRow>
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
