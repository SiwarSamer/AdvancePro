const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../../../db/models/user.model');
const Dress = require('../../../../db/models/dress.model');
const connection = require('../../../../db/connection'); 
const Order = require('../../../../db/models/order.model');
const Wishlist = require('../../../../db/models/wishlist.model');
const { Op } = require('sequelize');

require('dotenv').config();

exports.getDressById = async (req, res) => {
    const { id } = req.params; 

    try {
        const dress = await Dress.findOne({ where: { id } }); 

        if (!dress) {
            return res.status(404).json({ message: "Dress not found" });
        }

        res.json(dress);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
};
exports.listDresses = async (req, res) => {
    try {
        const dresses = await Dress.findAll();
        res.json(dresses);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
};




exports.updateProfile = async (req, res) => {
    const userId = req.user.id; 
    const { name, email, phone, address, profile_picture } = req.body;

    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        
        if (name) user.name = name;
        if (email) user.email = email;
        if (phone) user.phone = phone;
        if (address) user.address = address;
        if (profile_picture) user.profile_picture = profile_picture;

        await user.save();

        res.json({ message: "Profile updated successfully", user });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};



exports.searchDresses = async (req, res) => {
    const { category, style, minPrice, maxPrice, availability, color, size } = req.query;
    console.log("Query parameters:", req.query);  // Add this line

    try {
        const whereClause = {};

        // Add filters based on the query parameters
        if (style) {
            whereClause.style = style;
        }
        if (color) {
            whereClause.color = color;
        }
        if (size) {
            whereClause.size = size;
        }
        if (minPrice) {
            whereClause.price = { ...whereClause.price, [Op.gte]: parseFloat(minPrice) };
        }
        if (maxPrice) {
            whereClause.price = { ...whereClause.price, [Op.lte]: parseFloat(maxPrice) };
        }
        if (availability !== undefined) {
            whereClause.available = availability === 'true';  // Convert string to boolean
        }

        // Log the final whereClause for debugging
        console.log("Where clause:", whereClause);

        // Fetch the dresses based on the constructed where clause
        const dresses = await Dress.findAll({ where: whereClause });
        res.json(dresses);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
};


exports.createOrder = async (req, res) => {
    const userEmail = req.user.email; 
    const { dressId, quantity, orderType, rentalStartDate, rentalEndDate } = req.body;

    try {
 
        if (!dressId || !quantity || !orderType) {
            return res.status(400).json({ message: "Dress ID, quantity, and order type are required" });
        }

        const dress = await Dress.findOne({ where: { id: dressId } });
        if (!dress) {
            return res.status(404).json({ message: "Dress not found" });
        }

        const totalPrice = dress.price * quantity;


        if (orderType === 'rental') {
            if (!rentalStartDate || !rentalEndDate) {
                return res.status(400).json({ message: "Rental start and end dates are required for rental orders" });
            }
        }

        // Create the order
        const newOrder = await Order.create({
            userEmail,
            dressId,
            quantity,
            orderType,
            totalPrice,
            rentalStartDate: orderType === 'rental' ? rentalStartDate : null,
            rentalEndDate: orderType === 'rental' ? rentalEndDate : null,
            status: 'pending', // Default status
        });

        res.status(201).json({
            message: "Order created successfully",
            order: newOrder
        });
    } catch (err) {
        console.error("Error creating order:", err);
        res.status(500).json({ msg: 'Server error' });
    }
};



exports.getAllOrders = async (req, res) => {
    const userEmail = req.user.email; 

    try {
        const orders = await Order.findAll({ where: { userEmail } }); 
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.getOrderById = async (req, res) => {
    const { orderId } = req.params; 
    const userEmail = req.user.email; 

    try {
        
        const order = await Order.findOne({ where: { id: orderId, userEmail } });

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
};


exports.addToWishlist = async (req, res) => {
    const userEmail = req.user.email; // Email from the logged-in user's JWT
    const { dressId } = req.body;

    try {
        const existingItem = await Wishlist.findOne({ where: { userEmail, dressId } });

        if (existingItem) {
            return res.status(400).json({ message: "Dress already in wishlist" });
        }

        const wishlistItem = await Wishlist.create({ userEmail, dressId });
        res.status(201).json({ message: "Dress added to wishlist", wishlistItem });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Get all wishlist items for the logged-in user
exports.getWishlist = async (req, res) => {
    const userEmail = req.user.email;

    try {
        const wishlist = await Wishlist.findAll({
            where: { userEmail },
            include: [{ model: Dress }] 
        });
        res.json(wishlist);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Remove a dress from the user's wishlist
exports.removeFromWishlist = async (req, res) => {
    const userEmail = req.user.email;
    const { dressId } = req.params;

    try {
        const result = await Wishlist.destroy({
            where: { userEmail, dressId }
        });

        if (result === 0) {
            return res.status(404).json({ message: "Dress not found in wishlist" });
        }

        res.json({ message: "Dress removed from wishlist" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
};
