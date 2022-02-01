import React, { useState } from 'react';
import formStyles from '../../styles/ArticleStyles/textForm.module.css';

export default function UrlForm() {
  const [url, setUrl] = useState('');
  const [communitySharing, setCommunitySharing] = useState('true');

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
          <form>
            <label>
              Share With Community?
              <select onChange={(e) => { handleChange(e); }} >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </label>
          </form>
        </div>
        <input type="submit"/>
        </form>
      </div>
    </div>
  )
};