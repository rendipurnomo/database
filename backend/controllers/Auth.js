import Customer from '../models/customerModels.js';
import bcrypt from 'bcrypt';
import { google } from 'googleapis';
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:5000/auth/google/callback'
);

const scopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
];

const authorizationUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
  include_granted_scopes: true,
});

export const loginGoogle = (req, res) => {
  res.redirect(authorizationUrl);
};

export const callbackGoogle = async (req, res) => {
  const { code } = req.query;

  const { tokens } = await oauth2Client.getToken(code);

  oauth2Client.setCredentials(tokens);

  const oauth2 = google.oauth2({
    auth: oauth2Client,
    version: 'v2',
  });

  const { data } = await oauth2.userinfo.get();

  if (!data.email || !data.name) {
    return res.json({
      data: data,
    });
  }

  let user = await Customer.findOne({
    where: {
      email: data.email,
    },
  });

  if (user) {
    req.session.userId = user.id;
    const {
      id,
      first_name,
      last_name,
      email,
      phone,
      address,
      image,
      image_url,
      role,
    } = user;
    return res.status(200).json({
      customer: {
        id,
        first_name,
        last_name,
        email,
        phone,
        address,
        image,
        image_url,
        role,
      },
      msg: 'Login success.',
    });
  }

  if (!user) {
    user = await Customer.create({
      first_name: data.name,
      last_name: '---',
      email: data.email,
      image: data?.picture,
      image_url: data?.picture,
      password: '',
      role: 'user',
    });
  }

  const payload = {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    image: user.image,
    image_url: user.image_url,
    role: user.role,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
  req.session.userId = user.id;
  const {
    id,
    first_name,
    last_name,
    email,
    phone,
    address,
    image,
    image_url,
    role,
  } = user;
  return res.status(200).json({
    data: {
      id,
      first_name,
      last_name,
      email,
      phone,
      address,
      image,
      image_url,
      role,
    },
    token: token,
  });
};

export const loginCustomer = async (req, res) => {
  const customer = await Customer.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (!customer) {
    return res.status(404).json({ msg: 'User tidak ditemukan.' });
  }

  const custPassword = customer.password;

  const validPassword = await bcrypt.compare(req.body.password, custPassword);

  if (!validPassword) {
    return res.status(400).json({ msg: 'Password tidak sesuai.' });
  }
  req.session.userId = customer.id;

  const id = customer.id;
  const first_name = customer.first_name;
  const last_name = customer.last_name;
  const email = customer.email;
  const phone = customer.phone;
  const address = customer.address;
  const image = customer.image;
  const image_url = customer.image_url;
  const role = customer.role;

  res.status(200).json({
    id,
    first_name,
    last_name,
    email,
    phone,
    address,
    image,
    image_url,
    role,
  });
};

export const Me = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: 'Mohon login terlebih dahulu.' });
  }
  const customer = await Customer.findOne({
    attributes: [
      'id',
      'first_name',
      'last_name',
      'email',
      'phone',
      'address',
      'image',
      'image_url',
      'role',
    ],
    where: {
      id: req.session.userId,
    },
  });
  if (!customer) {
    return res.status(404).json({ msg: 'User tidak ditemukan.' });
  }
  res.status(200).json(customer);
};

export const logoutCustomer = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: 'Tidak dapat logout.' });
    res.status(200).json({ msg: 'Anda telah logout.' });
  });
};
