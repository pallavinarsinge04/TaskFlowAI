const User = require("../models/User");

exports.getProfile = async (req, res) => {
  try {

    const user = await User.findById(req.params.id)
      .select("-password");

    res.json({
      success: true,
      user,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

exports.updateProfile = async (req, res) => {

  try {

    const user = await User.findByIdAndUpdate(

      req.params.id,

      req.body,

      {
        new: true,
      }

    );

    res.json({

      success: true,

      user,

    });

  } catch (err) {

    res.status(500).json({

      success: false,

      message: err.message,

    });

  }

};