import openai from "../config/openai.js";
import supabase from "../config/supabase.js";

export const chatWithAI = async (req, res) => {

  try {

    const { prompt, userId } = req.body;

    const completion = await openai.chat.completions.create({

      model: "gpt-4.1-mini",

      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],

    });

    const response = completion.choices[0].message.content;

    await supabase
      .from("ai_chats")
      .insert([
        {
          user_id: userId,
          prompt,
          response,
        },
      ]);

    res.json({
      response,
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

};
export const getHistory = async (req, res) => {

  try {

    const { data, error } = await supabase
      .from("ai_chats")
      .select("*")
      .eq("user_id", req.params.userId)
      .order("created_at", {
        ascending: false,
      });

    if (error)
      return res.status(500).json(error);

    res.json(data);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

};