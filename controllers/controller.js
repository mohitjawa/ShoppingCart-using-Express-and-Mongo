const {
  User,
  UserImages,
  Products,
  Cart,
  addresses,
  order,
} = require("../model/index");
const codeAndMessage = require("../helper/error-code-message/error-code-message");
const Utility = require("../helper/utilities/common");
require("dotenv").config();
var jwt = require("jsonwebtoken");
exports.singup = async (req, res) => {
  try {
    const { name, email, year_born, mobile } = req.body;
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(404).json({
        message: "email already registered",
      });
    }
    const hashPassword = await Utility.encryptPassword(req.body.password);
    var User1 = new User({
      name,
      email,
      year_born,
      password: hashPassword,
      mobile,
    });

    User1.save(function (err, result) {
      if (err) {
        return res.status(200).json({
          message: "field is missing",
        });
      } else {
        let userId = result._id;
        var product1 = new Cart({
          userId,
          subtotal: 0,
          total: 0,
        });

        product1.save(function (err, result) {
          if (err) {
            return res.status(200).json({
              message: "field is missing",
            });
          }
        });
        return res.status(codeAndMessage.successOk).json({
          code: codeAndMessage.successOk,
          httpCode: codeAndMessage.successOk,
          message: "Cart is created for you",
          data: result,
        });
      }
    });
  } catch (error) {
    return res.status(400).json({
      message: "field is missing",
    });
  }
};
exports.login = async (req, res) => {
  try {
    const { email } = req.body;
    const UserExist = await User.findOne({ email });

    if (UserExist == null) {
      return res.status(200).json({
        message: "UserNotFound",
      });
    }
    const hashPassword = await Utility.validatePassword(
      req.body.password,
      UserExist.password
    );

    if (!hashPassword) {
      return res.status(404).json({
        message: "invalid password",
      });
    }

    const VerifyEmailPass = await User.find({
      email,
      password: UserExist.password,
    });
    const token = jwt.sign(
      {
        data: VerifyEmailPass.id,
      },
      process.env.JWTPASS,
      {
        expiresIn: "23h",
      }
    );

    return res.status(codeAndMessage.successOk).json({
      message: "successMessage",
      token: token,
      data: await User.find({ email }),
    });
  } catch (error) {
    return res.status(404).json({
      message: "badRequestMessage",
    });
  }
};
exports.RemoveUser = async (req, res) => {
  try {
    const id = req.query.id;
    await User.deleteOne({ id }, (err) => {
      if (err) throw console.log(err);
    });
    return res.status(codeAndMessage.successOk).json({
      code: codeAndMessage.successOk,
      httpCode: codeAndMessage.successOk,
      message: codeAndMessage.successOk,
    });
  } catch (error) {
    console.log(error);
    return res.status(codeAndMessage.successOk).json({
      code: codeAndMessage.badRequestCode,
      httpCode: codeAndMessage.badRequestHttpCode,
      message: codeAndMessage.badRequestMessage,
    });
  }
};
exports.ReviseUser = async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;
    await User.findOneAndUpdate(
      { id: req.query.id },
      { name, email, password, mobile }
    );
    return res.status(codeAndMessage.successOk).json({
      code: codeAndMessage.successOk,
      httpCode: codeAndMessage.successOk,
      message: codeAndMessage.successOk,
    });
  } catch (error) {
    console.log(error);
    return res.status(codeAndMessage.successOk).json({
      code: codeAndMessage.badRequestCode,
      httpCode: codeAndMessage.badRequestHttpCode,
      message: codeAndMessage.badRequestMessage,
    });
  }
};

exports.GetUserImageDetails = async (req, res) => {
  try {
    const Data = await UserImages.find({
      _id: "6295b02dc856a158e6b0db8c",
    }).populate({ path: "UserId" });
    return res.status(codeAndMessage.successOk).json({
      code: codeAndMessage.successOk,
      httpCode: codeAndMessage.successOk,
      message: codeAndMessage.successOk,
      data: Data,
    });
  } catch (error) {
    return res.status(codeAndMessage.successOk).json({
      code: codeAndMessage.badRequestCode,
      httpCode: codeAndMessage.badRequestHttpCode,
      message: codeAndMessage.badRequestMessage,
    });
  }
};
exports.FilterUser = async (req, res) => {
  try {
    const { name } = req.body;
    const Data = await User.aggregate([
      { $match: { name: name } },
      {
        $project: {
          _id: 0,
          mobile: 1,
          email: 1,
          year_born: 1,
          password: 1,
          name: 1,
        },
      },
      {
        $group: {
          _id: { name: name },
          data: { $push: "$$ROOT" },
          totaluser: { $sum: 1 },
        },
      },
    ]);
    return res.status(codeAndMessage.successOk).json({
      code: codeAndMessage.successOk,
      httpCode: codeAndMessage.successOk,
      message: codeAndMessage.successOk,
      data: Data,
    });
  } catch (error) {
    console.log(error);
    return res.status(codeAndMessage.successOk).json({
      code: codeAndMessage.badRequestCode,
      httpCode: codeAndMessage.badRequestHttpCode,
      message: codeAndMessage.badRequestMessage,
    });
  }
};
exports.GetUserAge = async (req, res) => {
  try {
    var time = new Date();
    var CurrentYear = time.getFullYear();
    const Data = await User.aggregate([
      {
        $project: {
          born_year: "$year_born",
          age: {
            $subtract: [CurrentYear, "$year_born"],
          },
        },
      },
    ]);
    return res.status(codeAndMessage.successOk).json({
      code: codeAndMessage.successOk,
      httpCode: codeAndMessage.successOk,
      message: codeAndMessage.successOk,
      data: Data,
    });
  } catch (error) {
    console.log(error);
    return res.status(codeAndMessage.successOk).json({
      code: codeAndMessage.badRequestCode,
      httpCode: codeAndMessage.badRequestHttpCode,
      message: codeAndMessage.badRequestMessage,
    });
  }
};
exports.InsertProducts = async (req, res) => {
  try {
    const { Pname, Pprice, Pimage, Pdescription } = req.body;

    var Product1 = new Products({
      Pname,
      Pprice,
      Pimage,
      Pdescription,
    });

    Product1.save(function (err, result) {
      if (err) {
        return res.status(200).json({
          message: "field is missing",
        });
      } else {
        return res.status(200).json({
          message: "success",
          data: result,
        });
      }
    });
  } catch (error) {
    return res.status(400).json({
      message: "field is missing",
    });
  }
};
exports.RemoveProduct = async (req, res) => {
  try {
    const id = req.query._id;
    await Products.deleteOne({ id }, (err) => {
      if (err) throw console.log(err);
    });
    return res.status(codeAndMessage.successOk).json({
      code: codeAndMessage.successOk,
      httpCode: codeAndMessage.successOk,
      message: codeAndMessage.successOk,
    });
  } catch (error) {
    console.log(error);
    return res.status(codeAndMessage.successOk).json({
      code: codeAndMessage.badRequestCode,
      httpCode: codeAndMessage.badRequestHttpCode,
      message: codeAndMessage.badRequestMessage,
    });
  }
};
exports.GetProductslist = async (req, res) => {
  try {
    const Data = await Products.find();
    return res.status(codeAndMessage.successOk).json({
      code: codeAndMessage.successOk,
      httpCode: codeAndMessage.successOk,
      message: codeAndMessage.successOk,
      data: Data,
    });
  } catch (error) {
    console.log(error);
    return res.status(codeAndMessage.successOk).json({
      code: codeAndMessage.badRequestCode,
      httpCode: codeAndMessage.badRequestHttpCode,
      message: codeAndMessage.badRequestMessage,
    });
  }
};
exports.GetProductById = async (req, res) => {
  try {
    const Data = await Products.find({ _id: req.query.id });
    return res.status(codeAndMessage.successOk).json({
      code: codeAndMessage.successOk,
      httpCode: codeAndMessage.successOk,
      message: codeAndMessage.successOk,
      data: Data,
    });
  } catch (error) {
    console.log(error);
    return res.status(codeAndMessage.successOk).json({
      code: codeAndMessage.badRequestCode,
      httpCode: codeAndMessage.badRequestHttpCode,
      message: codeAndMessage.badRequestMessage,
    });
  }
};
exports.AddToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const sameProduct = await Cart.findOne({
      userId: userId,
      "product.productId": productId,
    });
    if (sameProduct) {
      await Cart.findOneAndUpdate(
        { userId: userId, "product.productId": productId },
        { $inc: { "product.$.quantity": 1 } }
      );
      const Data = await Cart.findOne(
        { userId, "product.productId": productId },
        {
          _id: 0,
          product: { $elemMatch: { productId: productId } },
          subtotal: 1,
          tax: 1,
          total: 1,
        }
      ).populate({ path: "product.productId" });

      let subtotal = Data.subtotal + Data.product[0].productId.Pprice;
      let product_total =
        Data.product[0].product_total + Data.product[0].productId.Pprice;

      let total = subtotal + (20 / 100) * Data.subtotal;
      await Cart.findOneAndUpdate(
        { userId: userId, "product.productId": productId },
        {
          total: total,
          subtotal: subtotal,
          "product.$.product_total": product_total,
        }
      );
    } else {
      await Cart.findOneAndUpdate(
        { userId: userId },
        { $push: { product: { productId: productId } } }
      );
      const cart = await Cart.findOne(
        { userId, "product.productId": productId },
        {
          _id: 0,
          product: { $elemMatch: { productId: productId } },
          subtotal: 1,
          tax: 1,
          total: 1,
        }
      ).populate({ path: "product.productId" });
      let subtotal =
        cart.subtotal +
        cart.product[0].productId.Pprice * cart.product[0].quantity;
      let total =
        cart.total +
        cart.product[0].productId.Pprice +
        (20 / 100) * cart.product[0].productId.Pprice;
      let product_total =
        cart.product[0].productId.Pprice * cart.product[0].quantity;

      await Cart.findOneAndUpdate(
        { userId: userId, "product.productId": productId },
        {
          total: total,
          subtotal: subtotal,
          "product.$.product_total": product_total,
        }
      );
    }
    return res.status(codeAndMessage.successOk).json({
      code: codeAndMessage.successOk,
      httpCode: codeAndMessage.successOk,
      message: codeAndMessage.successOk,
    });
  } catch (error) {
    console.log(error);
    return res.status(codeAndMessage.successOk).json({
      code: codeAndMessage.badRequestCode,
      httpCode: codeAndMessage.badRequestHttpCode,
      message: codeAndMessage.badRequestMessage,
    });
  }
};
exports.FetchCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const Data = await Cart.find(
      { userId },
      { "product._id": 0, _id: 0 }
    ).populate({ path: "product.productId" });

    return res.status(codeAndMessage.successOk).json({
      code: codeAndMessage.successOk,
      httpCode: codeAndMessage.successOk,
      message: codeAndMessage.successOk,
      data: Data,
    });
  } catch (error) {
    console.log(error);
    return res.status(codeAndMessage.successOk).json({
      code: codeAndMessage.badRequestCode,
      httpCode: codeAndMessage.badRequestHttpCode,
      message: codeAndMessage.badRequestMessage,
    });
  }
};
exports.RemoveFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const cart = await Cart.findOne(
      { userId, "product.productId": productId },
      {
        _id: 0,
        product: { $elemMatch: { productId: productId } },
        subtotal: 1,
        tax: 1,
        total: 1,
      }
    ).populate({
      path: "product.productId",
    });
    if (!cart) {
      return res.status(codeAndMessage.successOk).json({
        code: codeAndMessage.successOk,
        httpCode: codeAndMessage.successOk,
        message: "Product does not exist",
      });
    } else if (cart.product[0].quantity > 1) {
      await Cart.findOneAndUpdate(
        { userId: userId, "product.productId": productId },
        { $inc: { "product.$.quantity": -1 } }
      );
      let subtotal = cart.subtotal - cart.product[0].productId.Pprice;
      let total =
        cart.total -
        cart.product[0].productId.Pprice -
        (20 / 100) * cart.product[0].productId.Pprice;
      let product_total =
        cart.product[0].product_total - cart.product[0].productId.Pprice;
      await Cart.findOneAndUpdate(
        { userId: userId, "product.productId": productId },
        {
          total: total,
          subtotal: subtotal,
          "product.$.product_total": product_total,
        }
      );
    } else {
      const cart = await Cart.findOne(
        { userId, "product.productId": productId },
        {
          _id: 0,
          product: { $elemMatch: { productId: productId } },
          subtotal: 1,
          tax: 1,
          total: 1,
        }
      ).populate({
        path: "product.productId",
      });
      let subtotal = cart.subtotal - cart.product[0].productId.Pprice;
      let total =
        cart.total -
        cart.product[0].productId.Pprice -
        (20 / 100) * cart.product[0].productId.Pprice;
      let product_total =
        cart.product[0].product_total - cart.product[0].productId.Pprice;
      await Cart.findOneAndUpdate(
        { userId: userId, "product.productId": productId },
        {
          total: total,
          subtotal: subtotal,
          "product.$.product_total": product_total,
        }
      );
      await Cart.updateOne(
        { userId: userId },
        { $pull: { product: { productId: productId } } }
      );
    }

    return res.status(codeAndMessage.successOk).json({
      code: codeAndMessage.successOk,
      httpCode: codeAndMessage.successOk,
      message: codeAndMessage.successOk,
    });
  } catch (error) {
    console.log(error);
    return res.status(codeAndMessage.successOk).json({
      code: codeAndMessage.badRequestCode,
      httpCode: codeAndMessage.badRequestHttpCode,
      message: codeAndMessage.badRequestMessage,
    });
  }
};
exports.InsertAddress = async (req, res) => {
  try {
    const { userId, houseNumber, latLng, addressType } = req.body;
    const isUserExist = await User.findOne({ userId });
    if (!isUserExist) {
      return res.status(404).json({
        message: "Please sign up",
      });
    }
    var Address1 = new addresses({
      userId,
      houseNumber,
      latLng,
      addressType,
    });
    Address1.save(function (err, result) {
      if (err) {
        return res.status(200).json({
          message: "field is missing",
        });
      } else {
        return res.status(codeAndMessage.successOk).json({
          code: codeAndMessage.successOk,
          httpCode: codeAndMessage.successOk,
          message: "Address is added",
          data: result,
        });
      }
    });
  } catch (error) {
    return res.status(400).json({
      message: "field is missing",
    });
  }
};
exports.UpDateAddress = async (req, res) => {
  try {
    const { houseNumber, latLng, addressType } = req.body;
    await addresses.findOneAndUpdate(
      { _id: req.query._id },
      { houseNumber, latLng, addressType }
    );
    return res.status(codeAndMessage.successOk).json({
      code: codeAndMessage.successOk,
      httpCode: codeAndMessage.successOk,
      message: codeAndMessage.successOk,
    });
  } catch (error) {
    console.log(error);
    return res.status(codeAndMessage.successOk).json({
      code: codeAndMessage.badRequestCode,
      httpCode: codeAndMessage.badRequestHttpCode,
      message: codeAndMessage.badRequestMessage,
    });
  }
};
exports.RemoveAddress = async (req, res) => {
  try {
    const _id = req.query._id;
    const Delete = addresses.deleteOne({ _id }, (err, rese) => {
      if (err) throw console.log(err);
    });
    return res.status(codeAndMessage.successOk).json({
      code: codeAndMessage.successOk,
      httpCode: codeAndMessage.successOk,
      message: codeAndMessage.successOk,
    });
  } catch (error) {
    console.log(error);
    return res.status(codeAndMessage.successOk).json({
      code: codeAndMessage.badRequestCode,
      httpCode: codeAndMessage.badRequestHttpCode,
      message: codeAndMessage.badRequestMessage,
    });
  }
};
exports.FetchUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findOne({ _id: userId }, { __v: 0 });
    const address = await addresses.find(
      { userId },
      { _id: 0, userId: 0, __v: 0 }
    );
    const UserAndAddress = { user, address };

    return res.status(codeAndMessage.successOk).json({
      code: codeAndMessage.successOk,
      httpCode: codeAndMessage.successOk,
      message: codeAndMessage.successOk,
      data: UserAndAddress,
    });
  } catch (error) {
    console.log(error);
    return res.status(codeAndMessage.successOk).json({
      code: codeAndMessage.badRequestCode,
      httpCode: codeAndMessage.badRequestHttpCode,
      message: "User not found",
    });
  }
};
exports.CreateOrder = async (req, res) => {
  try {
    const date = new Date();

    date.setDate(date.getDate() + 7);
    const { userId } = req.body;
    const address = await addresses.findOne({ userId });
    const data = await Cart.findOne({ userId });
    var OrderObj = {
      userId,
      products: data.product,
      subtotal: data.subtotal,
      total: data.total,
      final_amount: data.total + 500,
      addressId: address._id,
      estimatedDelivery: date,
    };
    await order.create(OrderObj).then(() => {
      return res.status(codeAndMessage.successOk).json({
        code: codeAndMessage.successOk,
        httpCode: codeAndMessage.successOk,
        message: codeAndMessage.successOk,
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "field is missing",
    });
  }
};
exports.fetchOrder = async (req, res) => {
  try {
    const id = req.query._id;
    const OrderDetails = await order
      .findOne({ id })
      .populate({ path: "userId", select: "_id name mobile email year_born" })
      .populate({ path: "products.productId" })
      .populate({ path: "addressId" });

    return res.status(codeAndMessage.successOk).json({
      code: codeAndMessage.successOk,
      httpCode: codeAndMessage.successOk,
      message: codeAndMessage.successOk,
      data: OrderDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "field is missing",
    });
  }
};
