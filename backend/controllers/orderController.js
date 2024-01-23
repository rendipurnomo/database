import Order from "../models/orderModels.js";

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const createOrder = async (req, res) => {
  try {
    const order = await Order.create({
      order_date: req.body.order_date,
      total_price: req.body.total_price,
      customer_id: req.body.customer_id,
      shipment_id: req.body.shipment_id,
      payment_id: req.body.payment_id
    });
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const updateOrder = async (req, res) => {
  try {
    const order = await Order.update({
      order_date: req.body.order_date,
      total_price: req.body.total_price,
      customer_id: req.body.customer_id,
      shipment_id: req.body.shipment_id,
      payment_id: req.body.payment_id
    }, {
      where: {
        id: order.id
      }
    });
    res.status(200).json({msg:'Order updated successfully.'});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      where: {
        id: req.params.id
      }
    });
    if(!order) {
      return res.status(404).json({msg:'Order not found.'});
    }
    await Order.destroy({
      where: {
        id: order.id
      }
    });
    res.status(200).json({msg:'Order deleted successfully.'});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}