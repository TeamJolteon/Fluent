import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  justify-content: center;
  margin-right: 10px;
`;
export default function Search() {
  const [currentValue, setCurrentValue] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentValue('');
  };
  const handleChange = (e) => {
    setCurrentValue(e.target.value);
  };
  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <label>
        <input
          type='text'
          placeholder='Search Words'
          onChange={(e) => handleChange(e)}
          value={currentValue}
        />
      </label>
      <button type='submit'>Search</button>
    </Form>
  );
}
