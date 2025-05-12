import React from 'react';
import './ProfileCard.css';

const ProfileCard = () => {
  return (
    <div className="page-background">
      <div className="profile-container">
        <h2 className="page-title">Admin's Desk</h2>
        {/* Admin's Message Card */}
        <div className="message-card">
          <div className="message-content">
            <h3>Admin's Message</h3>
            <p>Welcome to NeuralNexus Intelligence Analytics! We're excited to have you onboard as part of our data-driven community. Our platform is designed to empower you with actionable insights, advanced analytics, and predictive intelligence, all at your fingertips.</p>
            <p>As you navigate through the dashboard, we encourage you to explore the rich features, data visualizations, and analytics tools we've developed to help you make informed decisions. Your feedback is invaluable to us, and we are constantly working to enhance your experience.</p>
            <p>Thank you for being a part of the NeuralNexus journey. Together, let's unlock the power of data!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
