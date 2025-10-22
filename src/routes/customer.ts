import { Router } from 'express';
import CustomerController from '../Controllers/customerController.ts';

const customer = Router();
const customerController = new CustomerController();

// Precisa adicionar o middleware depois
customer.patch(
  '/customer',
  customerController.updateCustomer.bind(customerController),
);

export default customer;
