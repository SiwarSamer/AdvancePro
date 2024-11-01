const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../../../../db/models/admin.model');
const Dress = require('../../../../db/models/dress.model');

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
      approved: false, // Default approval status
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

// Function to get all dresses (Admin function)
exports.getAllDresses = async (req, res) => {
  try {
    const dresses = await Dress.findAll();
    res.status(200).json({ message: 'Dresses retrieved successfully', dresses });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving dresses', error });
  }
};

// Function to approve a dress (Admin function)
exports.approveDress = async (req, res) => {
  try {
    const { id } = req.params;
    
    const dress = await Dress.findByPk(id);
    if (!dress) return res.status(404).json({ message: 'Dress not found' });

    await dress.update({ approved: true });
    res.status(200).json({ message: 'Dress approved successfully', dress });
  } catch (error) {
    res.status(500).json({ message: 'Error approving dress', error });
  }
};

// Function to generate a revenue report (Admin function)
exports.getRevenueReport = async (req, res) => {
  try {
    const dresses = await Dress.findAll();
    const totalRevenue = dresses.reduce((sum, dress) => sum + (dress.price || 0), 0);

    res.status(200).json({
      message: 'Revenue report generated successfully',
      totalRevenue,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error generating revenue report', error });
  }
};

// Function to set rental pricing for a dress (Admin function)
exports.setRentalPricing = async (req, res) => {
  try {
    const { id } = req.params;
    const { dailyRate, weeklyRate, monthlyRate, discount } = req.body;

    const dress = await Dress.findByPk(id);
    if (!dress) return res.status(404).json({ message: 'Dress not found' });

    await dress.update({
      dailyRate,
      weeklyRate,
      monthlyRate,
      discount,
    });

    res.status(200).json({ message: 'Rental pricing updated successfully', dress });
  } catch (error) {
    res.status(500).json({ message: 'Error updating rental pricing', error });
  }
};

// Function to calculate rental cost based on duration
exports.calculateRentalCost = async (req, res) => {
  try {
    const { id } = req.params;
    const { rentalDays } = req.body;

    const dress = await Dress.findByPk(id);
    if (!dress) return res.status(404).json({ message: 'Dress not found' });

    let cost;
    if (rentalDays >= 30 && dress.monthlyRate) {
      cost = dress.monthlyRate;
    } else if (rentalDays >= 7 && dress.weeklyRate) {
      cost = Math.ceil(rentalDays / 7) * dress.weeklyRate;
    } else {
      cost = rentalDays * dress.dailyRate;
    }

    // Apply discount if applicable
    if (dress.discount) {
      cost -= cost * (dress.discount / 100);
    }

    res.status(200).json({ message: 'Rental cost calculated successfully', cost });
  } catch (error) {
    res.status(500).json({ message: 'Error calculating rental cost', error });
  }
};
