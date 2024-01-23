import React, { useEffect, useState } from 'react';
import Helmet from '../components/Helmet';
import Modals from '../components/Categories/Modals';
import axios from 'axios';
import ModalEdit from '../components/Categories/ModalEdit';
import {Button} from '../components/ui/button';
import { getMe } from '../features/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const getCategories = async () => {
    const response = await axios.get('http://localhost:5000/categories');
    setCategories(response.data);
  };
  useEffect(() => {
    getCategories();
  }, []);


  const handleDelete = async (id) => {
    confirm('Are you sure?');
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5000/categories/${id}`);
      getCategories();
      toast.success(`${categories.name} deleted successfully`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Helmet title="Category">
      <h1 className="text-center text-3xl font-bold">Category</h1>
      <div className="">
        <div>
          <Modals title="Add Category" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {categories.map((category) => (
            <div key={category.id} className="p-4 shadow-lg max-w-[400px] flex flex-col gap-4 justify-between">
              <img
                className="rounded-md w-full h-[300px] object-cover"
                src={category.image_url}
                alt={category.name}
              />
              <p className="font-bold">{category.name}</p>
              <p>{category.description.substring(0, 30)}</p>
              <ModalEdit title="Edit Category" id={category.id} />
              <Button variant="outline" onClick={() => handleDelete(category.id)}>{loading ? 'Deleting...' : 'Delete'}</Button>
            </div>
          ))}
        </div>
      </div>
    </Helmet>
  );
};

export default Category;
