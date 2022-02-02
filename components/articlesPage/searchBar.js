import React, { useState } from 'react';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState([]);

  let handleSearch = (e) => {
    setQuery(e.target.value);
  }
  return (
    <div>
      <form>
        <input onChange={(e) => { handleSearch(e); }}/>
        <button>Search</button>
      </form>
    </div>
  )
};