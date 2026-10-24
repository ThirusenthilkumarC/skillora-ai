const CareerRole = require('../models/CareerRole');

// @desc    Get all available career roles
// @route   GET /api/roles
const getAllRoles = async (req, res, next) => {
  try {
    const { search, category } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
        { 'requiredSkills.name': { $regex: search, $options: 'i' } }
      ];
    }

    if (category && category !== 'All') {
      query.category = category;
    }

    const roles = await CareerRole.find(query).sort({ title: 1 });
    res.status(200).json({
      success: true,
      count: roles.length,
      roles
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single role by slug or ID
// @route   GET /api/roles/:id
const getRoleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let role = null;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      role = await CareerRole.findById(id);
    }
    if (!role) {
      role = await CareerRole.findOne({ slug: id.toLowerCase() });
    }

    if (!role) {
      return res.status(404).json({
        success: false,
        message: `Career role '${id}' not found.`
      });
    }

    res.status(200).json({
      success: true,
      role
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllRoles,
  getRoleById
};
