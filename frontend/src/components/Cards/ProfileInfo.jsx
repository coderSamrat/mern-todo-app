import React from 'react';
import { getInitial } from '../../utils/helper.js';

const ProfileInfo = ({ userInfo, onLogout }) => {
      return (
            <div className='flex md:flex-row flex-col items-center gap-3'>
                  <div className='profile-info'>
                        {getInitial(userInfo?.fullname)}
                  </div>
                  <div className='text-center'>
                        <p className='text-sm font-medium hidden sm:block'>{userInfo?.fullname}</p>
                        <button
                              className='cursor-pointer text-sm text-slate-700 underline border-none outline-none '
                              onClick={onLogout}
                        >
                              Logout
                        </button>
                  </div>
            </div>
      );
};

export default ProfileInfo;
