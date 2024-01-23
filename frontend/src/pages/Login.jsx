import React, { useEffect, useState } from 'react';
import Helmet from '../components/Helmet';
import { Button } from '../components/ui/button';
import Logo from '../components/ui/Logo';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LoginUser, reset } from '../features/authSlice';
import {toast} from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isError, isLoading, user, message } = useSelector(
    (state) => state.auth
  );

  if (isError) {
    toast.error(message);
  }
  useEffect(() => {
    if (user && user.role === 'admin') {
      navigate('/');
    }
    dispatch(reset());
  }, [user, isError, message, navigate, dispatch]);
  
  const Auth = async(e) => {
    e.preventDefault();
    dispatch(LoginUser({email, password}));
    }
  return (
    <Helmet title="Login">
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="flex items-center justify-center flex-col">
          <Logo />
          <h1 className="text-3xl font-semibold">Login</h1>
        </div>
        <div className="shadow-lg p-8 rounded-md min-w-[500px]">
          <form onSubmit={Auth} className="flex flex-col gap-4">
            {isError && <p className="text-red-500 text-center">{message}</p>}
            <div className="flex flex-col gap-1">
              <label className="font-semibold" htmlFor="email">
                Email
              </label>
              <input
                className="outline-1 outline-primary w-full border-gray-400 border-[1px] rounded-md p-2"
                type="email"
                name="email"
                id="username"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={isLoading}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold" htmlFor="password">
                Password
              </label>
              <input
                className="outline-1 outline-primary w-full border-gray-400 border-[1px] rounded-md p-2"
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                disabled={isLoading}
              />
            </div>
            <div>
              <Button
                disabled={isLoading}
                className="w-full"
                size="lg"
                type="submit">
                {isLoading ? 'Loading...' : 'Login'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Helmet>
  );
};

export default Login;
