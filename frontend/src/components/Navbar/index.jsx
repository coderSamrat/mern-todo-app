import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaNoteSticky } from "react-icons/fa6";
import ProfileInfo from '../Cards/ProfileInfo';
import SearchBar from '../SearchBar';

const Navbar = ({ userInfo, searchNote, handleCloseSearch }) => {
      const [searchQuery, setSearchQuery] = useState('');
      const navigate = useNavigate();
      const [isLoggedIn, setIsLoggedIn] = useState(false);

      useEffect(() => {
            const token = localStorage.getItem('token');
            setIsLoggedIn(!!token);
      }, []);

      const onLogout = () => {
            localStorage.removeItem('token');
            setIsLoggedIn(false);
            navigate('/login');
      };

      const handleSearch = () => {
            if (searchQuery.trim()) {
                  searchNote(searchQuery.trim());
            }
      };

      const onClearSearch = () => {
            setSearchQuery('');
            handleCloseSearch();
      };

      return (
            <div className='navbar'>
                  <div className='flex justify-between w-full items-center'>
                        <span className='nav-title'>
                              <FaNoteSticky />
                              <h1 className="text-xl md:text-2xl font-bold">Notes</h1>
                        </span>

                        <div className="md:w-96 w-auto">
                              <SearchBar
                                    value={searchQuery}
                                    onChange={({ target }) => {
                                          setSearchQuery(target.value);
                                    }}
                                    handleSearch={handleSearch}
                                    onClearSearch={onClearSearch}
                              />
                        </div>

                        {isLoggedIn && <ProfileInfo userInfo={userInfo} onLogout={onLogout} />}
                  </div>
            </div>
      );
};

export default Navbar;
