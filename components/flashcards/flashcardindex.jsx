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

const Repeat = styled.div `
  margin: 15px;
  font-size: 1.5em;
  font-family: "Roboto", sans-serif;
  text-align: center;
`;

const Grade = styled.div`
`;
const PronuciationButton = styled.button`
`;

export default function FlashcardIndex (props) {
  const [reveal, setReveal] = useState(false);
  const [flashcardData, setFlashcardData] = useState(props.data);
  const [FL, setFlashcardIndex] = useState(0); //FL means flashcard index;
  const [repeat, setRepeat] = useState(false);

  useEffect(() => {
    if (props.userID !== null ) {
      axios.get('/api/vocabAPI/getVocalListCurrentInterval', {
        params: {
          language: "Swedish",
          userID: props.userID
        }
      })
      .then((res) => {
        setFlashcardData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
    }

  },[props.userID])

  function synthesizeSpeech() {
    const speechConfig = sdk.SpeechConfig.fromSubscription(AZURE, 'westus');
    const synthesizer = new sdk.SpeechSynthesizer(speechConfig);
    synthesizer.speakTextAsync(
      flashcardData[FL].translation,
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
    if (FL + 1 > flashcardData.length) {
      return;
    }
    console.log(props.userID);
    var grade = e.target.id[9];
    var data = superMemo(flashcardData[FL].currentInterval, flashcardData[FL].repetition, flashcardData[FL].efactor, grade);
    data.word = flashcardData[FL].word;
    data.id = flashcardData[FL].id;
    axios.put('/api/vocabAPI/updateVocablist', data)
    .then((res) => {
      if (FL + 1 >= flashcardData.length) {
        setRepeat(true);
      } else {
        setFlashcardIndex(FL + 1);
        setReveal(false)
      }
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const repeatOnClick = (e) => {
    // var id = setFlashcardData.user_id
    axios.get('/api/vocabAPI/getVocalListCurrentInterval', {
      params: {
        language: "Swedish",
        userID:props.userID
      }
    })
    .then((res) => {
      setFlashcardIndex(0);
      setFlashcardData(res.data);
      setRepeat(false);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <div>
      <Repeat onClick={repeatOnClick}>{repeat?"Complete! Retry?":null}</Repeat>
      <Title>Practice</Title>
      <Card>
        <Lang className="flashcard-word">{flashcardData[FL].word}</Lang>

        <English onClick={() => {reveal? setReveal(false): setReveal(true)}}>{reveal? flashcardData[FL].translation:"Reveal Translation"}</English>
        <PronuciationButton onClick={() => synthesizeSpeech()}>
                      <VolumeUpIcon />
                    </PronuciationButton>
        <Grade>
          <Button id="flashcard0" onClick={gradeOnclick}>Not Yet</Button>
          <Button id="flashcard3" onClick={gradeOnclick}>Almost</Button>
          <Button id="flashcard5" onClick={gradeOnclick}>Got it</Button>
        </Grade>
      </Card>
    </div>
  )
}
