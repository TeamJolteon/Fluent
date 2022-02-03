import React, { useState } from 'react';
import axios from 'axios';
import formStyles from '../../styles/ArticleStyles/textForm.module.css';
import { extractorAPIKEY } from '../../config.js';



export default function UrlForm() {
  const [url, setUrl] = useState('');
  const [communitySharing, setCommunitySharing] = useState(true);
  const [urlText, setUrlText] = useState('');

  let handleChange = (e) => {
    if (e.target.id === 'url') {
      setUrl(e.target.value);
    }
    if (e.target.value === 'true') {
      setCommunitySharing(e.target.value);
    } else if (e.target.value === 'false') {
      setCommunitySharing(e.target.value);
    }
  }

  let handleSubmit = (e) => {

    e.preventDefault();
    axios({
      url: 'https://extractorapi.com/api/v1/extractor/',
      method: 'get',
      // headers: {
      //   'Access-Control-Allow-Origin' : "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      // },
      params: {
        apikey: extractorAPIKEY,
        url: url
      },
      responseType: 'json'
    })
    .then((result) => {
      console.log('urlFORM', result.data);
      console.log('Text type: ', typeof result.data.text);
      // setUrlText(result.data.text);
      let newDate = new Date().toISOString().slice(0, 10);
      let publishDate = result.data.date_published ? result.data.date_published.toString().slice(0, 10) : newDate;
      axios.post('http://localhost:3000/api/articlesAPI/postNewArticles', {
        "user_id": 1,
        "url": result.data.url,
        "title": result.data.title,
        "date_written": publishDate,
        "date_uploaded": newDate,
        "Public": communitySharing,
        "publication": result.data.domain,
        "text": result.data.text,
        "userUploaded":true
      })
      .then((results) => {
        console.log('results', results);
      })
      .catch((error) => {
        console.error(error);
      })
    }).catch(error => {
      console.error(error);
    })
  }

  return (
    <div className={formStyles.submitForm}>
      <div>
        <form>
          <div>
            <label>
              URL:
              <input onChange={(e) => { handleChange(e); }} id='url' type='text'/>
            </label>
          </div>
          <div>
          <div>
            <label>
              Share With Community?
              <select onChange={(e) => { handleChange(e); }} >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </label>
          </div>
        </div>
        <button onClick={(e) => { handleSubmit(e); }} >Submit</button>
        </form>
      </div>
    </div>
  )
};

// "(CNN)Weeks after she announced the postponement of her eagerly awaited Las Vegas residency, Adele has shared a few places where she can be seen. The singer posted on her verified Instagram account Tuesday that she plans to perform on the Brit Awards next week and will appear on an upcoming episode of the \"The Graham Norton Show.\" \"Hiya, so I'm really happy to say that I am performing at the Brits next week!!,\" she wrote in the caption of a photo showing her smiling. \"Anddddd I'll also be popping in to see Graham for a chat on the couch while I'm in town too!\" Some who commented on her post expressed frustration over the delayed Vegas shows. \"What about all of us that are still waiting over here with our Vegas tickets that we can't get a refund on and can't resell because you haven't set a date,\" one person wrote. \"Please @adele figure out what you are doing for the sake of all your fans that are sitting on thousands of worthless hotel, airfare, and tickets.\" Adele broke hearts (and some pockets, apparently) when she posted a video on social media just before her first Vegas show was set to debut that the she had to postpone. \"I'm so sorry but my show ain't ready,\" she said. \"Half my crew, half my team is down with Covid. They still are, and it's been impossible to finish the show. And I can't give you what I have right now, and I'm gutted.\" In her Tuesday post Adele also took a swipe at reports that she and her boyfriend Rich Paul have hit a rough patch, cheekily writing \"Oh, and Rich sends his love.\"",
