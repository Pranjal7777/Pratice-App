import { useEffect, useState } from 'react';

const MicrophoneInput = ({ onPitchData }: { onPitchData: (pitch: number) => void }) => {
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      
      // Create analyzer node
      const analyser = audioContext.createAnalyser();
      source.connect(analyser);
      
      // Configure analyzer
      analyser.fftSize = 2048;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Float32Array(bufferLength);
      
      setIsRecording(true);
      
      // Process audio data
      const processAudio = () => {
        if (!isRecording) return;
        
        analyser.getFloatTimeDomainData(dataArray);
        
        // Send chunk to backend for processing
        fetch('http://localhost:5000/process-chunk', {
          method: 'POST',
          body: dataArray.buffer,
        })
        .then(response => response.json())
        .then(data => {
          onPitchData(data.pitch);
        });
        
        requestAnimationFrame(processAudio);
      };
      
      processAudio();
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  return (
    <div >
      <button
        onClick={isRecording ? stopRecording : startRecording}
        // className={`${styles.button} ${isRecording ? styles.recording : ''}`}
      >
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
    </div>
  );
};

export default MicrophoneInput;