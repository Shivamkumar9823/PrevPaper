import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [resources, setResources] = useState([]);
  const [activeBranch, setActiveBranch] = useState(null); // Active branch index
  const [activeSemester, setActiveSemester] = useState(null); // Active semester index

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/resources', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res)
        setResources(res.data);
      } catch (error) {
        console.error(error);
        alert('Failed to fetch resources');
      }
    };
    fetchResources();
  }, []);

  const toggleBranch = (index) => {
    setActiveBranch((prev) => (prev === index ? null : index));
    setActiveSemester(null); // Reset the active semester when switching branches
  };

  const toggleSemester = (index) => {
    setActiveSemester((prev) => (prev === index ? null : index));
  };

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

  const semesters = Array(8).fill([
    'Semester 1',
    'Semester 2',
    'Semester 3',
    'Semester 4',
    'Semester 5',
    'Semester 6',
    'Semester 7',
    'Semester 8',
  ]);

  const filteredResources = (semesterIndex, branchIndex) =>
    resources.filter(
      (resource) =>
        resource.semester === `${semesterIndex + 1}` &&
        resource.branch === branches[branchIndex]
    );


 const handleDownload = (fileUrl) => {
      try {
        console.log('file path: ', fileUrl);
    
        // Directly use the Cloudinary file URL for downloading
        const link = document.createElement('a');
        link.href = fileUrl;
        link.setAttribute('download', fileUrl.split('/').pop()); // Extract filename from URL
        document.body.appendChild(link);
        link.click(); // Trigger download
        link.remove(); // Clean up
      } catch (error) {
        console.error('Download failed:', error);
        alert('Failed to download the file');
      }
    };
    

  return (
    <div>
      <h2>Dashboard</h2>
      <ul className="courses-list">
        {branches.map((branch, branchIndex) => (
          <li key={branchIndex} className="course-item">
            <div className="branch-name" onClick={() => toggleBranch(branchIndex)}>
              {branch}
              <hr />
            </div>
            {activeBranch === branchIndex && (
              <ul className="semesters-list">
                {semesters[branchIndex].map((semester, semesterIndex) => {
                  const semesterResources = filteredResources(
                    semesterIndex,
                    branchIndex
                  );
                  return (
                    <li key={semesterIndex} className="semester-item">
                      <div
                        className={`semester-header ${activeSemester === semesterIndex ? 'active' : ''}`}
                        onClick={() => toggleSemester(semesterIndex)}
                      >
                        {semester}
                      </div>
                      {activeSemester === semesterIndex && (
                        <div className="resources-section">
                          {semesterResources.length > 0 ? (
                            <ul>
                              {semesterResources.map((resource) => (
                                <li key={resource._id}>
                                  <p>Subject: {resource.subject}</p>
                                  <button onClick={() => handleDownload(resource.fileUrl)}>
                                    Download
                                  </button>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p>No resources available for this semester.</p>
                          )}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
