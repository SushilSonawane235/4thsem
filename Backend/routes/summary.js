const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');
const path = require('path');

// GET /api/summary?file=filename.csv
router.get('/summary', (req, res) => {
    const fileName = req.query.file;
    if (!fileName) {
        return res.status(400).json({ error: "No file specified" });
    }

    const datasetPath = path.join(__dirname, '../saved-files', fileName);

    const python = spawn('python', ['summary.py', datasetPath]);

    let data = '';
    let errorData = '';

    python.stdout.on('data', (chunk) => {
        data += chunk.toString();
    });

    python.stderr.on('data', (error) => {
        errorData += error.toString();
    });

    python.on('close', (code) => {
        if (code !== 0) {
            console.error('Python Error:', errorData);
            return res.status(500).json({ error: "Failed to generate summary", details: errorData });
        }

        try {
            const parsedData = JSON.parse(data);
            res.json(parsedData);
        } catch (err) {
            console.error('JSON Parse Error:', err);
            res.status(500).json({ error: "Invalid response from Python script" });
        }
    });
});

module.exports = router;
