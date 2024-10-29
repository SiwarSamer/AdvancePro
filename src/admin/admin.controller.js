const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../../db/models/admin.model');
const Dress = require('../../db/models/dress.model');

// Function to add a dress (Admin function)
exports.addDress = async (req, res) => {
  try {
    const { style, size, color, available, price, description } = req.body;

    const dress = await Dress.create({
      style,
      size,
      color,
      available,
      price,
      description,
    });

    res.status(201).json({ message: 'Dress added successfully', dress });
  } catch (error) {
    res.status(500).json({ message: 'Error adding dress', error });
  }
};

// Function to delete a dress (Admin function)
exports.deleteDress = async (req, res) => {
  try {
    const { id } = req.params;

    const dress = await Dress.findByPk(id);
    if (!dress) return res.status(404).json({ message: 'Dress not found' });

    await dress.destroy();
    res.status(200).json({ message: 'Dress deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting dress', error });
  }
};

// Function to update dress information (Admin function)
exports.updateDress = async (req, res) => {
  try {
    const { id } = req.params;
    const { style, size, color, available, price, description } = req.body;

    const dress = await Dress.findByPk(id);
    if (!dress) return res.status(404).json({ message: 'Dress not found' });

    await dress.update({
      style,
      size,
      color,
      available,
      price,
      description,
    });

    res.status(200).json({ message: 'Dress updated successfully', dress });
  } catch (error) {
    res.status(500).json({ message: 'Error updating dress', error });
  }
};

