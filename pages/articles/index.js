import Header from '../../components/header.js';
import SpotlightComponent from '../../components/spotlight/spotlight.js';
import axios from 'axios';
import SelectorNav from '../../components/articlesPage/collectionsNav.js';

export default function Articles(props) {
  // axios
  // .get('/api/articlesAPI/getAllArticles')
  // .then((response) => {
  //   console.log('response: ', response.data);

  // })
  // .catch((e) => {
  //   console.log(e);
  // });
  return (
    <div>
      <Header />
      <div>Articles</div>
      <SelectorNav />
      <SpotlightComponent />
    </div>
  );
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
