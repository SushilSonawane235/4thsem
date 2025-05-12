import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PredictiveAnalysis.css'; // Import the custom stylesheet

const PredictiveAnalysis = () => {
  const [files, setFiles] = useState([]); // State to store available files
  const [selectedFile, setSelectedFile] = useState(''); // State to store selected file
  const [fileData, setFileData] = useState(null); // State to store file data
  const [analysisType, setAnalysisType] = useState(''); // State to store selected analysis type
  const [algorithm, setAlgorithm] = useState(''); // State to store selected algorithm
  const [result, setResult] = useState(null); // State to store algorithm result
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch available files from backend when component mounts
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/view-files');
        setFiles(response.data.files);
      } catch (error) {
        console.error('Error fetching files:', error);
        alert('Error fetching files!');
      }
    };

    fetchFiles();
  }, []);

  // Handle file selection
  const handleFileSelect = (fileName) => {
    setSelectedFile(fileName);
  };

  // Fetch file data after selecting a file
  const fetchFileData = async () => {
    if (!selectedFile) {
      alert('Please select a file.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/select-file', {
        fileName: selectedFile,
      });
      setFileData(response.data.data);
    } catch (error) {
      console.error('Error fetching file data:', error);
      alert('Error fetching file data!');
    }
  };

  // Handle algorithm application
  const handleApplyAlgorithm = async () => {
    if (!algorithm || !analysisType) {
      alert('Please select an analysis type and algorithm.');
      return;
    }

    if (!selectedFile) {
      alert('Please select a file');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/apply-algorithm', {
        fileName: selectedFile,
        algorithm: algorithm,
      });
      setResult(response.data.result);
    } catch (error) {
      console.error('Error applying algorithm:', error);
      alert('Error applying algorithm!');
    } finally {
      setLoading(false);
    }
  };

  // Define algorithms for classification and clustering
  const classificationAlgorithms = [
    'Decision Tree',
    'Logistic Regression',
    'Naive Bayes',
    'K-Nearest Neighbors',
    'Random Forest',
  ];

  const clusteringAlgorithms = [
    'Agglomerative Clustering',
    'DBSCAN',
    'Birch',
  ];

  return (
    <div className="predictive-analysis-container">
      <h1 className="predictive-analysis-title">Data Mining and Machine Learning Algorithms</h1>

      {/* File Selection Section */}
      <div className="file-upload-container">
        <h3>Select a File from Server</h3>
        <select onChange={(e) => handleFileSelect(e.target.value)} value={selectedFile} className="file-select">
          <option value="">Select a File</option>
          {files.map((file) => (
            <option key={file} value={file}>
              {file}
            </option>
          ))}
        </select>
        <button onClick={fetchFileData}>Fetch File Data</button>
      </div>

      {/* File Data Display */}
      {fileData && (
        <div className="file-data-container">
          <h3>File Data:</h3>
          <pre>{JSON.stringify(fileData, null, 2)}</pre>
        </div>
      )}

      {/* Analysis Type Selection */}
      <div className="analysis-type-container">
        <h3>Select Analysis Type</h3>
        <select onChange={(e) => setAnalysisType(e.target.value)} value={analysisType} className="analysis-type-select">
          <option value="">Select Analysis Type</option>
          <option value="Classification">Classification</option>
          <option value="Clustering">Clustering</option>
        </select>
      </div>

      {/* Algorithm Selection */}
      {analysisType && (
        <div className="algorithm-selection-container">
          <h3>Select Algorithm</h3>
          <select onChange={(e) => setAlgorithm(e.target.value)} value={algorithm} className="algorithm-select">
            <option value="">Select Algorithm</option>
            {(analysisType === 'Classification' ? classificationAlgorithms : clusteringAlgorithms).map((algo) => (
              <option key={algo} value={algo}>
                {algo}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Apply Algorithm Button */}
      <button onClick={handleApplyAlgorithm} disabled={loading}>
        {loading ? 'Processing...' : 'Apply Algorithm'}
      </button>

      {/* Algorithm Result Display */}
      {result && (
        <div className="result-container">
          <h3>Algorithm Result:</h3>
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
};

export default PredictiveAnalysis;
