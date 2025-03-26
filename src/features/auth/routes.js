import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";


import jwtAuth from "../../middlewares/jwtAuth.middleware.js";
import { createLettersFolder } from "../../../utils/googleDrive.js";

const router = Router();

// google oAuth login route
router.get("/google", 
  passport.authenticate("google", { 
    scope: ["profile", "email", "https://www.googleapis.com/auth/drive.file"], 
    session: false
  })
);

// google oAuth callback route
router.get("/google/callback", 
  passport.authenticate("google", { session: false }), 
  async (req, res) => {
    try {
      const user = req.user;
      const folderId = await createLettersFolder(user.accessToken);

      // generating JWT token
      const token = jwt.sign({ ...user, folderId }, process.env.JWT_SECRET, { expiresIn: "1h" });

      // redirect to frontend with token in URL
      res.redirect(`http://localhost:5173/dashboard?token=${token}`);
    } catch (error) {
      console.error("Error during authentication:", error);
      res.status(500).json({ error: "Error during authentication" });
    }
  }
);


// get user profile (protected with jwtAuth)
router.get("/profile", jwtAuth, (req, res) => {
  res.json({ user: req.user });
});

export default router;