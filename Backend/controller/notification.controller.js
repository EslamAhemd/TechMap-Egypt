const { notificationModel } = require("../models/notifictaion.model.js");


//==== CREAT =====================

const addNotification = (req, res) => {
    notificationModel.create(req.body).then((data) => {
        res.status(201).json({
            message: "notification added successfully",
            data: data
        });
    }).catch((err) => {
        console.log("error when adding notification", err);
    })

};


// ====GET ALL Notfication ==================


const getNotifications = (req, res) => {

    notificationModel.find().then((data) => {
        res.json({
            message: "notification fetched success",
            data: data
        });
    }).catch((err) => {
        console.log("error when fetching notifications", err);
        res.json({
            message: "error occurred while fetching notifications",
            error: err
        });

    })
};




// ==== UBDATE Notification =============


const updateNotification = (req, res) => {

    const { id } = req.params;

    notificationModel.findByIdAndUpdate(id, req.body, { new: true }).then((data) => {
        if (!data) {
            return res.json({
                message: "notification not found"
            });
        }

        res.json({
            message: "notification updated successfully",
            data: data
        });
    }).catch((err) => {
        console.log("error when updating notification", err);

        res.json({
            message: "error occurred while updating notification",
            error: err
        });

    });

};





// ========DELETE NOTIFICATION =======================



const deleteNotification = (req, res) => {
    const { id } = req.params;

    notificationModel.findByIdAndDelete(id).then((data) => {

        if (!data) {
            return res.json({
                message: "notification not found"
            });
        }
        res.json({
            message: "notification deleted successfully",
            data: data
        });
    }).catch((err) => {

        console.log("error when deleting notification", err);
        res.status(500).json({
            message: "error occurred while deleting notification", 
            error: err 
        });

    }
    )



};








module.exports = { addNotification , getNotifications , updateNotification , deleteNotification };