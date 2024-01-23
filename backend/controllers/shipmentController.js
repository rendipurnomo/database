import Shipment from "../models/shipmentModels.js";

export const getShipment = async (req, res) => {
  try {
    const shipment = await Shipment.findAll();
    res.status(200).json(shipment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const getShipmentById = async (req, res) => {
  try {
    const shipment = await Shipment.findOne({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(shipment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const createShipment = async (req, res) => {

  if(!req.body.address || !req.body.shipment_date || !req.body.city || !req.body.state || !req.body.country || !req.body.zip_code || !req.body.customer_id) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  try {
    const shipment = await Shipment.create({
      address: req.body.address,
      shipment_date: req.body.shipment_date,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      zip_code: req.body.zip_code,
      customer_id: req.body.customer_id
    });
    res.status(200).json(shipment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const updateShipment = async (req, res) => {

  if(!req.body.address || !req.body.shipment_date || !req.body.city || !req.body.state || !req.body.country || !req.body.zip_code || !req.body.customer_id) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }
  try {
    const shipment = await Shipment.update({
      address: req.body.address,
      shipment_date: req.body.shipment_date,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      zip_code: req.body.zip_code,
      customer_id: req.body.customer_id
    }, {
      where: {
        id: shipment.id
      }
    });
    res.status(200).json(shipment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const deleteShipment = async (req, res) => {
  try {
    const shipment = await Shipment.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(shipment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}