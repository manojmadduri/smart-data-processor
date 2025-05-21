// frontend/src/services/api.js
import axios from 'axios';

// read from env (fallback to localhost for dev)
const BACKEND_ROOT = process.env.REACT_APP_API_URL || 'https://smart-data-processor.onrender.com';

// our Express server has all endpoints under /api
export const api = axios.create({
  baseURL: `${BACKEND_ROOT}/api`
});

// uploadFiles should post to /api/upload
export const uploadFiles = (files) => {
  const form = new FormData();
  files.forEach(f => form.append('files', f));
  return api.post('/upload', form, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

// download should open the right host, using the same BASE + /api/download
export const download = (endpoint) => {
  // endpoint will be something like '/download/memories.jsonl'
  const url = `${BACKEND_ROOT}/api${endpoint}`;
  window.open(url, '_blank');
};
