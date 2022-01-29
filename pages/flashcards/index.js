import Header from '../../components/header.js';

export default function Flashcards(props) {
  return (
    <div></div>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      product: 'coffee'
    }
  }
}