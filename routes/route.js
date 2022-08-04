const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/controller");
const middleware = require("../helper/validation/joi");
const auth = require("../helper/auth/auth");

router.post("/signup", middleware.signUpVal, userCtrl.singup);
router.post("/login", middleware.loginVal, userCtrl.login);
router.delete("/delete", auth.checkToken, userCtrl.RemoveUser);
router.put("/ReviseUser", auth.checkToken, userCtrl.ReviseUser);
router.get("/GetUserDetail", userCtrl.GetUserImageDetails);
router.get("/FilterUser", userCtrl.FilterUser);
router.get("/GetUserAge", userCtrl.GetUserAge);
router.post("/insert-products", userCtrl.InsertProducts);
router.delete("/remove-product", userCtrl.RemoveProduct);
router.get("/get-product-list", userCtrl.GetProductslist);
router.get("/get-specific-product", userCtrl.GetProductById);
router.post("/add-to-cart", userCtrl.AddToCart);
router.delete("/remove-from-cart", userCtrl.RemoveFromCart);
router.get("/fetch-cart", userCtrl.FetchCart);
router.post("/add-address", userCtrl.InsertAddress);
router.put("/update-address", userCtrl.UpDateAddress);
router.delete("/remove-address", userCtrl.RemoveAddress);
router.get("/fetch-user", userCtrl.FetchUser);
router.post("/create-order", userCtrl.CreateOrder);
router.get("/fetch-order", userCtrl.fetchOrder);

module.exports = router;
