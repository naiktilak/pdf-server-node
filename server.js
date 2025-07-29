const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

const PDF_PATH = path.join(__dirname, "sample.pdf");
const VALID_TOKEN = "CaGh1QG6JhOpHWQCrsC91HvgXRsz";

// Middleware to check Bearer Token
app.use("/pdf", (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send("Unauthorized: Missing token");
  }

  const token = authHeader.split(" ")[1];
  if (token !== VALID_TOKEN) {
    return res.status(403).send("Forbidden: Invalid token");
  }

  next();
});

// Serve the PDF
app.get("/pdf", (req, res) => {
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "inline; filename=sample.pdf");

  const fileStream = fs.createReadStream(PDF_PATH);
  fileStream.pipe(res);
});

// Start server
app.listen(PORT, () => {
  console.log(`PDF server running at http://localhost:${PORT}/pdf`);
});
