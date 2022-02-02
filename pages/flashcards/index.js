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
          word_id: 5,
          word: 'great',
          translation: 'cool',
          efactor: 4,
          currentInterval: 1,
          repetition: 0,
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
