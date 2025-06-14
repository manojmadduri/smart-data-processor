import React, { useState, useCallback } from 'react';
import FileUploader from '../components/FileUploader';
import ProgressSpinner from '../components/ProgressSpinner';
import ProcessingOverlay from '../components/ProcessingOverlay';
import DownloadLinks from '../components/DownloadLinks';
import JSONPreviewModal from '../components/JSONPreviewModal';
import { uploadFiles } from '../services/api';

const BACKEND_ROOT = process.env.REACT_APP_API_URL || 'https://smart-data-processor-production.up.railway.app/';

export default function UploadPage() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [endpoints, setEndpoints] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState('');

  const handleProcess = async () => {
    if (!files.length) return;

    setLoading(true);
    setMessage('');
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
    <div className="card max-w-lg w-full p-6 bg-base-200 shadow-xl relative">
      {loading && (
        <ProcessingOverlay message="⏳ Processing... This may take 30–60 seconds." />
      )}
<div className="bg-yellow-100 text-yellow-800 border border-yellow-400 px-4 py-3 rounded text-center text-sm md:text-base mx-4 mt-4">
  🚀 Everything is up and running! Have feedback or feature ideas? Let us know using the form below.
</div>
      <h2 className="text-2xl font-semibold text-center mb-4 text-base-content">
        Upload & Generate
      </h2>

      <FileUploader files={files} setFiles={setFiles} />

      <button
        className="btn btn-primary w-full mt-4"
        disabled={!files.length || loading}
        onClick={handleProcess}
      >
        Process Files
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

      <div className="mt-8 text-center text-sm text-base-content opacity-70 max-w-md mx-auto px-4">
  🔒 <span className="font-medium">Your data is never stored.</span> 
  Uploaded content is processed temporarily and cleared as soon as you download or refresh the page.
</div>

      <div className="mt-12 px-6 py-6 bg-base-100 rounded-lg shadow-md border border-base-300 text-center space-y-4">
  <h3 className="text-xl font-semibold text-base-content flex justify-center items-center gap-2">
    💡 Got Feedback, Suggestions, or Ideas?
  </h3>

  <p className="text-sm text-base-content opacity-80 leading-relaxed max-w-md mx-auto">
    Help us improve <span className="font-semibold">Smart Data Processor</span>!<br />
    We’d love to hear your thoughts, suggestions, feature requests, or improvements.
  </p>

  <div className="pt-2">
    <a
      href="/feedback"
      className="btn btn-primary text-base px-6 py-2 shadow-md hover:scale-105 transition-transform duration-200"
    >
      ✍️ Give Feedback
    </a>
  </div>
</div>
    </div>
  );
}
