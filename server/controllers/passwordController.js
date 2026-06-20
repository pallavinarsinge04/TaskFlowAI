const User = require("../models/User");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

exports.forgotPassword = async (
  req,
  res
) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const token = crypto
      .randomBytes(32)
      .toString("hex");

    user.resetToken = token;

    await user.save();

    const link =
      `${process.env.CLIENT_URL}/reset-password/${token}`;

    await sendEmail(
      user.email,
      "Reset Password",
      `<h2>Reset Password</h2>
       <a href="${link}">Click Here</a>`
    );

    res.json({
      success: true,
      message: "Reset email sent",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};