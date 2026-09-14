const express = require("express");
const notificationRouter = express.Router();


const {addNotification , getNotifications , updateNotification , deleteNotification} = require("../controller/notification.controller.js");


notificationRouter.post("/", addNotification); 
notificationRouter.get("/", getNotifications); 
notificationRouter.put("/:id", updateNotification); 
notificationRouter.delete("/:id", deleteNotification); 


module.exports = { notificationRouter };