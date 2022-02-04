import Header from '../../components/header.js';
import FlashcardIndex from '../../components/flashcards/flashcardindex.jsx';
import { getSession } from 'next-auth/client';
import {useAppContext} from '../state.js'
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';

export default function Flashcards(props) {
  const userID = useAppContext().data[0].id;
  const [id, setId] = useState(null);
  const [data, setData] = useState(props.data);

  useEffect(() => {
    const fetchUserArticles = () => {
      axios.get('/api/vocabAPI/getVocalListCurrentInterval', {
        params: {
          language: "Swedish",
          userID: userID
        }
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
    }
    fetchUserArticles();
  }, []);

  return (
    <div>
      <Header loggedin={true} />
      <FlashcardIndex data={data} userID={userID} />
    </div>
  );
}

export async function getServerSideProps(context) {

  const session = await getSession({ req: context.req });
  console.log(session);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {
      data: [
        {
          id: 1,
          word: 'asd',
          translation: 'Hej',
          efactor: 4,
          currentInterval: 1,
          repetition: 0,
          efactor: 1,
          currentInterval: 1,
          repetition: 5,
          efactor: 1,
          currentInterval: 1,
          repetition: 5,
        },
        {
          id: 2,
          word: 'Badrum',
          translation: 'Bathroom',
          efactor: 4,
          currentInterval: 1,
          repetition: 0,
        },
        {
          id: 3,
          word: 'Vatten',
          translation: 'Water',
          efactor: 4,
          currentInterval: 1,
          repetition: 1,
        },
        {
          id: 3,
          word: 'Vatten',
          translation: 'Water',
          efactor: 5,
          currentInterval: 1,
          repetition: 10,
        },
      ],
    },
  };
}

// {
//   word: word,
//   word_id: interger,
//   currentInterval: nextInterval,
//   repetition: nextRepetition,
//   efactor: nextEfactor
// };
