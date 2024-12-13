import { useState, useRef } from 'react';
import PitchVisualizer from '@/components/PitchVisualizer';
import MicrophoneInput from '@/components/MicrophoneInput';
import styles from '../styles/Practice.module.css';

export default function Practice() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [pitchData, setPitchData] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [userPitch, setUserPitch] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setAudioFile(file);

    // Create FormData and send to backend
    const formData = new FormData();
    formData.append('audio', file);

    try {
      const response = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setPitchData(data);
    } catch (error) {
      console.error('Error analyzing audio:', error);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handlePitchData = (pitch: number) => {
    setUserPitch(pitch);
  };

  return (
    <div className={styles.container}>
      <h1>Singing Practice</h1>
      
      <div className={styles.uploadSection}>
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileUpload}
          className={styles.fileInput}
        />
      </div>

      {audioFile && (
        <audio
          ref={audioRef}
          controls
          src={URL.createObjectURL(audioFile)}
          onTimeUpdate={handleTimeUpdate}
          className={styles.audioPlayer}
        />
      )}

      {pitchData && (
        <PitchVisualizer
          pitchData={pitchData}
          currentTime={currentTime}
        />
      )}

      <div className={styles.lyrics}>
        I hear your voice
      </div>

      <MicrophoneInput onPitchData={handlePitchData} />

      {/* Display current user pitch */}
      <div className={styles.currentPitch}>
        Current Pitch: {userPitch.toFixed(2)} Hz
      </div>

      <style>{`
        .container {
  min-height: 100vh;
  padding: 20px;
  background: #000;
  color: white;
}

.uploadSection {
  margin: 20px 0;
  padding: 20px;
  border: 2px dashed #444;
  border-radius: 8px;
  text-align: center;
}

.fileInput {
  margin: 10px 0;
}

.audioPlayer {
  width: 100%;
  max-width: 800px;
  margin: 20px 0;
}

.score {
  font-size: 24px;
  text-align: center;
          margin: 20px 0;
        }
      `}</style>
    </div>
  );
}