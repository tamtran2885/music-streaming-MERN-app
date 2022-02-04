import React, { useState } from 'react';
import lens from '../../assets/images/lens.svg'

const SearchBar = () => {
  const [searchWord, setSearchWord] = useState("");
  return (
  <>
    <input className='searchbar' placeholder='Search for something'  onChange={(event) => setSearchWord(event.target.value)}/>
    <img className='lens' src={lens} alt="search icon" />
  </>
  )
}

export default SearchBar;