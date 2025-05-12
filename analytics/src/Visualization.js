import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { Bar, Pie, Line, Radar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement, RadialLinearScale } from "chart.js";
import {
  Typography,
  Select,
  MenuItem,
  FormControl,
  Box,
  Card,
  CardContent,
  Grid,
} from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
);

const Visualization = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [fileData, setFileData] = useState([]);
  const [chartType, setChartType] = useState("bar");

  // Fetch the list of files from the backend
  const fetchFiles = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/view-files");
      setFiles(response.data.files);
    } catch (err) {
      console.error("Error fetching files:", err);
    }
  };

  useEffect(() => {
    fetchFiles(); // Fetch files when component mounts
  }, []);

  // Handle file selection for visualization
  const handleFileChange = async (e) => {
    const fileName = e.target.value;
    setSelectedFile(fileName);

    if (fileName) {
      const fileExtension = fileName.split(".").pop().toLowerCase();
      if (fileExtension === "csv") {
        const response = await axios.get(`http://localhost:5000/api/download-file/${fileName}`);
        const rows = response.data.split("\n").map((row) => row.split(","));
        setFileData(rows);
      } else if (fileExtension === "xlsx" || fileExtension === "xls") {
        const response = await axios.get(`http://localhost:5000/api/download-file/${fileName}`, { responseType: "arraybuffer" });
        const wb = XLSX.read(response.data, { type: "array" });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(ws, { header: 1 });
        setFileData(json);
      } else {
        alert("Invalid file type. Please select a CSV or Excel file.");
      }
    }
  };

  const generateRandomColors = (length) =>
    Array.from({ length }, () => `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`);

  const generateChartData = () => {
    const labels = fileData[0]?.slice(1);
    const datasets = fileData.slice(1).map((row, index) => ({
      label: `Data ${index + 1}`,
      data: row.slice(1),
      backgroundColor: generateRandomColors(row.slice(1).length),
      borderColor: generateRandomColors(row.slice(1).length),
      borderWidth: 1,
    }));
    return { labels, datasets };
  };

  return (
    <Box sx={{ backgroundColor: "#f0f8ff", minHeight: "100vh", padding: 4 }}>
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{ color: "black", fontWeight: "bold" }}
      >
        Select and Visualize Data
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              boxShadow: 3,
              borderRadius: 3,
              backgroundColor: "#ffffff",
              padding: 3,
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ color: "black", fontWeight: "bold" }}
              >
                Select a File
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={selectedFile}
                  onChange={handleFileChange}
                  sx={{
                    backgroundColor: "#e0f7fa",
                    borderRadius: 2,
                    borderColor: "#00bcd4",
                  }}
                >
                  <MenuItem value="">-- Select File --</MenuItem>
                  {files.map((file, index) => (
                    <MenuItem key={index} value={file}>
                      {file}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>

        {fileData.length > 0 && (
          <Grid item xs={12} md={8}>
            <Card
              sx={{
                boxShadow: 3,
                borderRadius: 3,
                backgroundColor: "#ffffff",
                padding: 3,
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ color: "#00bcd4", fontWeight: "bold" }}
                >
                  Select Visualization Type
                </Typography>
                <FormControl fullWidth>
                  <Select
                    value={chartType}
                    onChange={(e) => setChartType(e.target.value)}
                    sx={{
                      backgroundColor: "#e0f7fa",
                      borderRadius: 2,
                      borderColor: "#00bcd4",
                    }}
                  >
                    <MenuItem value="bar">Bar Chart</MenuItem>
                    <MenuItem value="pie">Pie Chart</MenuItem>
                    <MenuItem value="line">Line Chart</MenuItem>
                    <MenuItem value="radar">Radar Chart</MenuItem>
                    <MenuItem value="doughnut">Doughnut Chart</MenuItem>
                    <MenuItem value="table">View Table</MenuItem>
                  </Select>
                </FormControl>
                <Box
                  sx={{
                    marginTop: 3,
                    padding: 2,
                    backgroundColor: "#ffffff",
                    borderRadius: 2,
                    border: "1px solid #00bcd4",
                  }}
                >
                  {chartType === "bar" && <Bar data={generateChartData()} />}
                  {chartType === "pie" && <Pie data={generateChartData()} />}
                  {chartType === "line" && <Line data={generateChartData()} />}
                  {chartType === "radar" && <Radar data={generateChartData()} />}
                  {chartType === "doughnut" && <Doughnut data={generateChartData()} />}
                  {chartType === "table" && (
                    <table
                      id="data-table"
                      border="1"
                      style={{
                        width: "100%",
                        textAlign: "left",
                        borderCollapse: "collapse",
                        backgroundColor: "#ffffff",
                        border: "1px solid #00bcd4",
                      }}
                    >
                      {fileData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                            <td
                              key={cellIndex}
                              style={{
                                padding: "0.5rem",
                                border: "1px solid #00bcd4",
                                color: "#00bcd4",
                              }}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </table>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Visualization;
