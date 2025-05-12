import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import SmartAnalysis from './SmartAnalysis';
import PredictiveAnalysis from './PredictiveAnalysis';
import Visualization from './Visualization';
import ExportData from './ExportData';
import SaveData from './SaveData';
import ViewData from './ViewData';
import Profile from './Profile';
import Contact from './Contact';
import Resources from './Resources';

function App() {
  return (
    <Router>

      <div className="app-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/export-data" element={<ExportData />} />
          <Route path="/save-data" element={<SaveData />} />
          <Route path="/view-data" element={<ViewData />} />
          <Route path="/smart-analysis" element={<SmartAnalysis />} />
          <Route path="/predictive-analysis" element={<PredictiveAnalysis />} />
          <Route path="/visualization" element={<Visualization />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
