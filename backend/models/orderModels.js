import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Customer from "./customerModels.js";
import Shipment from "./shipmentModels.js";
import Payment from "./paymentModels.js";

const { DataTypes } = Sequelize;

const Order = db.define(
  "orders",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    order_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    total_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    shipment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    payment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  },
  {
    freezeTableName: true
  }
)

Order.belongsTo(Customer, { foreignKey: 'customer_id' })
Order.belongsTo(Shipment, { foreignKey: 'shipment_id' })
Order.belongsTo(Payment, { foreignKey: 'payment_id' })

export default Order