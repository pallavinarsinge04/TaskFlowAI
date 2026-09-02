import supabase from "../config/supabase.js";

/*
|--------------------------------------------------------------------------
| Get current user's profile
|--------------------------------------------------------------------------
*/

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (error || !data) {
      return res.status(404).json({
        success: false,
        message: "Profile not found.",
      });
    }

    // Never return password
    delete data.password;

    return res.status(200).json({
      success: true,
      user: data,
    });
  } catch (error) {
    console.error("Get profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch profile.",
    });
  }
};

/*
|--------------------------------------------------------------------------
| Update current user's profile
|--------------------------------------------------------------------------
*/

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const allowedFields = [
      "name",
      "full_name",
      "avatar",
      "bio",
      "phone",
      "location",
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid profile fields provided.",
      });
    }

    const { data, error } = await supabase
      .from("users")
      .update(updates)
      .eq("id", userId)
      .select("*")
      .single();

    if (error) {
      console.error("Update profile error:", error);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    delete data.password;

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user: data,
    });
  } catch (error) {
    console.error("Update profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update profile.",
    });
  }
};