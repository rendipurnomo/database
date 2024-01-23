import WishList from "../models/wishListModels.js";

export const getWishList = async (req, res) => {
  try {
    const wishList = await WishList.findAll();
    res.status(200).json(wishList);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const createWishList = async (req, res) => {
  try {
    const wishList = await WishList.create({
      product_id: req.body.product_id,
      customer_id: req.body.customer_id
    });
    res.status(200).json(wishList);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const deleteWishList = async (req, res) => {
  try {
    const wishList = await WishList.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(wishList);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}