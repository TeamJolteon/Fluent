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
    url: 'http://localhost:3000',
    user_id: '3',
    title: 'The Third Article',
    author: 'Yo-Yo Ma',
    dateWritten: 'Jan-31-2022',
    dateUploaded: 'Jan-30-2022',
    public: true,
    publication: null,
    text: 'Sample Test 1 2 Sample Test 1 2, Sample Testing 3 4, Sample Testing 3 4',
  }
]
export default function ArticlesFeed (props) {
  return (
    <div
      className="feedContainer"
      style={feedContainerStyle}>
        <ArticleFeedItem sampleData={sample[0]}/>
        <ArticleFeedItem sampleData={sample[1]}/>
        <ArticleFeedItem sampleData={sample[2]}/>
    </div>
  )
}


{/* <div
className="feedContainer"
style={feedContainerStyle}>
{sample.map(item => {
  <ArticleFeedItem
    url={item.url}
    user_id={item.user_id}
    title={item.title}
    author={item.author}
    dateWritten={item.dateWritten}
    dateUploaded={item.dateUploaded}
    public={item.public}
    publication={item.publication}
    text={item.text}/>
})}
</div> */}