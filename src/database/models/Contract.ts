import mongoose from 'mongoose';

const contractSchema = new mongoose.Schema({
  car_name: {
    type: String,
    required: true,
  },
  total_installments: {
    type: Number,
    required: true,
  },
  paid_installments: {
    type: Number,
    required: true,
  },
  installment_value: {
    type: Number,
    required: true,
  },
  total_value: {
    type: Number,
    required: true,
  },
  request_type: {
    type: String,
    required: true,
  },
  due_date: {
    type: Date,
    required: true,
  },
});

export default mongoose.model('Contract', contractSchema);
