import Header from '../../components/header.js';
import SpotlightComponent from '../../components/spotlight/spotlight.js';
import axios from 'axios';
import SelectorNav from '../../components/articlesPage/collectionsNav.js';
import ArticlesFeed from '../../components/articlesPage/ArticlesFeed.js';

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
    <div>
      <div>Articles</div>
      <SelectorNav/>
      <ArticlesFeed/>
    </div>
  )
}

// export async function getServerSideProps(context) {
//   return {
//     props: {
//       product: 'coffee',
//     },
//   };
// }

// setup on testing
// import axios from 'axios';
// import SelectorNav from '../../components/articlesPage/collectionsNav.js';

// export default function Articles(props) {
//     axios
//     .get('/api/articlesAPI/getAllArticles')
//     .then((response) => {
//       console.log('response: ', response.data);

//     })
//     .catch((e) => {
//       console.log(e);
//     });
//   return (
//     <div>
//       <div>Articles</div>
//       <SelectorNav/>
//     </div>
//   )
// };
