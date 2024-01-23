import React, { useEffect } from 'react'
import Helmet from '../components/Helmet';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const Order = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

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
    <Helmet title="Order">
      <div>
        <h1 className="text-3xl font-bold text-center">Order</h1>
      </div>
    </Helmet>
  )
}

export default Order