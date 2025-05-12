const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// GET /api/files - List all files
router.get('/files', (req, res) => {
    const folderPath = path.join(__dirname, '../saved-files');
    
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error('Error reading files:', err);
            return res.status(500).json({ error: "Failed to list files" });
        }
        
        // Only send .csv files
        const csvFiles = files.filter(file => file.endsWith('.csv'));
        res.json({ files: csvFiles });
    });
});

module.exports = router;
