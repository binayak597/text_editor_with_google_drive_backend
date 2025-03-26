import { Router } from "express";
import jwtAuth from "../../middlewares/jwtAuth.middleware.js";
import { google } from "googleapis";

const router = Router();

// save letter to google drive
router.post("/save-letter", jwtAuth, async (req, res) => {
  try {
    const { content, folderId } = req.body;
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: req.user.accessToken });
    const drive = google.drive({ version: "v3", auth });

    const fileMetadata = {
      name: `Letter-${Date.now()}.doc`,
      parents: [folderId],
      mimeType: "application/vnd.google-apps.document"
    };

    const media = {
      mimeType: "text/plain",
      body: content
    };

    const file = await drive.files.create({
      resource: fileMetadata,
      media,
      fields: "id"
    });

    res.json({ message: "Letter saved successfully!", fileId: file.data.id });
  } catch (error) {
    res.status(500).json({ error: "Error saving letter" });
  }
});

export default router;