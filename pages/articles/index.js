import Header from '../../components/header.js';
import SpotlightComponent from '../../components/spotlight/spotlight.js';
import axios from 'axios';
import SelectorNav from '../../components/articlesPage/collectionsNav.js';
import ArticlesFeed from '../../components/articlesPage/ArticlesFeed.js';
import { getSession } from 'next-auth/client';

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
      <Header loggedin={true} />
      <SelectorNav />
      <ArticlesFeed />
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
      product: 'coffee',
    },
  };
}

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
