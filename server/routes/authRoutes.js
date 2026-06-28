import express from "express";

const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  return res.json({
    message: "Login success",
    token: "demo-token",
    user: { email }
  });
});

export default router;