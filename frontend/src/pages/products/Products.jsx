import React, { useEffect, useState } from 'react';
import Helmet from '../../components/Helmet';
import axios from 'axios';
import { Button } from '../../components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { getMe } from '../../features/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
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
  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/products');
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error, 'error');
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleDelete = async (id) => {
    confirm('Are you sure?');
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5000/products/${id}`);
      getProducts();
      toast.success(`${products.name} deleted successfully`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Helmet title="Products">
      <div>
        <h1 className="text-center text-3xl font-bold">Products</h1>
        <Button>
          <Link to="/products/add" className="flex items-center gap-2">
            Add Product <Plus />
          </Link>
        </Button>
        <div className="grid grid-cols-2 gap-4">
          {products.length > 0 ? (
            products?.map((item) => (
              <div
                key={item.id}
                className="p-4 shadow-lg max-w-[400px] flex flex-col gap-4 justify-between">
                <img
                  className="rounded-md w-full h-[300px] object-cover"
                  src={item.image_url}
                  alt={item?.name}
                />
                <p className="font-bold">{item?.name}</p>
                <p>{item.description.substring(0, 30)}</p>
                <Button onClick={() => navigate(`/products/edit/${item.id}`)}>Edit</Button>
                <Button variant="outline" onClick={() => handleDelete(item.id)}>
                  {loading ? 'Deleting...' : 'Delete'}
                </Button>
              </div>
            ))
          ) : (
            <div className="mt-16 flex flex-col justify-center items-center">
              <p className="font-bold">Belum ada produk</p>
            </div>
          )}
        </div>
      </div>
    </Helmet>
  );
};

export default Products;
