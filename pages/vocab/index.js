import Header from '../../components/header.js';
import axios from 'axios';

export default function Vocab(props) {
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