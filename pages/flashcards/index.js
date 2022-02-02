import Header from '../../components/header.js';
import FlashcardIndex from '../../components/flashcards/flashcardindex.jsx';
import { getSession } from 'next-auth/client';

export default function Flashcards(props) {
  return (
    <div>
      <Header loggedin={true} />
      <FlashcardIndex data={props.data} />
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
          word: 'Tack',
          translation: 'Thank you',
<<<<<<< HEAD
<<<<<<< HEAD
          efactor: 4,
          currentInterval: 1,
          repetition: 0,
=======
          efactor: 1,
          currentInterval: 1,
          repetition: 5,
>>>>>>> cfa900b27a6f4bc749a2fd5e45988e74d2238f2a
=======
          efactor: 1,
          currentInterval: 1,
          repetition: 5,
>>>>>>> 04890bfff6b8956bc600130fd95d23adb2e4ab43
        },
        {
          id: 2,
          word: 'Badrum',
          translation: 'Bathroom',
<<<<<<< HEAD
<<<<<<< HEAD
          efactor: 4,
          currentInterval: 1,
          repetition: 0,
        },
        {
          id: 3,
          word: 'Vatten',
          translation: 'Water',
=======
>>>>>>> cfa900b27a6f4bc749a2fd5e45988e74d2238f2a
=======
>>>>>>> 04890bfff6b8956bc600130fd95d23adb2e4ab43
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
