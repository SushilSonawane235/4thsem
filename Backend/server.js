// Import necessary modules
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx'); // For handling Excel files
const csv = require('csv-parser'); // For handling CSV files
const { exec } = require('child_process'); // For executing Python scripts
const { runPythonScript } = require('./pythonRunner');


// Initialize express app
const app = express();
const port = 5000;

// Enable CORS to allow requests from your frontend (React app)
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Directory to save files
const saveDirectory = path.join(__dirname, 'saved-files');

// Ensure the save directory exists
if (!fs.existsSync(saveDirectory)) {
  fs.mkdirSync(saveDirectory, { recursive: true });
}

// Multer setup for file uploads (directly saving to the saved-files directory)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, saveDirectory); // Save files directly in the 'saved-files' directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Preserve the original file name
  }
});

const upload = multer({ storage });

// Route for uploading files
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  // Send back the uploaded file's name
  res.json({ fileName: req.file.filename });
});

// Route to save the uploaded file content and apply logic (adjusted for "select data")
app.post('/api/select-file', (req, res) => {
  const { fileName } = req.body; // Expecting file name from the frontend

  if (!fileName) {
    return res.status(400).json({ error: 'File name is required.' });
  }

  const filePath = path.join(saveDirectory, fileName); // Use saved-files directory here

  // Handle Excel file (parse the content if it's .xlsx)
  if (fileName.endsWith('.xlsx')) {
    try {
      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0]; // Get the first sheet
      const sheet = workbook.Sheets[sheetName];
      const data = xlsx.utils.sheet_to_json(sheet); // Convert sheet to JSON

      console.log('Excel data:', data); // Log the Excel data for debugging

      return res.status(200).json({ message: 'File data processed successfully!', data });
    } catch (err) {
      console.error('Error processing Excel file:', err);
      return res.status(500).json({ error: 'Failed to process Excel file.' });
    }
  }

  // Handle CSV file
  if (fileName.endsWith('.csv')) {
    const data = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        data.push(row);
      })
      .on('end', () => {
        console.log('CSV data:', data); // Log the CSV data for debugging
        return res.status(200).json({ message: 'File data processed successfully!', data });
      })
      .on('error', (err) => {
        console.error('Error processing CSV file:', err);
        return res.status(500).json({ error: 'Failed to process CSV file.' });
      });
  }
});

// Route for applying algorithm (your logic for algorithm processing)
app.post('/api/apply-algorithm', (req, res) => {
  const { fileName, algorithm } = req.body;

  if (!fileName || !algorithm) {
    return res.status(400).send('File name and algorithm are required.');
  }

  const filePath = path.join(saveDirectory, fileName); // Use the saved-files directory here

  let pythonCommand = '';
  switch (algorithm) {
    case 'Decision Tree':
      pythonCommand = `python "C:\\Users\\Aditya Pathak\\Project Sem IV\\Backend\\scripts\\apply_algorithm.py" "${filePath}" decision_tree`;
      break;
    case 'Logistic Regression':
      pythonCommand = `python "C:\\Users\\Aditya Pathak\\Project Sem IV\\Backend\\scripts\\apply_algorithm.py" "${filePath}" logistic_regression`;
      break;
    case 'Naive Bayes':
      pythonCommand = `python "C:\\Users\\Aditya Pathak\\Project Sem IV\\Backend\\scripts\\apply_algorithm.py" "${filePath}" naive_bayes`;
      break;
    case 'K-Nearest Neighbors':
      pythonCommand = `python "C:\\Users\\Aditya Pathak\\Project Sem IV\\Backend\\scripts\\apply_algorithm.py" "${filePath}" knn`;
      break;
    case 'Random Forest':
      pythonCommand = `python "C:\\Users\\Aditya Pathak\\Project Sem IV\\Backend\\scripts\\apply_algorithm.py" "${filePath}" random_forest`;
      break;
    case 'Agglomerative Clustering':
      pythonCommand = `python "C:\\Users\\Aditya Pathak\\Project Sem IV\\Backend\\scripts\\apply_algorithm.py" "${filePath}" agglomerative_clustering`;
      break;
    case 'DBSCAN':
      pythonCommand = `python "C:\\Users\\Aditya Pathak\\Project Sem IV\\Backend\\scripts\\apply_algorithm.py" "${filePath}" dbscan`;
      break;
    case 'Birch':
      pythonCommand = `python "C:\\Users\\Aditya Pathak\\Project Sem IV\\Backend\\scripts\\apply_algorithm.py" "${filePath}" birch`;
      break;
    default:
      return res.status(400).send('Algorithm not recognized!');
  }

  // Execute the Python script with the appropriate algorithm
  exec(pythonCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).json({ error: 'Error applying algorithm.' });
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return res.status(500).json({ error: 'Error applying algorithm.' });
    }

    // Send the result back to the frontend
    console.log(`stdout: ${stdout}`);
    res.status(200).json({ result: stdout });
  });
});


// Route for saving the file to the server (directly saves to saved-files)
app.post('/api/save-file', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const filePath = path.join(saveDirectory, req.file.filename);

  // No need to move the file, as it's already saved in the saved-files directory
  res.status(200).json({ message: 'File saved successfully!', fileName: req.file.filename });
});

// Serve files directly from the saved-files directory
app.use('/saved-files', express.static(saveDirectory));

// GET route to list all saved files (CSV and Excel)
app.get('/api/view-files', (req, res) => {
  fs.readdir(saveDirectory, (err, files) => {
    if (err) {
      console.error('Error retrieving files:', err);
      return res.status(500).json({ error: 'Failed to retrieve files.' });
    }

    // Filter only CSV and Excel files
    const fileTypes = ['.csv', '.xlsx'];
    const filteredFiles = files.filter(file => fileTypes.includes(path.extname(file).toLowerCase()));

    res.status(200).json({ files: filteredFiles });
  });
});

// GET route to fetch dataset for visualization (CSV/Excel)
app.get('/api/get-dataset/:fileName', (req, res) => {
  const { fileName } = req.params;
  const filePath = path.join(saveDirectory, fileName);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found.' });
  }

  const fileExtension = path.extname(fileName).toLowerCase();

  if (fileExtension === '.xlsx') {
    try {
      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = xlsx.utils.sheet_to_json(sheet);
      return res.status(200).json({ data });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to process Excel file.' });
    }
  } else if (fileExtension === '.csv') {
    const data = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        data.push(row);
      })
      .on('end', () => {
        return res.status(200).json({ data });
      })
      .on('error', (err) => {
        console.error('Error processing CSV file:', err);
        return res.status(500).json({ error: 'Failed to process CSV file.' });
      });
  } else {
    return res.status(400).json({ error: 'Unsupported file type.' });
  }
});

// GET route to download a file
app.get('/api/download-file/:fileName', (req, res) => {
  const { fileName } = req.params;
  const filePath = path.join(saveDirectory, fileName);

  if (!fs.existsSync(filePath)) {
    console.error('File not found:', filePath);
    return res.status(404).json({ error: 'File not found.' });
  }

  const extname = path.extname(fileName).toLowerCase();
  const mimeTypes = {
    '.pdf': 'application/pdf',
    '.txt': 'text/plain',
    '.json': 'application/json',
    '.csv': 'text/csv',
    '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    '.jpg': 'image/jpeg',
    '.png': 'image/png',
  };

  const mimeType = mimeTypes[extname] || 'application/octet-stream';

  res.setHeader('Content-Type', mimeType);
  res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
  fs.createReadStream(filePath).pipe(res);
});

// Route for deleting a file
app.delete('/api/delete-file/:fileName', (req, res) => {
  const { fileName } = req.params;
  const filePath = path.join(saveDirectory, fileName);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    return res.status(200).json({ message: 'File deleted successfully!' });
  } else {
    return res.status(404).json({ error: 'File not found.' });
  }
});

const filesRoute = require('./routes/files');
const summaryRoute = require('./routes/summary');
app.use('/api', filesRoute);
app.use('/api', summaryRoute);
app.use('/saved-files', express.static(path.join(__dirname, 'saved-files')));


// Route to fetch dataset summary
app.get('/api/get-dataset-summary/:fileName', (req, res) => {
  const { fileName } = req.params;
  const filePath = path.join(__dirname, 'saved-files', fileName);

  // Run the Python script to generate summary
  runPythonScript(filePath, (error, summary) => {
    if (error) {
      return res.status(500).json({ error: 'Failed to generate dataset summary' });
    }

    res.status(200).json(summary);  // Send back the summary as a response
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
