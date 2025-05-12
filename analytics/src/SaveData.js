import React from 'react';
import './SaveData.css';

const ProfileCard = () => {
  return (
    <div className="page-background">
      <div className="profile-container">
        <h2 className="page-title">User Manual</h2>

        {/* Admin's Message Card */}
        <div className="message-card">
          <div className="message-content">
            <h3>Brief Overview</h3>
            <p>NeuralNexus Intelligence Analytics is a powerful platform designed to streamline data analysis, preprocessing, and machine learning tasks, offering robust features for data importing, viewing, preprocessing, mining, and visualization.</p>
            <p>With support for multiple file formats (e.g., CSV,Excel), intuitive data browsing and filtering options, and tools for cleaning and transforming datasets, it ensures efficient handling of large-scale data. The platform also provides advanced machine learning algorithms for clustering, classification, and predictive modeling, along with customizable visualization options to enhance decision-making and presentations.</p>
            <p>Tailored for data analysts, students, researchers, business professionals, and IT developers, it enables automating data workflows, generating business insights, and building impactful predictive models and visualizations.</p>
          </div>
        </div>
        <div className="message-card">
          <div className="message-content">
            <h3>Getting Started</h3>
            <p>To get started with NeuralNexus Intelligence Analytics, ensure your system meets the following requirements: for software, use Windows 10 or later, macOS 10.15 or later, or a Linux distribution with Kernel 4.15+, along with Python 3.8+ (if required for advanced features). </p>
            <p>A web browser such as Chrome, Firefox, or Edge (latest versions) is needed, along with dependencies like Node.js (if applicable) and Python libraries such as Pandas, NumPy, and Matplotlib for analysis. Hardware requirements include a minimum of 4GB RAM, a dual-core processor, 2GB available storage, and a screen resolution of 1024x768, with the recommended setup being 8GB RAM, a quad-core processor, SSD storage, and a 1920x1080 screen resolution for optimal performance.</p>
            <p>To install, download the application installer from [official website/link], run the installer and follow the instructions, then install dependencies with pip install -r requirements.txt, configure environment variables if needed, and finally launch the application and complete the initial setup</p>
          </div>
        </div>
        <div className="message-card">
          <div className="message-content">
            <h3>Data Operations</h3>
            <p>Data Importing:Supported formats include CSV, Excel (.xlsx), and XML. To import data, navigate to the "Import Data" section in the application menu, select the appropriate file format, and upload your dataset for processing.</p>
            <p>Data Viewing:For browsing datasets, use the "View Data" option to scroll through the data with pagination support, making it easy to navigate through large files. Alternatively, you can visualize the dataset using the "Visualization" option for better insights and presentations.</p>
          </div>
        </div>
        <div className="message-card">
          <div className="message-content">
            <h3>Data Services</h3>
            <p>Data Services in NeuralNexus Intelligence Analytics include comprehensive tools for data preprocessing and mining. Preprocessing options allow users to remove duplicates, normalize data to scale features between specified ranges (e.g., 0-1), encode categorical variables into numerical representations (such as one-hot encoding), and handle missing values by replacing them with the mean, median, or using interpolation methods. For example, users can replace null values in a column with the median value, apply z-score normalization, or merge multiple datasets based on a common key.</p>
            <p>The data mining section offers algorithms like Birch and DBSCAN for clustering, Decision Trees, Support Vector Machines (SVM), and Random Forest for classification, and Linear Regression for regression tasks. To use these algorithms, users can select a mining algorithm from the "Algorithm Analysis" section, configure parameters such as the number of clusters for K-means or the kernel for SVM, and then run the algorithm to analyze results such as cluster centroids or classification accuracy. </p>
            <p>The platform also supports a range of machine learning algorithms for both supervised and unsupervised tasks, with detailed documentation and visual feedback on model performance. To apply machine learning, users upload and preprocess their dataset, then choose a suitable algorithm from the "Algorithm Analysis" module, configure parameters like learning rate, epochs, and validation split, train the model, and evaluate metrics such as accuracy, F1 score, or RMSE. Examples include using logistic regression or SVM for classification tasks like predicting customer churn, employing K-means for clustering tasks like identifying market segments, or using linear regression for regression tasks such as predicting house prices.</p>
          </div>
        </div>
        <div className="message-card">
          <div className="message-content">
            <h3>Data Visualization</h3>
            <p>Data Visualization in NeuralNexus Intelligence Analytics provides dynamic tools to help users gain insights from their data through various visualization options, such as bar charts, scatter plots, pie charts, histograms, and heatmaps. To generate visualizations, users can select a dataset and navigate to the "Visualization" tab.</p>
            <p>From there, they can choose a visualization type, such as a scatter plot for correlation analysis, and map data attributes to axes (e.g., X-axis: Time, Y-axis: Sales). Customization options are available, allowing users to modify chart colors, labels, and axes, as well as add titles, legends, and tooltips for enhanced interpretability.</p>
            <p>Additionally, users can export their visualizations in high-resolution formats suitable for presentations, ensuring their data is communicated clearly and effectively.</p>
          </div>
        </div>
        <div className="message-card">
          <div className="message-content">
            <h3>Best Practices</h3>
            <p>Best Practices for using NeuralNexus Intelligence Analytics include essential guidelines for data preparation, algorithm selection, and visualization. For data preparation, it is important to validate datasets for completeness and accuracy before importing them, ensuring that the data is reliable for analysis. </p>
            <p>Additionally, removing irrelevant features helps reduce noise and improves the quality of the analysis. In algorithm selection, algorithms should be matched to the specific problem type, such as using regression for numerical predictions and clustering for grouping. It is also recommended to use cross-validation to ensure the model performs robustly and generalizes well.</p>
            <p>When it comes to visualization, keeping visuals simple is key—focus on the key insights that matter most. Avoid overloading charts with excessive data points or labels to maintain clarity and make the visualizations easier to interpret.s</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
