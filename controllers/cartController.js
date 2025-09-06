import Cart from "../schemas/cartSchema.js";
import Product from "../schemas/productSchema.js";

export const createCartItem = async (req, res) => {
  const user = req.user;
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    console.log("");
    if (!product) {
      res.status(400).json({ message: "Product does not exist" });
      return;
    }
    let existingCart = await Cart.findOne({ userId: user._id });
    if (!existingCart) {
      existingCart = new Cart({
        userId: user._id,
        products: [
          {
            productId: product._id,
            quantity: 1,
            price: product.price,
          },
        ],
      });
    } else {
      const existingCartItem = existingCart.products.find(
        (product) => product.productId.toString() === id
      );
      if (existingCartItem) {
        existingCartItem.quantity += 1;
      } else {
        existingCart.products.push({
          productId: product._id,
          quantity: 1,
          price: product.price,
        });
      }
    }

    //update total price of each items in the cart
    existingCart.products.forEach((item) => {
      item.totalItemPrice = item.quantity * item.price;
    });

    //update the total cart price
    existingCart.totalCartPrice = existingCart.products.reduce(
      (acc, item) => acc + item.totalItemPrice,
      0
    );

    await existingCart.save();
    res.status(201).json({
      responseMessage: "Cart created successfully",
      responseData: existingCart,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateCartItem = async (req, res) => {
  const { productId, type } = req.body;

  if (!productId || !type) {
    res
      .status(400)
      .json({ responseMessage: "Please provide all required fields" });
  }
  const userId = req.user._id;

  try {
    let cart = await Cart.findOne({ userId: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found!" });
    }
    const existingCartItem = cart.products.find(
      (product) => product.productId.toString() === productId
    );
    if (type === "increase") {
      existingCartItem.quantity += 1;
    } else if (type === "decrease" && existingCartItem.quantity > 1) {
      existingCartItem.quantity -= 1;
    } else {
      return res
        .status(400)
        .json({ messsage: "Type should either be increase or decrease" });
    }

    //update total price of each items in the cart
    cart.products.forEach((item) => {
      item.totalItemPrice = item.quantity * item.price;
    });

    //update the total cart price
    cart.totalCartPrice = cart.products.reduce(
      (acc, item) => acc + item.totalItemPrice,
      0
    );
    await cart.save();
    await cart.populate("products.productId");
    res
      .status(200)
      .json({ responseMessage: "Cart Updated Successfully", data: cart });
  } catch (err) {
    console.log("error", err);
    res
      .status(500)
      .json({ responseMessage: "Server Error", error: err.message });
  }
};

export const getCartItems = async (req, res) => {
  const userId = req.user._id;
  try {
    let cart = await Cart.findOne({ userId: userId }).populate(
      "products.productId"
    );
    if (!cart) {
      return res.status(404).json({ message: "Cart not found!" });
    }
    res
      .status(200)
      .json({ responseMessage: "Records fetch successfully", data: cart });
  } catch (err) {
    res
      .status(500)
      .json({ responseMessage: "Server Error", error: err.message });
  }
};

export const deleteCartItem = async (req, res) => {
  const userId = req.user._id
  try {
    let cart = await Cart.findOne({ userId: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found!" });
    }
    cart.products = [];
    cart.totalCartPrice = 0;

    await cart.save();
    await res
      .status(200)
      .json({ responseMessage: "Cart deleted successfully!" });
  } catch (err) {
    res
      .status(500)
      .json({ responseMessage: "Server Error", error: err.message });
  }
};
