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
          word_id:5,
          word:"great",
          translation:"cool",
          efactor:4,
          currentInterval:1,
          repetition:0
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
