import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const PasswordInput = ({value, onChange, placeholder}) => {

      const [showPassword, setShowPassword] = useState(false);
      
      const handlePasswordToggle = () => setShowPassword(!showPassword);

      return (
            <div className='flex items-center bg-transparent border-[1.5px] border-gray-300 rounded px-5 mb-3'>
                  <input 
                        type={showPassword ? "text" : "password"}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder || "Password"}
                        className='w-full bg-transparent py-3 mr-3 text-sm rounded outline-none'
                  />
                  {
                        showPassword ? (
                              <FaRegEye
                                    size={22}
                                    className='cursor-pointer text-primary'
                                    onClick={() => handlePasswordToggle()}
                              />
                        ) : (
                              <FaRegEyeSlash 
                                    size={22}
                                    className='cursor-pointer text-slate-400'
                                    onClick={() => handlePasswordToggle()}
                              />
                        )
                  }
            </div>
      );
};

export default PasswordInput;
