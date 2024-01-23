import Customer from "../models/customerModels.js";

export const verifyUser = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: 'Mohon login terlebih dahulu.' });
  }
  const customer = await Customer.findOne({
    attributes: ['id', 'first_name', 'last_name', 'email', 'phone', 'address'],
    where: {
      id: req.session.userId
    }
  })
  if (!customer) {
    return res.status(401).json({ msg: 'User tidak ditemukan.' });
  }
  req.userId = customer.id
  next()
}

export const adminOnly = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: 'Mohon login terlebih dahulu.' });
  }
  const customer = await Customer.findOne({
    attributes: ['id', 'first_name', 'last_name', 'email', 'phone', 'address','image','image_url','role'],
    where: {
      id: req.session.userId
    }
  })
  if (!customer) {
    return res.status(401).json({ msg: 'User tidak ditemukan.' });
  }
  if (customer.role !== 'admin') {
    return res.status(401).json({ msg: 'Akses Terlarang' });
  }
  req.userId = customer.id
  next()
}