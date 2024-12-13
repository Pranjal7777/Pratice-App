"use client";
import { useState, useRef, useEffect } from 'react';
import PitchVisualizer from '@/components/PitchVisualizer';
import MicrophoneInput from '@/components/MicrophoneInput';
import styles from './Practice.module.css';

export default function Practice() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [pitchData, setPitchData] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [userPitch, setUserPitch] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    // Initialize audio element when component mounts
    if (audioRef.current) {
      audioRef.current.volume = 1.0; // Ensure volume is up
      console.log('Audio element volume:', audioRef.current.volume);
      console.log('Audio element muted:', audioRef.current.muted);
    }
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    console.log('File selected:', file);

    setAudioFile(file);
    setIsPlaying(false);
    setCurrentTime(0);

    const formData = new FormData();
    formData.append('audio', file);

    try {
      const response = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log('Pitch data received:', data);
      setPitchData(data);
    } catch (error) {
      console.error('Error analyzing audio:', error);
    }
  };

  const handlePlayPause = () => {
    console.log('Play/Pause clicked');
    
    if (audioRef.current) {
      console.log('Current time:', audioRef.current.currentTime);
      console.log('Duration:', audioRef.current.duration);
      console.log('Ready state:', audioRef.current.readyState);
      
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Ensure we're starting from the beginning if the audio has ended
        if (audioRef.current.currentTime >= audioRef.current.duration) {
          audioRef.current.currentTime = 0;
        }
        
        audioRef.current.play()
          .then(() => {
            console.log('Playback started successfully');
            // Verify audio is actually playing
            console.log('Is playing:', !audioRef.current?.paused);
            console.log('Current time after play:', audioRef.current?.currentTime);
          })
          .catch(error => {
            console.error('Error playing audio:', error);
            setIsPlaying(false);
          });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const calculatePitchAccuracy = (userPitch: number, referencePitch: number) => {
    const tolerance = 5; // Hz tolerance range
    const difference = Math.abs(userPitch - referencePitch);
    return difference <= tolerance ? 100 - (difference * (100/tolerance)) : 0;
  };

  const handlePitchData = (pitch: number) => {
    setUserPitch(pitch);
    if (pitchData && currentTime) {
      const referencePoint = pitchData.find(p => 
        Math.abs(p.timestamp - currentTime) < 0.1
      );
      if (referencePoint) {
        const accuracy = calculatePitchAccuracy(pitch, referencePoint.pitch);
        setScore(prevScore => (prevScore * 0.9) + (accuracy * 0.1)); // Running average
      }
    }
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

      {audioFile && pitchData && (
        <div className={styles.playbackSection}>
          <audio
            ref={audioRef}
            src={audioFile ? URL.createObjectURL(audioFile) : ''}
            onTimeUpdate={(e) => {
              const audio = e.currentTarget;
              console.log('Time update:', audio.currentTime);
              handleTimeUpdate(e);
            }}
            onEnded={() => {
              console.log('Audio ended');
              setIsPlaying(false);
            }}
            onLoadedData={() => {
              console.log('Audio loaded');
              console.log('Audio duration:', audioRef.current?.duration);
            }}
            onError={(e) => console.error('Audio error:', e)}
            controls
          />
          <button 
            onClick={handlePlayPause}
            className={styles.playButton}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          
          <div className={styles.visualizerContainer}>
            <PitchVisualizer
              pitchData={pitchData}
              currentTime={currentTime}
              userPitch={userPitch}
            />
          </div>

          <div>
            <button onClick={() => {
              if (audioRef.current) {
                audioRef.current.currentTime = 0;
                console.log('Reset time to 0');
              }
            }}>
              Reset Time
            </button>
            
            <button onClick={() => {
              if (audioRef.current) {
                audioRef.current.volume = Math.min(1, audioRef.current.volume + 0.1);
                console.log('Volume increased to:', audioRef.current.volume);
              }
            }}>
              Volume Up
            </button>
            
            <button onClick={() => {
              if (audioRef.current) {
                console.log({
                  duration: audioRef.current.duration,
                  currentTime: audioRef.current.currentTime,
                  paused: audioRef.current.paused,
                  volume: audioRef.current.volume,
                  muted: audioRef.current.muted,
                  readyState: audioRef.current.readyState
                });
              }
            }}>
              Debug Info
            </button>
          </div>
        </div>
      )}

      <div className={styles.lyrics}>
        I hear your voice
      </div>

      <MicrophoneInput onPitchData={handlePitchData} />

      {/* Display current user pitch */}
      <div className={styles.currentPitch}>
        Current Pitch: {userPitch.toFixed(2)} Hz
      </div>

      <div className={styles.pitchGuide}>
        Target Pitch: {
          pitchData && currentTime 
            ? pitchData.find(p => Math.abs(p.timestamp - currentTime) < 0.1)?.pitch.toFixed(2) 
            : '---'
        } Hz
        {score && <div>Current Score: {score.toFixed(1)}%</div>}
      </div>
    </div>
  );
}