const Team = require("../models/Team");

// Get all members
exports.getMembers = async (req, res) => {
  try {
    const members = await Team.find();

    res.json({
      success: true,
      members,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Add member
exports.addMember = async (req, res) => {
  try {
    const member = await Team.create(req.body);

    res.status(201).json({
      success: true,
      member,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Delete member
exports.deleteMember = async (req, res) => {
  try {
    await Team.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Member Removed",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};