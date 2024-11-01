const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { body, validationResult } = require('express-validator');
const sequelize = require('./db/connection'); // Ensure this path is correct
const userRoutes = require('./src/modules/roles/users/user'); // Adjust path if needed
const authRoutes = require('./src/modules/auth/auth'); 
const logisticsRoutes = require('./src/modules/routes/logistics.routes'); 
const { Dress, Wishlist } = require('./db/models/associations'); 
require('dotenv').config();

// Import models
const Dress = require('./db/models/dress.model'); 

// Create an Express app
const app = express();

// Middleware setup
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies
app.use(morgan('dev')); // Log requests to the console

// Route setup
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes); 
app.use('/api/logistics', logisticsRoutes);

// Constants for distance calculations
const PICKUP_RADIUS = 10; // 10 km for pickup
const DELIVERY_RADIUS = 50; // 50 km for local delivery

// Distance calculation route with validation
app.get('/distance/:id', [
    body('userLatitude').isFloat({ min: -90, max: 90 }),
    body('userLongitude').isFloat({ min: -180, max: 180 })
], (req, res) => {
    const id = req.params.id;
    const userLatitude = parseFloat(req.query.userLatitude);
    const userLongitude = parseFloat(req.query.userLongitude);

    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: 'error', errors: errors.array() });
    }

    console.log(`Request received for dress ID: ${id} with user location: (${userLatitude}, ${userLongitude})`);

    // Fetch the dress pickup point from the database
    Dress.findByPk(id)
        .then(dress => {
            if (!dress) {
                console.log('Dress not found for ID:', id);
                return res.status(404).json({ status: 'error', message: 'Dress not found' });
            }

            // Log the dress location
            console.log(`Dress location found: (${dress.latitude}, ${dress.longitude})`);

            const dressLocation = {
                latitude: dress.latitude,
                longitude: dress.longitude
            };

            // Haversine formula implementation
            const toRad = (value) => (value * Math.PI) / 180;

            const R = 6371; // Radius of the Earth in kilometers
            const dLat = toRad(dressLocation.latitude - userLatitude);
            const dLon = toRad(dressLocation.longitude - userLongitude);

            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(toRad(userLatitude)) * Math.cos(toRad(dressLocation.latitude)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

            const distance = R * c; // Distance in kilometers

            // Logic to determine pickup or delivery options
            let message;
            if (distance < PICKUP_RADIUS) {
                message = 'The item is nearby. In-person pickup is feasible.';
            } else if (distance >= PICKUP_RADIUS && distance <= DELIVERY_RADIUS) {
                message = 'Local delivery options are available (e.g., courier or postal service).';
            } else {
                message = 'Long-distance delivery services are recommended.';
            }

            // Log the final distance and message
            console.log(`Calculated distance: ${distance.toFixed(2)} km, Message: ${message}`);

            // Return the response including the message
            res.json({ status: 'success', id, distance: distance.toFixed(2), message });
        })
        .catch(err => {
            console.error('Database error:', err);
            res.status(500).json({ status: 'error', message: 'Database error' });
        });
});

// Sync the database and start the server
const PORT = process.env.PORT || 3000;

sequelize.sync({ force: false }) // Use { force: true } in development only if necessary
    .then(() => {
        console.log('Database synced successfully');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => {
        console.error('Database sync error:', err);
        process.exit(1); // Exit the process with an error code
    });

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ status: 'error', message: 'Something went wrong!' });
});
