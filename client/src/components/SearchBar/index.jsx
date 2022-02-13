import React  from 'react';
import lens from '../../assets/images/lens.svg'

const SearchBar = ({setSearchWord}) => {
  // const [searchWord, setSearchWord] = useState("");
  return (
  <>
    <input type="text" className='searchbar' placeholder='Search for something'  onChange={(event) => setSearchWord(event.target.value)}/>
    <img className='lens' src={lens} alt="search icon" />
  </>
  )
}

export default SearchBar;