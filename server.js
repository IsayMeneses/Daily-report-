const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// Configure body-parser middleware to handle JSON data
app.use(bodyParser.json());

// Define the save route
app.post('/save', (req, res) => {
  const { student, date, html } = req.body;

  // Save the table data to a file
  const fileName = `student_reports/${student}_${date}.html`;
  const filePath = path.join(__dirname, fileName);
  fs.writeFile(filePath, html, (error) => {
    if (error) {
      console.error('Error saving table:', error);
      res.status(500).json({ message: 'Failed to save table.' });
    } else {
      res.status(200).json({ message: 'Table saved successfully.' });
    }
  });
});

// Serve static files
app.use(express.static('public'));

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
