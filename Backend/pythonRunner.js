const { spawn } = require('child_process');
const path = require('path');

// Function to run the Python script for dataset summary
function runPythonScript(filePath, callback) {
  const pythonProcess = spawn('python', ['summary.py', filePath]);

  let data = '';

  // Collect output from Python script
  pythonProcess.stdout.on('data', (chunk) => {
    data += chunk;
  });

  pythonProcess.stderr.on('data', (error) => {
    console.error(`Python error: ${error}`);
  });

  pythonProcess.on('close', (code) => {
    if (code === 0) {
      try {
        const summary = JSON.parse(data);
        callback(null, summary);  // Call the callback with the summary data
      } catch (e) {
        callback("Error parsing Python script output", null);
      }
    } else {
      callback('Python script failed to run', null);
    }
  });
}

module.exports = { runPythonScript };
