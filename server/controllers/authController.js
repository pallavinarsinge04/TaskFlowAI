import supabase from "../config/supabase.js";

export const register = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name
        }
      }
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.status(201).json({
      success: true,
      user: data.user,
      session: data.session
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
};

export const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const { data, error } =
      await supabase.auth.signInWithPassword({

        email,
        password

      });

    if (error) {

      return res.status(400).json({
        success: false,
        message: error.message
      });

    }

    res.json({
      success: true,
      user: data.user,
      session: data.session
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

};