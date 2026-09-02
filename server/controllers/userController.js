import supabase from "../config/supabase.js";

/*
|--------------------------------------------------------------------------
| Get Users
|--------------------------------------------------------------------------
*/

export const getUsers = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error("Get users error:", error);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    const users = (data || []).map((user) => {
      const safeUser = { ...user };

      delete safeUser.password;

      return safeUser;
    });

    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Get users error:", error);

    return res.status(500).json({
      success: false,
      message:
        error.message || "Failed to fetch users.",
    });
  }
};