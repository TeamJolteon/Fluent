import Header from '../../components/header.js';
import SelectorNav from '../../components/articlesPage/collectionsNav.js';
import ArticlesFeed from '../../components/articlesPage/ArticlesFeed.js';

export default function Articles(props) {
  return (
    <div>
      <div>Articles</div>
      <SelectorNav/>
      <ArticlesFeed/>
    </div>
  )
};