import React, { useState } from 'react';
import axios from 'axios';
import formStyles from '../../styles/ArticleStyles/textForm.module.css';

export default function TextForm() {
  const [articleTitle, setArticleTitle] = useState('');
  const [source, setSource] = useState('');
  const [articleText, setArticleText] = useState('');
  const [communitySharing, setCommunitySharing] = useState('true');

  let handleChange = (e) => {
    if (e.target.id === 'title') {
      setArticleTitle(e.target.value);
    }
    if (e.target.id === 'source') {
      setSource(e.target.value);
    }
    if (e.target.id === 'text') {
      setArticleText(e.target.value);
    }
    if (e.target.value === 'true') {
      setCommunitySharing(e.target.value);
    } else if (e.target.value === 'false') {
      setCommunitySharing(e.target.value);
    }
  }

  // let handleSubmit = () => {
  //   axios.post('')
  // }

  return (
    <div>
      <div className={formStyles.submitForm}>
        <form>
          <div>
            <label>
              Article Title:
              <input id="title" onChange={(e) => { handleChange(e); }} type='text'/>
            </label>
          </div>
          <div>
            <label>
              Source:
              <input id="source" onChange={(e) => { handleChange(e); }} type='text'/>
            </label>
          </div>
          <div>
            <label>
              Text:
            </label>
            <textarea id="text" onChange={(e) => { handleChange(e); }} cols="50" rows="10" />
          </div>
        </form>
      </div>
      <div>
          <form>
            <label>
              Share With Community?
              <select onChange={(e) => { handleChange(e); }}>
                <option
                  id="0"
                  value="true">Yes</option>
                <option
                  id="1"
                  value="false">No</option>
              </select>
            </label>
          </form>
        </div>
      <button>Submit</button>
    </div>
  )
};