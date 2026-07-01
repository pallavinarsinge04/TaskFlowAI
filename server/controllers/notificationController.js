import Notification from "../models/Notification.js";

/* ============================
   Get All Notifications
============================ */

export const getNotifications = async (req, res) => {

  try {

    const notifications = await Notification.find()
      .sort({ createdAt: -1 });

    res.status(200).json(notifications);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

};

/* ============================
   Create Notification
============================ */

export const createNotification = async (req, res) => {

  try {

    const notification = await Notification.create(req.body);

    res.status(201).json(notification);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

};

/* ============================
   Mark One Notification Read
============================ */

export const markRead = async (req, res) => {

  try {

    const notification =
      await Notification.findByIdAndUpdate(

        req.params.id,

        {
          read: true,
        },

        {
          new: true,
        }

      );

    res.json(notification);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

};

/* ============================
   Mark All Notifications Read
============================ */

export const markAllRead = async (req, res) => {

  try {

    await Notification.updateMany(
      {},
      {
        read: true,
      }
    );

    res.json({
      message: "All notifications marked as read",
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

};

/* ============================
   Delete Notification
============================ */

export const deleteNotification = async (req, res) => {

  try {

    await Notification.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Notification deleted",
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

};

/* ============================
   Delete All Notifications
============================ */

export const deleteAllNotifications = async (req, res) => {

  try {

    await Notification.deleteMany({});

    res.json({
      message: "All notifications deleted",
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

};