import React from 'react';
import lens from '../../assets/images/lens.svg'

const SearchBar = () => {
  return (
  <>
    <input className='searchbar' placeholder='Search for something' />
    <img className='lens' src={lens} alt="search icon" />
  </>
  )
}

export default SearchBar;