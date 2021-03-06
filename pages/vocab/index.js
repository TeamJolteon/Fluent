/* eslint-disable react-hooks/exhaustive-deps */
import Header from '../../components/header.js';
import axios from 'axios';
import VocabList from '../../components/VocabList/VocabList.js';
import { getSession } from 'next-auth/client';
import { useAppContext } from '../state.js';
import { useState, useEffect } from 'react';

export default function Vocab(props) {
  const userID = useAppContext().data[0].id;
  const initialLanguage = useAppContext().data[0].default_language;
  const [language, setLanguage] = useState(null);

  useEffect(() => {
    if (language === null) {
      setLanguage(initialLanguage);
    }
  });

  return (
    <div>
      <Header loggedin={true} language={language} setLanguage={setLanguage} />
      <VocabList userID={userID} language={language} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
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
          word: 'Tack',
          translation: 'Thank you',
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
