import axios from 'axios';
export const api = axios.create({
  baseURL: 'https://smart-data-processor.onrender.com'
});
export const uploadFiles = files => {
  const form = new FormData();
  files.forEach(f => form.append('files', f));
  return api.post('/upload', form, { headers: {'Content-Type':'multipart/form-data'} });
};
export const download = endpoint => window.open(`http://localhost:4000${endpoint}`, '_blank');
