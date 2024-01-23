import Payment from "../models/paymentModels.js";

export const getPayment = async (req, res) => {
  try {
    const payment = await Payment.findAll();
    res.status(200).json(payment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findOne({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(payment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}