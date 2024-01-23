import Category from "../models/categoryModels.js";
import path from "path";
import fs from "fs";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    console.log(error);
  }
}

export const getCategoryId = async (req, res) => {
  try {
    const category = await Category.findOne({
      where: {
        id: req.params.id
      }
    });
    res.json(category);
  } catch (error) {
    console.log(error);
  }
}

export const createCategory = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({msg:'No files were uploaded.'});
  }

  const name = req.body.name;
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get('host')}/images/${fileName}`;
  const allowedTypes = ['.png', '.jpg', '.jpeg'];

  if (!allowedTypes.includes(ext.toLocaleLowerCase())) {
    return res.status(422).json({msg:'Invalid file type.'});
  }

  if (fileSize > 2000000) {
    return res.status(422).json({msg: 'File must be less than 2mb.'});
  }

  file.mv(`public/images/${fileName}`, async (err) => {
    if (err) {
      return res.status(500).json(err);
    }
    try {
      await Category.create({
        name: name,
        image: fileName,
        description: req.body.description,
        image_url: url
      });
      res.status(201).json({msg:'Category created successfully.'});
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  })
}

export const updateCategory = async (req, res) => {
  const category = await Category.findOne({
    where: {
      id: req.params.id
    }
  });

  if (!category) {
    return res.status(404).json({msg:'Category not found.'});
  }

  let fileName = category.image;
  if(req.files === null) {
    try {
      await Category.update(
        {
          ...req.body,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(201).json({ msg: 'Category updated!' });
    } catch (error) {
      res.status(500).json({ msg: 'Internal server error' });
    }
  } else {
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedTypes = ['.png', '.jpg', '.jpeg'];

    if (!allowedTypes.includes(ext.toLocaleLowerCase())) {
      return res.status(422).json({msg:'Invalid file type.'});
    }

    if (fileSize > 2000000) {
      return res.status(422).send({msg: 'File must be less than 2mb.'});
    }

    const filepath = `public/images/${category.image}`;
    fs.unlinkSync(filepath);

    file.mv(`public/images/${fileName}`, async (err) => {
      if (err) 
        return res.status(500).json(err);
      });
    const url = `${req.protocol}://${req.get('host')}/images/${fileName}`;
    try {
      await Category.update(
        {
          ...req.body,
          image: fileName,
          image_url: url
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(201).json({ msg: 'Category updated!' });
    } catch (error) {
      res.status(500).json({ msg: 'Internal server error' });
    }
  }
}

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!category) {
      return res.status(404).json({msg:'Category not found.'});
    }
    const filepath = `public/images/${category.image}`;
    fs.unlinkSync(filepath);
    await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json({msg:'Category deleted successfully.'});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}