const express = require("express");
const router = express.Router();
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");
const { updateStock } = require("../controllers/product");

const { getOrderById, createOrder, getAllOrders, getOrderStatus ,updateStatus } = require("../controllers/order");

//prams
router.param("userId", getUserById);
router.param("orderId", getOrderById);

//Actual router

//Create 
router.post("order/create/:userId", isSignedIn, isAuthenticated, pushOrderInPurchaseList, updateStock, createOrder);

//Read
router.get("/order/all/:userId", isSignedIn, isAuthenticated, isAdmin, getAllOrders);

//status of order
router.get("/order/status/:userId", isSignedIn, isAuthenticated, isAdmin, getOrderStatus);
router.put("/order/status/orderId/:userId", isSignedIn, isAuthenticated, isAdmin, updateStatus);

module.exports = router;