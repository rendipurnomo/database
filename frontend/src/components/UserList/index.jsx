import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getMe } from '../../features/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const UserList = () => {
  const [customers, setCustomers] = useState([]);

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

    useEffect(() => {
      const getCustomers = async () => {
        const response = await axios.get('http://localhost:5000/customers');
        setCustomers(response.data);
      };
      getCustomers();
    }, []);
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              User name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Address
            </th>
            <th scope="col" className="px-6 py-3">
              Phone
            </th>
          </tr>
        </thead>
        <tbody>
            {customers.map((customer) => (
          <tr key={customer.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {customer.first_name} {customer?.last_name}
            </th>
            <td className="px-6 py-4">{customer.email}</td>
            <td className="px-6 py-4">{customer.address}</td>
            <td className="px-6 py-4">{customer.phone}</td>
            </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList