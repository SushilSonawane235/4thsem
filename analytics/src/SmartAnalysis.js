import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SmartAnalysis() {
  const [files, setFiles] = useState([]);        // List of dataset files
  const [selectedFile, setSelectedFile] = useState(''); // Selected file name
  const [summary, setSummary] = useState(null);   // Dataset summary data
  const [loading, setLoading] = useState(false);  // To show loading state

  // Fetch the list of files when the component mounts
  useEffect(() => {
    axios.get('http://localhost:5000/api/view-files')  // API endpoint for listing files
      .then(response => {
        setFiles(response.data.files);  // Set the list of files
      })
      .catch(error => {
        console.error('Error fetching file list:', error);
      });
  }, []);

  // Handle file selection and fetch summary on selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.value);
    setSummary(null);  // Clear previous summary
  };

  // Fetch dataset summary when "Show Details" button is clicked
  const handleShowSummary = () => {
    setLoading(true);  // Start loading
    axios.get(`http://localhost:5000/api/get-dataset-summary/${selectedFile}`) // API endpoint for dataset summary
      .then(response => {
        setSummary(response.data);  // Set the dataset summary
        setLoading(false);  // Stop loading
      })
      .catch(error => {
        console.error('Error fetching dataset summary:', error);
        setLoading(false);  // Stop loading even if error occurs
      });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Dataset Summary</h2>

      <div style={styles.selectContainer}>
        <label>Select a file: </label>
        <select
          value={selectedFile}
          onChange={handleFileChange}
          style={styles.select}
        >
          <option value="">-- Select a file --</option>
          {files.map((file, index) => (
            <option key={index} value={file}>{file}</option>
          ))}
        </select>
      </div>

      <button
        onClick={handleShowSummary}
        style={styles.button}
        disabled={!selectedFile || loading}
      >
        {loading ? 'Loading...' : 'Show Details'}
      </button>

      {summary && (
        <div style={styles.summaryContainer}>
          <p><strong>Rows:</strong> {summary.rows}</p>
          <p><strong>Columns:</strong> {summary.columns}</p>

          <h3 style={styles.columnHeader}>Column Details:</h3>
          <div>
            {summary.column_info && Object.entries(summary.column_info).map(([col, info]) => (
              <div key={col} style={styles.columnDetail}>
                <strong>{col}</strong> (type: {info.dtype})<br />
                Missing: {info.missing_values}<br />
                {info.mean !== undefined && (
                  <>
                    Mean: {info.mean.toFixed(2)}, Median: {info.median.toFixed(2)}<br />
                    Min: {info.min}, Max: {info.max}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Styling (same as before)
const styles = {
  container: { padding: '20px', maxWidth: '600px', margin: '0 auto', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' },
  header: { textAlign: 'center', fontSize: '24px', marginBottom: '20px' },
  selectContainer: { marginBottom: '20px' },
  select: { width: '100%', padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' },
  button: { width: '100%', padding: '10px', fontSize: '16px', backgroundColor: '#00bcd4', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '20px' },
  summaryContainer: { marginTop: '20px' },
  columnHeader: { marginTop: '10px', fontSize: '18px', color: '#00bcd4' },
  columnDetail: { marginBottom: '15px', paddingLeft: '10px', borderLeft: '2px solid #00bcd4' },
};

export default SmartAnalysis;
