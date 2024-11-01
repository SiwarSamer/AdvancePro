// db/models/associations.js
const Dress = require('./dress.model'); // Ensure the path is correct
const Wishlist = require('./wishlist.model'); // Ensure the path is correct

// Define associations
Dress.hasMany(Wishlist, { foreignKey: 'dressId' });
Wishlist.belongsTo(Dress, { foreignKey: 'dressId' });

module.exports = { Dress, Wishlist };
