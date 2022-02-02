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
    text: 'Do you smell what the Rock is cooking???',
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
    text: 'We\'re no strangers to love. You know the rules, and so do I. ',
  },
  {
    article_id: 2,
    url: 'http://localhost:3000',
    user_id: '3',
    title: 'The Third Article',
    author: 'Jack Sparrow',
    dateWritten: 'Jan-31-2022',
    dateUploaded: 'Jan-30-2022',
    public: false,
    publication: null,
    text: 'You will remember today as the day you almost caught Captain Jack Sparrow.',
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