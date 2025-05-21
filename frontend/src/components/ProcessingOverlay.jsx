import React from 'react';
import ProgressSpinner from './ProgressSpinner';

export default function ProcessingOverlay({ message }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4 text-white">
        <ProgressSpinner />
        <p className="text-center text-lg font-medium">{message}</p>
      </div>
    </div>
  );
}
