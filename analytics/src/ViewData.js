import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewData.css'; // Custom CSS for styling

const ViewData = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  // Fetch the list of files from the backend
  const fetchFiles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/view-files');
      setFiles(response.data.files); // Assuming the backend response contains a 'files' array
    } catch (err) {
      setError('Failed to load files');
      console.error('Error fetching files:', err);
    }
  };

  useEffect(() => {
    fetchFiles(); // Fetch the files when the component is mounted
  }, []);

  // Handle file download
  const handleDownload = (fileName) => {
    // Make a GET request to the backend to download the file
    window.open(`http://localhost:5000/api/download-file/${fileName}`, '_blank');
  };

  // Handle file deletion
  const handleDelete = async (fileName) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete-file/${fileName}`);
      setFiles(files.filter(file => file !== fileName)); // Update the list after deletion
      alert('File deleted successfully');
    } catch (err) {
      console.error('Error deleting file:', err);
      alert('Failed to delete file');
    }
  };

  return (
    <div className="view-data-page">
      <h1>View Saved Files</h1>

      {error && <p className="error">{error}</p>}

      {files.length === 0 ? (
        <p>No files available.</p>
      ) : (
        <div className="card-container">
          {files.map((file, index) => (
            <div className="card" key={index}>
              <h3>{file}</h3>
              <div className="card-btns">
                <button className="card-btn" onClick={() => handleDownload(file)}>Download</button>
                <button className="card-btn" onClick={() => handleDelete(file)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewData;
