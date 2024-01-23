import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Order from "./orderModels.js";
import Product from "./productModels.js";

const { DataTypes } = Sequelize;

const OrderItem = db.define(
  "order_items",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }
)

OrderItem.belongsTo(Order, { foreignKey: 'order_id' })
OrderItem.belongsTo(Product, { foreignKey: 'product_id' })

export default OrderItem