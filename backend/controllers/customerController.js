import Customer from '../models/customerModels.js';
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
  const { first_name, last_name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ msg: 'Password did not match!' });
  }

  const emailExist = await Customer.findOne({
    where: {
      email: email,
    },
  });

  if (emailExist) {
    return res.status(400).json({ msg: 'Email already used!' });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ msg: 'Password must be at least 6 characters!' });
  }

  const salt = await bcrypt.genSalt( 10 );
  const hash = await bcrypt.hash( password, salt );

  const fileName = 'default' + Date.now() + '.png';
  const filePath = `./public/default/default.png`;
  const output = `./public/images/${fileName}`;

   const img = fs.readFileSync(filePath);
   fs.writeFileSync(output, img);

   const url = `${req.protocol}://${req.get('host')}/images/${fileName}`;

  try {
    await Customer.create({
      first_name: first_name,
      last_name: last_name,
      email: email,
      image_url: url,
      role: 'user',
      image: fileName,
      phone: '000000000000',
      address: 'Jl. Raya No. 1',
      password: hash,
    });
    return res.status(201).json({ msg: 'Registration success!' });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCustomerId = async (req, res) => {
  try {
    const customer = await Customer.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCustomer = async (req, res) => {
  const customer = await Customer.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!customer) {
    return res.status(404).json({ msg: 'User not found.' });
  }
  let fileName = 'default.png';
  if (req.files === null) {
    try {
      await Customer.update(
        {
          ...req.body,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(201).json({ msg: 'Customer updated!' });
    } catch (error) {
      res.status(500).json({ msg: 'Internal server error' });
    }
  } else {
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedType = ['.png', '.jpg', '.jpeg'];

    if (!allowedType.includes(ext.toLowerCase())) {
      res.status(422).json({ msg: 'Invalid Images' });
    }

    if (fileSize > 2000000)
      res.status(422).json({ msg: 'Image must be less than 2mb' });

    fs.unlinkSync(`./public/images/${customer.image}`);

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });

    const url = `${req.protocol}://${req.get('host')}/images/${fileName}`;
    try {
      await Customer.update(
        {
          ...req.body,
          image: fileName,
          image_url: url,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(201).json({ msg: 'Customer updated!' });
    } catch (error) {
      res.status(500).json({ msg: 'Internal server error' });
    }
    }
};

export const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!customer) {
      return res.status(404).json({ msg: 'Customer not found.' });
    }

    const filePath = `public/images/${customer.image}`;

    fs.unlinkSync(filePath);
    await Customer.destroy({
      where: {
        id: req.params.id,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
