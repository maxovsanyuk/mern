const { Router } = require("express");
const Link = require("../models/Link");
const router = Router();

const auth = require("../middleware/auth.middleware");
const config = require("config");
const shortId = require("shortid");

router.get("/:code", async (req, res) => {
  try {
    const link = await Link.findOne({ code: req.params.code });

    if (link) {
      link.clicks++;
      await link.save();
      return res.redirect(link.from);
    }

    res.status(404).json({ message: "link not found" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
