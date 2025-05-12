import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ExportData.css';
import axios from 'axios';

const ExportData = () => {
  const [selectedFile, setSelectedFile] = useState(null); // To store the selected file
  const [loading, setLoading] = useState(false); // To manage the loading state

  // Function to handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0]; // Get the first file selected by the user
    if (file) {
      setSelectedFile(file); // Store the file in the state
    }
  };

  // Function to handle file saving to the backend
  const handleSaveFile = async () => {
    if (!selectedFile) {
      alert('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile); // Append the file to FormData

    setLoading(true); // Show loading state

    try {
      // Send the file to the backend using FormData
      const response = await axios.post('http://localhost:5000/api/save-file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('File saved successfully:', response.data);
      alert('File saved successfully!');
    } catch (error) {
      console.error('Error saving file:', error);
      alert('Error saving file.');
    } finally {
      setLoading(false); // Hide loading state after the process
    }
  };

  return (
    <div className="page-background">
      {/* Page Headline */}
      <h1 className="page-title">Import Data</h1>

      {/* Cards Section for Export Data Options */}
      <div className="card-container">
        {/* Import Online Card */}
        <div className="card">
          <h3>Import Online</h3>
          <p>Import your data directly from the cloud to your account.</p>
          <Link to="/export-online" className="card-btn">
            Import Online
          </Link>
        </div>

        {/* Import from Device Card */}
        <div className="card">
          <h3>Import from Device</h3>
          <p>Import data stored locally on your device.</p>

          {/* File input button to open the file selection window */}
          <input
            type="file"
            className="card-btn"
            onChange={handleFileSelect}
            accept=".json, .csv, .txt, .pdf, .xlsx" // Include Excel (.xlsx) in accepted file types
          />
          {/* Show selected file name if a file is chosen */}
          {selectedFile && <p>Selected file: {selectedFile.name}</p>}

          {/* Save button to save the file content to the database */}
          <button onClick={handleSaveFile} className="card-btn" disabled={loading}>
            {loading ? 'Saving...' : 'Save to Database'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportData;
