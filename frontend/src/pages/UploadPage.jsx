import React, { useState, useCallback } from 'react';
import FileUploader from '../components/FileUploader';
import ProgressSpinner from '../components/ProgressSpinner';
import DownloadLinks from '../components/DownloadLinks';
import JSONPreviewModal from '../components/JSONPreviewModal';
import { uploadFiles } from '../services/api';

const BACKEND_ROOT = process.env.REACT_APP_API_URL || 'https://smart-data-processor.onrender.com';

export default function UploadPage() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [endpoints, setEndpoints] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState('');

  const handleProcess = async () => {
    if (!files.length) return;

    setLoading(true);
    setMessage('⏳ Processing... This may take 30–60 seconds. Please wait.');
    setEndpoints(null);

    try {
      const { data } = await uploadFiles(files);
      setEndpoints(data);
      setMessage('✅ Processing complete! You can now download the results.');
    } catch (e) {
      console.error('Upload error:', e);
      setMessage('❌ Error during processing. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const showPreview = useCallback(async (endpoint) => {
    try {
      const res = await fetch(`${BACKEND_ROOT}${endpoint}`);
      const text = await res.text();
      setPreview(text.split('\n').slice(0, 10).join('\n'));
    } catch (err) {
      alert('Preview failed: ' + err.message);
    }
  }, []);

  return (
    <div className="card max-w-lg w-full p-6 bg-base-200 shadow-xl">
      <h2 className="text-2xl font-semibold text-center mb-4 text-base-content">
        Upload & Generate
      </h2>

      <FileUploader files={files} setFiles={setFiles} />

      <button
        className="btn btn-primary w-full mt-4 flex items-center justify-center"
        disabled={!files.length || loading}
        onClick={handleProcess}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <ProgressSpinner />
            <span>Processing...</span>
          </span>
        ) : (
          'Process Files'
        )}
      </button>

      {message && (
        <div className="mt-4 text-center text-sm text-base-content opacity-80">
          {message}
        </div>
      )}

      {endpoints && (
        <div className="mt-6 space-y-4">
          <DownloadLinks endpoints={endpoints} />
          <button
            className="btn btn-accent w-full"
            onClick={() => showPreview(endpoints.smart)}
          >
            Preview Smart JSONL
          </button>
          <button
            className="btn btn-accent w-full"
            onClick={() => showPreview(endpoints.finetune)}
          >
            Preview Finetune JSONL
          </button>
        </div>
      )}

      {preview && (
        <JSONPreviewModal text={preview} onClose={() => setPreview(null)} />
      )}
    </div>
  );
}
