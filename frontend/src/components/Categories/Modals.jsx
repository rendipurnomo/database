import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import {toast} from 'react-hot-toast';
import {Plus} from 'lucide-react';

const Modals = ({ title }) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('');
  const [file, setFile] = useState('');
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);

    const loadImage = (e) => {
      const image = e.target.files[0];
      setFile(image);
      setPreview(URL.createObjectURL(image));
    };

    const handleSaveCategory = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', name);
      formData.append('description', description);
      try {
        setLoading(true);
        await axios.post('http://localhost:5000/categories', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success("Category added successfully");
      } catch (error) {
        console.log(error.message);
        toast.error("Failed to add category");
      }finally{
        window.location.reload();
        setLoading(false);
      }
    };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex gap-2">Add Category <Plus /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSaveCategory} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
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
          <div className="flex flex-col items-center justify-center">
            {preview ? (
              <img className="w-40 h-40" src={preview} alt="preview" />
            ) : null}
            <Label
              htmlFor="upload"
              className="flex items-center gap-1 text-right relative border-[1px] border-gray-500 rounded-md px-3 py-2 h-6">
              {file ? file.name : 'Upload'}
              <Input
                id="image"
                type="file"
                disabled={loading}
                className="opacity-0 absolute"
                onChange={loadImage}
                accept="image/*"
              />
            </Label>
          </div>
          <DialogClose asChild>
          <Button type="submit">{loading ? "Saving..." : "Add Category"}</Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default Modals