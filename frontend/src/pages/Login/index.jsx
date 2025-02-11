import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from '../../components/Inputs/PasswordInput';
import { validateEmail } from '../../utils/helper.js';
import axiosInstance from '../../utils/axiosInstance.js';

const Login = () => {

      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [error, setError] = useState(null);

      const navigate = useNavigate();

      const handleLogin = async (e) => {
            e.preventDefault();
            if (!email) {
                  setError("Email is required");
                  return;
            }
            if (email) {
                  if (!validateEmail(email)) {
                        setError("Invalid email address");
                        return;
                  }
            }
            if (!password) {
                  setError("Password is required");
                  return;
            }
            setError(null);

            // API integration
            try {
                  const response = await axiosInstance.post('/api/v1/users/login', {
                        email: email,
                        password: password
                  });

                  if (response.data && response.data.token) {
                        localStorage.setItem("token", response.data.token);
                        navigate('/dashboard');
                  }
            } catch (error) {
                  if (error.response && error.response.data && error.response.data.message) {
                        setError(error.response.data.message);
                  } else {
                        setError("Something went wrong, please try again later.");
                  }
            }
      };

      return (
            <>
                  <Navbar />
                  <div className='login-container'>
                        <div className='login-component'>
                              <form onSubmit={handleLogin} className='login-form'>
                                    <h1 className='login-title'>Log In</h1>
                                    <input
                                          type='text'
                                          placeholder='Email'
                                          className='input-box'
                                          value={email}
                                          onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <PasswordInput
                                          value={password}
                                          onChange={(e) => setPassword(e.target.value)}
                                          placeholder='Password'
                                    />
                                    {error && <p className='text-sm text-red-500 pb-1'>{error}</p>}
                                    <button type='submit' className='btn-primary'>Log In</button>
                                    <p className='text-sm text-center mt-4'>
                                          Not registered yet? {" "}
                                          <Link to={'/signup'} className='font-medium text-primary underline'>Create an account</Link>
                                    </p>
                              </form>
                        </div>
                  </div>
            </>
      );
};

export default Login;
