const mongoose = require("mongoose");

const ScrapeDataSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  sourceUrl: {
    type: String,
    required: true,
  },
  scrapedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports =
  mongoose.models.ScrapeData || mongoose.model("ScrapeData", ScrapeDataSchema);
