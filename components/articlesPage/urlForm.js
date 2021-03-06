import React, { useState } from 'react';
import axios from 'axios';
import formStyles from '../../styles/ArticleStyles/textForm.module.css';
import styled from 'styled-components';
import { useAppContext } from '../../pages/state.js';
import { TramRounded } from '@material-ui/icons';
import extractorAPIKEY from '../../anotherOne.js';

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

export default function UrlForm({ userID, setShowAdd }) {
  const [url, setUrl] = useState('');
  const [communitySharing, setCommunitySharing] = useState(true);
  const [urlText, setUrlText] = useState('');

  let handleChange = (e) => {
    if (e.target.id === 'url') {
      setUrl(e.target.value);
    }
    if (e.target.value === 'true') {
      setCommunitySharing(TramRounded);
    } else if (e.target.value === 'false') {
      setCommunitySharing(false);
    }
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    setShowAdd(false);
    axios({
      url: 'https://extractorapi.com/api/v1/extractor/',
      method: 'get',
      params: {
        apikey: extractorAPIKEY,
        url: url,
      },
      responseType: 'json',
    })
      .then((result) => {
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
            console.log('submitted results: ', results);
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
