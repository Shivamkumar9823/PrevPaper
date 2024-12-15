import axios from 'axios';

const API_URL = 'http://localhost:5000/api/resources';

// Fetch all resources
const getResources = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Upload a new resource
const uploadResource = async (formData) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}/upload`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Delete a resource (Optional for Admin)
const deleteResource = async (resourceId) => {
  const token = localStorage.getItem('token');
  const response = await axios.delete(`${API_URL}/${resourceId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const resourceService = {
  getResources,
  uploadResource,
  deleteResource,
};
