import ArticleFeedItem from './ArticleFeedItem.js';

const feedContainerStyle = {
  width: '50%',
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '25%',
  justifyContent: 'center'
}

let sample = [
  {
    article_id: 0,
    url: 'http://localhost:3000',
    user_id: '1',
    title: 'The First Article',
    author: 'Dwyane The Rock Johnson',
    dateWritten: 'Jan-31-2022',
    dateUploaded: 'Jan-30-2022',
    public: true,
    publication: null,
    text: 'Sample Test 1 2 Sample Test 1 2, Sample Testing 3 4, Sample Testing 3 4',
  },
  {
    article_id: 1,
    url: 'http://localhost:3000',
    user_id: '2',
    title: 'The Second Article',
    author: 'Rick Astley',
    dateWritten: 'Jan-31-2022',
    dateUploaded: 'Jan-30-2022',
    public: true,
    publication: null,
    text: 'Sample Test 1 2 Sample Test 1 2, Sample Testing 3 4, Sample Testing 3 4',
  },
  {
    article_id: 2,
    url: 'http://localhost:3000',
    user_id: '3',
    title: 'The Third Article',
    author: 'Yo-Yo Ma',
    dateWritten: 'Jan-31-2022',
    dateUploaded: 'Jan-30-2022',
    public: false,
    publication: null,
    text: 'Sample Test 1 2 Sample Test 1 2, Sample Testing 3 4, Sample Testing 3 4',
  }
]

// from state, array of articles where either user_id === logged in user or public === true

export default function ArticlesFeed (props) {
  return (
    <div
    className="feedContainer"
    style={feedContainerStyle}>
    {sample.map(item =>
      <ArticleFeedItem
        data={item}
        key={item.article_id}/>
    )}
    </div>
  )
}