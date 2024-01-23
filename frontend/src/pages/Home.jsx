import React, { useEffect, useState } from 'react';
import Helmet from '../components/Helmet';
import axios from 'axios';
import UserList from '../components/UserList';
import { getMe } from '../features/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    if(isError) {
      navigate('/login');
    }
  }, [isError, navigate]);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

    return (
      <Helmet title="Home">
        <div>
          <UserList />
        </div>
      </Helmet>
    );

}

export default Home;
