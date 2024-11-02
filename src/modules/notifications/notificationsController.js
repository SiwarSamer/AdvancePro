// src/modules/notifications/notificationsController.js

const Notification = require('../../../db/models/notification.model');

// Get all notifications
exports.getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.findAll();
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notifications', error });
    }
};

// Get notification by ID
exports.getNotificationById = async (req, res) => {
    const { id } = req.params;
    try {
        const notification = await Notification.findByPk(id);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notification', error });
    }
};

// Create a new notification
exports.createNotification = async (req, res) => {
    const { notification_type, message, userId } = req.body;

    try {
        // Validate that all required fields are present
        if (!notification_type || !message || !userId) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create the new notification
        const newNotification = await Notification.create({
            userId, // Matches the model definition
            notification_type,
            message
        });

        res.status(201).json(newNotification);
    } catch (error) {
        console.error("Error creating notification:", error);
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: 'Validation error', errors: error.errors });
        }
        res.status(500).json({ message: 'Error creating notification', error });
    }
};

// Delete notification by ID
exports.deleteNotification = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Notification.destroy({ where: { notification_id: id } });
        if (!deleted) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        res.status(200).json({ message: 'Notification deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting notification', error });
    }
};
