import express from 'express';
import {
  getCustomers,
  getCustomerId,
  register,
  updateCustomer,
  deleteCustomer,
} from '../controllers/customerController.js';
import { adminOnly, verifyUser } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/customers', verifyUser, adminOnly,getCustomers);
router.get('/customers/:id', verifyUser, getCustomerId);
router.post('/register',  register);
router.patch('/customers/:id', verifyUser, updateCustomer);
router.delete('/customers/:id', verifyUser,adminOnly, deleteCustomer);

export default router;
