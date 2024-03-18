import React, { useState } from 'react';

const App = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div className="container">
      <h1>Secure File Sharing</h1>
      <p>Welcome to our secure file sharing platform. Easily upload and download files securely!</p>
      <div className="upload-section">
        <input type="file" onChange={handleFileChange} />
        <button className="upload-btn">Upload File</button>
      </div>
      <div className="download-section">
        <a href="#" className="download-link">Download File</a>
        <button className="download-btn">Download File</button>
      </div>
    </div>
  );
};

export default App;


const AWS = require('aws-sdk');

// Configure AWS SDK with your credentials and region
AWS.config.update({
  accessKeyId: 'YOUR_ACCESS_KEY_ID',
  secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
  region: 'YOUR_S3_BUCKET_REGION',
});

const s3 = new AWS.S3();

// Function to generate pre-signed URL for file upload
const generateUploadUrl = async (bucketName, key, expiration = 3600) => {
  const params = {
    Bucket: bucketName,
    Key: key,
    Expires: expiration, // URL expiration time in seconds (default is 3600 seconds / 1 hour)
    ContentType: 'application/octet-stream', // Specify the content type of the file being uploaded
  };

  // Generate pre-signed URL for uploading the file
  return new Promise((resolve, reject) => {
    s3.getSignedUrl('putObject', params, (error, url) => {
      if (error) {
        reject(error);
      } else {
        resolve(url);
      }
    });
  });
};

module.exports = generateUploadUrl;
