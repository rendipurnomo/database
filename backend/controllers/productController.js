import Product from '../models/productModels.js';
import path from 'path';
import fs from 'fs';

export const getProducts = async (req, res) => {
  try {
    const product = await Product.findAll();
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getProductId = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ msg: 'No files were uploaded.' });
  }

  const name = req.body.name;
  const brand = req.body.brand;
  const description = req.body.description;
  const originalPrice = req.body.originalPrice;
  const discountPrice = req.body.discountPrice;
  const rating = req.body.rating;
  const stock = req.body.stock;
  const file = req.files.file;
  const category_id = req.body.category_id;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get('host')}/images/${fileName}`;
  const allowedTypes = ['.png', '.jpg', '.jpeg'];

  if (!allowedTypes.includes(ext.toLocaleLowerCase())) {
    return res.status(422).json({ msg: 'Invalid file type.' });
  }

  if (fileSize > 2000000) {
    return res.status(422).json({ msg: 'File must be less than 2mb.' });
  }

  file.mv(`public/images/${fileName}`, async (err) => {
    if (err) {
      return res.status(500).json(err);
    }
    try {
      await Product.create({
        name: name,
        brand: brand,
        description: description,
        image: fileName,
        image_url: url,
        rating: rating,
        originalPrice: originalPrice,
        discountPrice: discountPrice,
        stock: stock,
        category_id: category_id,
        categoryId: category_id,
      });
      res.status(201).json({ msg: 'Product created successfully.' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
};

export const updateProduct = async (req, res) => {
  const product = await Product.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!product) {
    return res.status(404).json({ msg: 'Product not found.' });
  }

  let fileName = product.image;
  if (req.files === null) {
    try {
      await Product.update(
        {
          ...req.body,
          categoryId: req.body.category_id,
        },
        {
          where: {
            id: product.id,
          },
        }
      );
      res.status(200).json({ msg: 'Product updated successfully.' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedTypes = ['.png', '.jpg', '.jpeg'];

    if (!allowedTypes.includes(ext.toLocaleLowerCase())) {
      return res.status(422).json({ msg: 'Invalid file type.' });
    }

    if (fileSize > 2000000) {
      return res.status(422).json({ msg: 'File must be less than 2mb.' });
    }

    file.mv(`public/images/${fileName}`, async (err) => {
      if (err) {
        return res.status(500).json(err);
      }
      const filePath = `public/images/${product.image}`;
      fs.unlinkSync(filePath);
      const url = `${req.protocol}://${req.get('host')}/images/${fileName}`;
      try {
        await Product.update(
          {
            ...req.body,
            image: fileName,
            image_url: url,
            categoryId: req.body.category_id,
          },
          {
            where: {
              id: product.id,
            },
          }
        );
        res.status(200).json({ msg: 'Product updated successfully.' });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!product) {
      return res.status(404).json({ msg: 'Product not found.' });
    }
    const filePath = `public/images/${product.image}`;
    fs.unlinkSync(filePath);
    await Product.destroy({
      where: {
        id: product.id,
      },
    });
    res.status(200).json({ msg: 'Product deleted successfully.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
