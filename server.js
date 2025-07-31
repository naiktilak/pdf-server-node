const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const VALID_TOKEN = "72GNkaSukKzvAYarr7m2ysqyRn2B";

app.get('/pdf', (req, res) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ') || authHeader.split(' ')[1] !== VALID_TOKEN) {
    return res.status(401).send('Unauthorized');
  }

  const filePath = path.join(__dirname, 'sample.pdf');
  if (!fs.existsSync(filePath)) {
    return res.status(404).send('PDF file not found');
  }

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'inline; filename=sample.pdf');
  fs.createReadStream(filePath).pipe(res);
});

app.get('/', (req, res) => {
  res.send('Server is running. Try GET /pdf with a Bearer token.');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
