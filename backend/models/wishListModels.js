import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Product from "./productModels.js";
import Customer from "./customerModels.js";

const { DataTypes } = Sequelize;

const WishList = db.define(
  "wishlists",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    product_id: {
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
  },
)

WishList.belongsTo(Product, { foreignKey: 'product_id' })
WishList.belongsTo(Customer, { foreignKey: 'customer_id' })

export default WishList