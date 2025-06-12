import express from "express";
import { generateId, goToUrl } from "../controllers/urlController.js";

const router = express.Router();

// ✅ URL validation helper
function isValidUrl(originalUrl) {
  try {
    new URL(originalUrl);
    return true;
  } catch (_) {
    return false;
  }
}

// POST route: Create short URL
router.post("/", async (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl || !isValidUrl(originalUrl)) {
    return res.status(400).json({ error: "Invalid or missing URL." });
  }

  try {
    const shortId = await generateId(originalUrl);
    res
      .status(201)
      .json({ shortUrl: `http://localhost:8000/api/url/${shortId}` });
  } catch (error) {
    console.error("Error generating short URL:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// GET route: Redirect to original URL
router.get("/url/:id", async (req, res) => {
  const shortId = req.params.id;

  try {
    const ogUrl = await goToUrl(shortId);
    res.redirect(ogUrl);
  } catch (error) {
    console.error("ShortId not found:", error.message);
    res.status(404).json({ error: error.message });
  }
});

export default router;
