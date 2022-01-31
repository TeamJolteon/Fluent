import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function FlashcardIndex (props) {
  const [reveal, setReveal] = useState(false);
  const [flashcardData, setFlashcardData] = useState(props.data);
  const [FL, setFlashcardIndex] = useState(0); //FL means flashcard index;

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
    <div className="flashcard">
      <div className="flashcard-word">{flashcardData[FL].word}</div>
      <div className="flashcard-translation" onClick={() => {reveal? setReveal(false): setReveal(true)}}>{reveal? flashcardData[FL].translation:"Reveal Translation"}</div>
      <div className="flashcard-grade">
        <div id="flashcard0" onClick={gradeOnclick}>Sorry</div>
        <div id="flashcard1" onClick={gradeOnclick}>Not Really</div>
        <div id="flashcard2" onClick={gradeOnclick}>Barely</div>
        <div id="flashcard3" onClick={gradeOnclick}>Fair</div>
        <div id="flashcard4" onClick={gradeOnclick}>Almost</div>
        <div id="flashcard5" onClick={gradeOnclick}>Perfect</div>
      </div>
    </div>
  )
}