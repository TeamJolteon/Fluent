import Header from '../../components/header.js';
import axios from 'axios';

export default function Articles(props) {
    axios
    .get('/api/articlesAPI/getAllArticles')
    .then((response) => {
      console.log('response: ', response.data);

    })
    .catch((e) => {
      console.log(e);
    });
  return (
    <div>Articles</div>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      product: 'coffee'
    }
  }
}

// setup on testing