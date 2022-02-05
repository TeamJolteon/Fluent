import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useAppContext } from '../../pages/state.js';

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

const TextArea = styled.textarea`
  background-color: #d2d9da;
  border: none;
  outline: none;
  padding: 2px;
  border-radius: 4px;
  width: 300px;
  margin: 3px 34px;
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
`;

export default function TextForm(props) {
  const [articleTitle, setArticleTitle] = useState('');
  const [source, setSource] = useState('');
  const [articleText, setArticleText] = useState('');
  const [communitySharing, setCommunitySharing] = useState(true);

  const userID = useAppContext().data[0].id;

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
    if (e.target.value === true) {
      setCommunitySharing(e.target.value);
    } else if (e.target.value === false) {
      setCommunitySharing(e.target.value);
    }
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    let newDate = new Date().toISOString().slice(0, 10);
    axios
      .post('http://localhost:3000/api/articlesAPI/postNewArticles', {
        user_id: userID,
        url: source,
        title: articleTitle,
        date_written: '2022-02-01',
        date_uploaded: newDate,
        Public: communitySharing,
        publication: 'BBC',
        text: articleText,
        userUploaded: true,
      })
      .then((response) => {
        props.setShowAdd(false);
      });
  };

  return (
    <SubmitArticles>
      <div>
        <Form>
          <div>
            <Label>
              Article Title
              <Input
                id='title'
                onChange={(e) => {
                  handleChange(e);
                }}
                type='text'
              />
            </Label>
          </div>
          <div>
            <Label>
              Source
              <Input
                id='source'
                onChange={(e) => {
                  handleChange(e);
                }}
                type='text'
              />
            </Label>
          </div>
          <div>
            <Label>Text</Label>
            <TextArea
              id='text'
              onChange={(e) => {
                handleChange(e);
              }}
              cols='50'
              rows='10'
            />
          </div>
        </Form>
      </div>
      <div>
        <ShareForm>
          <ShareLabel>
            Share With Community?
            <Select
              onChange={(e) => {
                handleChange(e);
              }}
            >
              <option id='0' value={true}>
                Yes
              </option>
              <option id='1' value={false}>
                No
              </option>
            </Select>
          </ShareLabel>
        </ShareForm>
      </div>
      <Button
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        Submit
      </Button>
    </SubmitArticles>
  );
}
