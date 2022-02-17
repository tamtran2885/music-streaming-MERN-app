import React  from 'react';
import lens from '../../assets/images/lens.svg'

const SearchBar = ({setSearchWord, searchWord, searchTracks}) => {
  return (
  <>
    <input type="text" value={searchWord} className='searchbar' placeholder='Search for something'  onChange={(event) => setSearchWord(event.target.value)}/>
    <img className='lens' src={lens} alt="search icon" onClick={searchTracks} />
  </>
  )
}

export default SearchBar;