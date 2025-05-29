import axios from 'axios';

const BACKEND_ROOT = process.env.REACT_APP_API_URL || 'backend-production-0494.up.railway.app';

export const api = axios.create({
  baseURL: `${BACKEND_ROOT}/api`,
});

// Upload files to /api/upload
export const uploadFiles = (files) => {
  const form = new FormData();
  files.forEach(f => form.append('files', f));
  return api.post('/upload', form); // No need to set Content-Type manually
};

// Download files via browser
export const download = (endpoint) => {
  const url = `${BACKEND_ROOT}/api${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`;
  window.open(url, '_blank');
};
