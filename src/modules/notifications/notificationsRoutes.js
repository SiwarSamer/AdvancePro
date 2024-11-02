// src/modules/notifications/notificationsRoutes.js

const express = require('express');
const router = express.Router();
const notificationsController = require('./notificationsController');

// Route to get all notifications
router.get('/', notificationsController.getAllNotifications);

// Route to get a notification by ID
router.get('/:id', notificationsController.getNotificationById);

// Route to create a new notification
router.post('/', notificationsController.createNotification);

// Route to delete a notification by ID
router.delete('/:id', notificationsController.deleteNotification);

module.exports = router;
