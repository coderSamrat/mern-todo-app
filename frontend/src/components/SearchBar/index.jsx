import React from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
      return (
            <div className='search-bar flex w-full'>
                  <input
                        type='text'
                        placeholder='Search your notes...'
                        className='search-input w-full'
                        value={value}
                        onChange={onChange}
                  />
                  {value && (
                        <IoMdClose className='clear-icon' onClick={onClearSearch} />
                  )}
                  <FaMagnifyingGlass className='search-icon' onClick={handleSearch} />
            </div>
      );
};

export default SearchBar;
