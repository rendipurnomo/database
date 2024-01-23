import React, { useEffect, useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { StepBack } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { getMe } from '../../features/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const EditProducts = () => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');
  const [rating, setRating] = useState('');
  const [category_id, setCategory_id] = useState('');
  const [categories, setCategories] = useState([]);
  const [original_price, setOriginal_price] = useState('');
  const [discount_price, setDiscount_price] = useState('');
  const [file, setFile] = useState('');
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

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

  const getProductById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/products/${id}`);
      if(response.data === null) {
        return
      }
      if(response.data.image) {
        setFile(response.data.image)
      }

      if(response.data.image_url) {
        setPreview(response.data.image_url)
      }

      if(response.data.name) {
        setName(response.data.name)
      }

      if(response.data.brand) {
        setBrand(response.data.brand)
      }

      if(response.data.description) {
        setDescription(response.data.description)
      }

      if(response.data.stock) {
        setStock(response.data.stock)
      }

      if(response.data.rating) {
        setRating(response.data.rating)
      }

      if(response.data.category_id) {
        setCategory_id(response.data.category_id)
      }

      if(response.data.originalPrice) {
        setOriginal_price(response.data.originalPrice)
      }

      if(response.data.discountPrice) {
        setDiscount_price(response.data.discountPrice)
      }
    } catch (error) {
      console.log(error, 'error');
    }
  };

  useEffect(() => {
    getProductById();
  }, []);

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };


  const getCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/categories');
      return response.data;
    } catch (error) {
      console.log(error, 'error');
    }
  };

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  const handleEdit = async (e) => {
    e.preventDefault();

    if (
      !name ||
      !brand ||
      !description ||
      !stock ||
      !rating ||
      !category_id ||
      !original_price ||
      !discount_price
    ) {
      toast.error('Please fill in all fields');
      return;
    }
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('name', name);
      formData.append('brand', brand);
      formData.append('description', description);
      formData.append('stock', stock);
      formData.append('rating', rating);
      formData.append('category_id', category_id);
      formData.append('original_price', original_price);
      formData.append('discount_price', discount_price);
      formData.append('file', file);
      await axios.patch(`http://localhost:5000/products/${id}`, formData);
      setLoading(false);
      toast.success('Product saved successfully');
      navigate('/products');
    } catch (error) {
      console.log(error, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold my-5 text-center">
        Edit Product {name}
      </h1>
      <Button
        variant="outline"
        className="mb-5"
        onClick={() => navigate('/products')}>
        <StepBack size={18} className="mr-2 text-primary" /> Back to All
        Products
      </Button>
      <form onSubmit={handleEdit} className="flex flex-col gap-4">
        <div className="flex gap-8 items-center">
          <Label htmlFor="name" className="w-1/6">
            Name
          </Label>
          <Input
            id="name"
            type="text"
            disabled={loading}
            className="col-span-3"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="flex gap-8 items-center">
          <Label htmlFor="category_id" className="w-1/6">
            Category
          </Label>
          <select
            name="category_id"
            id="category_id"
            disabled={loading}
            className="col-span-3 border-[1px] border-slate-200 rounded-md h-11 px-2 w-full"
            onChange={(e) => setCategory_id(e.target.value)}>
            {categories &&
              categories.map((category) => (
                <option key={category.id} value={parseInt(category.id)}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <div className="flex gap-8 items-center">
          <Label htmlFor="brand" className="w-1/6">
            Brand
          </Label>
          <Input
            id="brand"
            type="text"
            disabled={loading}
            className="col-span-3"
            onChange={(e) => setBrand(e.target.value)}
            value={brand}
          />
        </div>
        <div className="flex gap-8 items-center">
          <Label htmlFor="description" className="w-1/6">
            Description
          </Label>
          <Input
            id="description"
            type="text"
            disabled={loading}
            className="col-span-3"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <div className="flex gap-8 items-center">
          <Label htmlFor="stock" className="w-1/6">
            Stock
          </Label>
          <Input
            id="stock"
            type="number"
            disabled={loading}
            className="col-span-3"
            onChange={(e) => setStock(e.target.value)}
            value={stock}
          />
        </div>
        <div className="flex gap-8 items-center">
          <Label htmlFor="originalPrice" className="w-1/6">
            Original Price
          </Label>
          <Input
            id="originalPrice"
            type="number"
            disabled={loading}
            className="col-span-3"
            onChange={(e) => setOriginal_price(e.target.value)}
            value={original_price}
          />
        </div>
        <div className="flex gap-8 items-center">
          <Label htmlFor="discountPrice" className="w-1/6">
            Discount Price
          </Label>
          <Input
            id="discountPrice"
            type="number"
            disabled={loading}
            className="col-span-3"
            onChange={(e) => setDiscount_price(e.target.value)}
            value={discount_price}
          />
        </div>
        <div className="flex gap-8 items-center">
          <Label htmlFor="rating" className="w-1/6 ">
            Rating
          </Label>
          <Input
            id="rating"
            type="number"
            disabled={loading}
            className="col-span-3"
            onChange={(e) => setRating(e.target.value)}
            value={rating}
          />
        </div>
        <div className="flex items-center justify-center gap-4">
          {preview ? (
            <img className="w-40 h-40 rounded-md" src={preview} alt="preview" />
          ) : null}
          <Label
            htmlFor="upload"
            className="flex items-center gap-1 w-4/6 border-[1px] border-gray-500 rounded-md px-3 py-2 h-8">
            {file === '' ? 'Upload' : file || file.name}
            <Input
              id="image"
              type="file"
              disabled={loading}
              className="opacity-0 absolute right-0 left-0 z-10 cursor-pointer"
              onChange={loadImage}
              accept="image/*"
            />
          </Label>
        </div>
        <Button type="submit">{loading ? 'Saving...' : 'Save Product'}</Button>
      </form>
    </div>
  );
};

export default EditProducts;
