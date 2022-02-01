import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import AZURE from '../../config';

const Button = styled.button`
  cursor: pointer;
  border: none;
  border-radius: 3px;
  margin-right: 5px;
  padding: 10px;
  font-size: 1rem;
`;

const Card = styled.div `
  border: 10px solid rgba(0, 0, 0, .25);
  padding: 15px;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  height: 300px;
  line-height: 50px;
  color: #444;
  font-family: "Roboto", sans-serif;
`;
const Title = styled.h1`
  display: flex;
  justify-content: center;
  color: #444;
  font-family: "Roboto", sans-serif;
`;
const Lang = styled.div`
  font-size: 3em;
  margin-top: 30px;
`
const English = styled.div `
  margin: 15px;
  font-size: 1.5em;
`;

const Grade = styled.div`
  margin-top: 1rem;
`;
const PronuciationButton = styled.button`
`;

export default function FlashcardIndex (props) {
  const [reveal, setReveal] = useState(false);
  const [flashcardData, setFlashcardData] = useState(props.data);
  const [FL, setFlashcardIndex] = useState(0); //FL means flashcard index;

  function synthesizeSpeech() {
    const speechConfig = sdk.SpeechConfig.fromSubscription(AZURE, 'westus');
    const synthesizer = new sdk.SpeechSynthesizer(speechConfig);
    synthesizer.speakTextAsync(
      flashcardData[FL].word,
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
  const superMemo = (interval, repetition, efactor, grade) => {
    var nextInterval;
    var nextRepetition;
    var nextEfactor;

    if (grade >= 3) {
      if (repetition === 0) {
        nextInterval = 1;
        nextRepetition = 1;
      } else if (repetition === 1) {
        nextInterval = 6;
        nextRepetition = 2;
      } else {
        nextInterval += Math.round(interval * efactor);
        nextRepetition = repetition + 1;
      }
    } else {
      nextInterval = 1;
      nextRepetition = 0;
    }

    nextEfactor = efactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));

    if (nextEfactor < 1.3) {
      nextEfactor = 1.3;
    }

    return {
      currentInterval: nextInterval,
      repetition: nextRepetition,
      efactor: nextEfactor,
    };
  };

  const gradeOnclick = (e) => {
    var grade = e.target.id[9];
    var data = superMemo(flashcardData[FL].currentInterval, flashcardData[FL].repetition, flashcardData[FL].efactor, grade);
    data.word = flashcardData[FL].word;
    data.word = flashcardData[FL].word_id;
    axios.put('api', {
      params: {
        userid: flashcardData[FL].userid
      }
    }, data)
    .then((res) => {
      // axios.get('api', {
      //   params: {
      //     userid: flashcardData.userid
      //   }
      // })
      // .then((res) => {
      //   setFlashcardData(res.data)
      // })
      // .catch((err) => {
      //   console.log(err);
      // })
      console.log("success!")
      setFlashcardIndex(FL + 1);
    })
    .catch((err) => {
      console.log(err);
    });
    console.log(data);
    setFlashcardIndex(FL + 1);
  };


  return (
    <div>
    <Title>Practice</Title>
    <Card>
      <Lang className="flashcard-word">{flashcardData[FL].word}</Lang>

      <English onClick={() => {reveal? setReveal(false): setReveal(true)}}>{reveal? flashcardData[FL].translation:"Reveal Translation"}</English>
      <PronuciationButton onClick={() => synthesizeSpeech()}>
                    <VolumeUpIcon />
                  </PronuciationButton>
      <Grade>
        <Button id="flashcard0" onClick={gradeOnclick}>No Idea</Button>
        <Button id="flashcard1" onClick={gradeOnclick}>Not Even Close</Button>
        <Button id="flashcard2" onClick={gradeOnclick}>Pretty Close</Button>
        <Button id="flashcard3" onClick={gradeOnclick}>Close</Button>
        <Button id="flashcard4" onClick={gradeOnclick}>Almost Got It</Button>
        <Button id="flashcard5" onClick={gradeOnclick}>Perfect</Button>
      </Grade>
    </Card>
    </div>
  )
}