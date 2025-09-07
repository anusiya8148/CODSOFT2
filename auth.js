import express from "express";
import passport from "passport";

const router = express.Router();

//  Google Login Start
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google Callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.json({
      message: "Google login success ",
      user: req.user, // Google profile details
    });
  }
);

//  Logout route (optional)
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.json({ message: "Logged out successfully" });
  });
});

export default router;