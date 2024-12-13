'use client';

import { useState, useRef } from 'react';

export default function AudioProcessor() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [pitchShift, setPitchShift] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setAudioFile(event.target.files[0]);
    }
  };

  const handleProcessAudio = async () => {
    if (!audioFile) return;

    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append('file', audioFile);
      formData.append('n_steps', pitchShift.toString());

      const response = await fetch('http://103.150.136.152/pitch-shift', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Processing failed');

      // Create a download link for the processed audio
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'processed_audio.mp3';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error processing audio:', error);
      alert('Failed to process audio');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl px-4">
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-6">
          Audio Processor
        </h1>

        <div className="mb-6">
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="hidden"
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mb-4"
            onClick={() => fileInputRef.current?.click()}
          >
            Select Audio File
          </button>
          {audioFile && (
            <p className="text-sm text-gray-600">
              Selected file: {audioFile.name}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="block mb-2">
            Pitch Shift (semitones)
          </label>
          <input
            type="range"
            min="-12"
            max="12"
            step="1"
            value={pitchShift}
            onChange={(e) => setPitchShift(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-sm text-gray-600 mt-1">
            Value: {pitchShift}
          </div>
        </div>

        <button
          className={`bg-blue-500 text-white font-semibold py-2 px-4 rounded
            ${(!audioFile || isProcessing) 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:bg-blue-600'}`}
          onClick={handleProcessAudio}
          disabled={!audioFile || isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Process Audio'}
        </button>
      </div>
    </div>
  );
} 