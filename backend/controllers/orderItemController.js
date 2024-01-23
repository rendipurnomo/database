import OrderItem from "../models/orderItemModels.js";

export const getOrderItems = async (req, res) => {
  try {
    const orderItems = await OrderItem.findAll();
    res.status(200).json(orderItems);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const getOrderItemById = async (req, res) => {
  try {
    const orderItem = await OrderItem.findOne({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(orderItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

