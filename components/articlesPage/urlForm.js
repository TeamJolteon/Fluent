import React, { useState } from 'react';
import axios from 'axios';
import formStyles from '../../styles/ArticleStyles/textForm.module.css';
import { extractorAPIKEY } from '../../config.js';
import styled from 'styled-components';
import { useAppContext } from '../../pages/state.js'

const SubmitArticles = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const Form = styled.form``;
const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin: 3px 20px;
  align-items: center;
  letter-spacing: 1px;
  padding-top: 6px;
`;
const Button = styled.button`
  padding: 10px;
  display: block;
  margin: 0 auto;
  border: none;
  cursor: pointer;
  background-color: #9cbfa7;
  color: #413a3e;
  border-radius: 4px;
  font-size: 1rem;
  letter-spacing: 1px;
  &:hover {
    background-color: #d2d9da;
  }
`;
const Input = styled.input`
  background-color: #d2d9da;
  border: none;
  outline: none;
  padding: 2px;
  border-radius: 4px;
  margin: 3px 15px;
  width: 300px;
`;

const Select = styled.select`
  background-color: #413a3e;
  color: #f8f9f0;
  border-radius: 4px;
  margin: 0px 10px;
  letter-spacing: 1px;
`;
const ShareForm = styled.form`
  display: flex;
  flex-direction: row;
  padding: 10px;
`;
const ShareLabel = styled.label`
  display: flex;
  flex-direction: row;
  margin: 3px 15px;
  letter-spacing: 1px;
  padding: 10px 0;
  justify-content: center;
`;
export default function UrlForm({ userID }) {
  const [url, setUrl] = useState('');
  const [communitySharing, setCommunitySharing] = useState(true);
  const [urlText, setUrlText] = useState('');

  const userID = useAppContext().data[0].id;

  let handleChange = (e) => {
    if (e.target.id === 'url') {
      setUrl(e.target.value);
    }
    if (e.target.value === 'true') {
      setCommunitySharing(e.target.value);
    } else if (e.target.value === 'false') {
      setCommunitySharing(e.target.value);
    }
  };

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
        url: url,
      },
      responseType: 'json',
    })
      .then((result) => {
        console.log('urlFORM', result.data);
        console.log('Text type: ', typeof result.data.text);
        // setUrlText(result.data.text);
        let newDate = new Date().toISOString().slice(0, 10);
        let publishDate = result.data.date_published
          ? result.data.date_published.toString().slice(0, 10)
          : newDate;
        axios
          .post('http://localhost:3000/api/articlesAPI/postNewArticles', {
            user_id: userID,
            url: result.data.url,
            title: result.data.title,
            date_written: publishDate,
            date_uploaded: newDate,
            Public: communitySharing,
            publication: result.data.domain,
            text: result.data.text,
            userUploaded: true,
          })
          .then((results) => {
            console.log('results', results);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <SubmitArticles>
      <div>
        <Form>
          <div>
            <Label>
              URL
              <Input
                onChange={(e) => {
                  handleChange(e);
                }}
                id='url'
                type='text'
              />
            </Label>
          </div>
          <div>
            <div>
              <ShareLabel>
                Share With Community?
                <Select
                  onChange={(e) => {
                    handleChange(e);
                  }}
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </Select>
              </ShareLabel>
            </div>
          </div>
          <Button
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Submit
          </Button>
        </Form>
      </div>
    </SubmitArticles>
  );
}

// "(CNN)Weeks after she announced the postponement of her eagerly awaited Las Vegas residency, Adele has shared a few places where she can be seen. The singer posted on her verified Instagram account Tuesday that she plans to perform on the Brit Awards next week and will appear on an upcoming episode of the \"The Graham Norton Show.\" \"Hiya, so I'm really happy to say that I am performing at the Brits next week!!,\" she wrote in the caption of a photo showing her smiling. \"Anddddd I'll also be popping in to see Graham for a chat on the couch while I'm in town too!\" Some who commented on her post expressed frustration over the delayed Vegas shows. \"What about all of us that are still waiting over here with our Vegas tickets that we can't get a refund on and can't resell because you haven't set a date,\" one person wrote. \"Please @adele figure out what you are doing for the sake of all your fans that are sitting on thousands of worthless hotel, airfare, and tickets.\" Adele broke hearts (and some pockets, apparently) when she posted a video on social media just before her first Vegas show was set to debut that the she had to postpone. \"I'm so sorry but my show ain't ready,\" she said. \"Half my crew, half my team is down with Covid. They still are, and it's been impossible to finish the show. And I can't give you what I have right now, and I'm gutted.\" In her Tuesday post Adele also took a swipe at reports that she and her boyfriend Rich Paul have hit a rough patch, cheekily writing \"Oh, and Rich sends his love.\"",
