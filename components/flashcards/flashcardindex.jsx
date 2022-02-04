import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import AZURE from '../../config';

const Button = styled.button`
  cursor: pointer;
  border: none;
  background-color: #F8F9F0
  color: #413A3E;
  border-radius: 4px;
  padding: 10px;
  font-size: 1rem;
  letter-spacing: 1px;
  width: 140px;
  &:hover {
    background-color: #9CBFA7;
  }
`;

// const Card = styled.div `
//   border: 10px solid #9CBFA7;
//   max-width: 600px;
//   margin: 0 auto;
//   text-align: center;
//   height: 300px;
//   padding: 15px;
//   box-shadow: 0 2px 10px 0;
//   color: #F8F9F0;
//   background-color: #413A3E;
// `;
const Card = styled.div `
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  padding: 15px;
  box-shadow: 0 5px 20px 0 #413A3E;
  color: #F8F9F0;
  background-color: #413A3E;
  border: 1px solid #413A3E;
`;
const Inbord = styled.div `
  background-color: #413A3E;
  border: 10px double #A5B5B6;
  padding: 30px;
`
const Title = styled.h1`
  display: flex;
  justify-content: center;
  letter-spacing: 1px;
  font-size: 36px;
`;
const Lang = styled.div`
  font-size: 3em;
  letter-spacing: 2px;
`
const English = styled.div `
  margin: 15px;
  font-size: 1.5em;
  margin-top: 25px;
  letter-spacing: 1px;
  cursor: pointer;
  &:hover {
    color: #A5B5B6;
  }
`;

const Repeat = styled.div `
  margin: 15px;
  font-size: 1.5em;
  font-family: "Roboto", sans-serif;
  text-align: center;
`;

const Grade = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 25px;

`;
const Complete = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 2rem;
    font-size: x-large;
`;
const Body = styled.div`
  font-family: 'Roboto', sans-serif;
  color: #413a3e;
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 2rem;
`;
const PronuciationButton = styled.button`
  border: none;
  background-color: #413A3E;
  margin-top: 10px;
  color: #F8F9F0;
  cursor: pointer;
  &:hover {
    color: #A5B5B6;
  }
`;
// white F8F9F0
// gray A5B5B6
// coffee 413A3E
// cambridge blue 9CBFA7
// red 762d38
export default function FlashcardIndex (props) {
  const [reveal, setReveal] = useState(false);
  const [flashcardData, setFlashcardData] = useState(props.data);
  const [FL, setFlashcardIndex] = useState(0); //FL means flashcard index;
  const [repeat, setRepeat] = useState(false);

  useEffect(() => {
    setFlashcardData(props.data);
    console.log(flashcardData);
  }, [props.data])

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
    <Body>
    <Title>Practice</Title>
    <Complete className="flashcard-repeat" onClick={repeatOnClick}>{repeat?"Complete! Retry?":null}</Complete>
    <Card>
    <Inbord>
      <Lang className="flashcard-word">{flashcardData[FL]? flashcardData[FL].word:null}</Lang>
      <English onClick={() => {reveal? setReveal(false): setReveal(true)}}>{reveal? flashcardData[FL].translation:"Reveal Translation"}</English>
      <PronuciationButton onClick={() => synthesizeSpeech()}>
                    <VolumeUpIcon />
                  </PronuciationButton>
      <Grade>
      <Button id="flashcard5" onClick={gradeOnclick}>Got it</Button>
      <Button id="flashcard3" onClick={gradeOnclick}>Almost</Button>
        <Button id="flashcard0" onClick={gradeOnclick}>Not Yet</Button>
      </Grade>
      </Inbord>
    </Card>
    </Body>
  )
}
