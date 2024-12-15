import React, { useState } from 'react';
import axios from 'axios';
import './Upload.css';

const Upload = () => {
  const [branch, setBranch] = useState('');
  const [subject, setSubject] = useState('');
  const [semester, setSemester] = useState('');
  const [file, setFile] = useState(null);

  const branches = [
    'Computer Science & Engineering (CSE)',
    'Electrical Engineering (EE)',
    'Electronics and Communication Engineering (ECE)',
    'Information Technology Engineering (ITE)',
    'Mechanical Engineering (MEC)',
    'Metallurgy and Mechanical Engineering (MME)',
    'Chemical Engineering (CHE)',
    'Civil Engineering (CIV)'
  ];

  const semesters = [1, 2, 3, 4, 5, 6, 7, 8]; // List of semesters from 1 to 8

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('branch', branch);
    formData.append('subject', subject);
    formData.append('semester', semester);
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/resources/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('File uploaded successfully');
    } catch (error) {
      console.error(error);
      alert('Upload failed');
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Resource</h2>
      <label htmlFor="branch-select">Branch</label>
      <select
        id="branch-select"
        value={branch}
        onChange={(e) => setBranch(e.target.value)}
      >
        <option value="">-- Select a Branch --</option>
        {branches.map((branch, index) => (
          <option key={index} value={branch}>
            {branch}
          </option>
        ))}
      </select>

      <label htmlFor="subject-input">Subject</label>
      <input
        id="subject-input"
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      <label htmlFor="semester-select">Semester</label>
      <select
        id="semester-select"
        value={semester}
        onChange={(e) => setSemester(e.target.value)}
      >
        <option value="">-- Select a Semester --</option>
        {semesters.map((semester, index) => (
          <option key={index} value={semester}>
            {semester}
          </option>
        ))}
      </select>

      <label htmlFor="file-input">File</label>
      <input
        id="file-input"
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default Upload;
