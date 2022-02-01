import Header from '../../components/header.js';
import FlashcardIndex from '../../components/flashcards/flashcardindex.jsx'

export default function Flashcards(props) {
  return (
    <div>
      <FlashcardIndex data={props.data}/>
    </div>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      data: [
        {
        userid: 1,
        word:"Great!",
        word_id:1,
        currentInterval: 1,
        repetition: 0,
        efactor: 2.5
        },
        {
          userid: 1,
          word:"What!",
          word_id:1,
          currentInterval: 1,
          repetition: 0,
          efactor: 2.5
          }
      ]
    }
  }
}

// {
//   word: word,
//   word_id: interger,
//   currentInterval: nextInterval,
//   repetition: nextRepetition,
//   efactor: nextEfactor
// };
