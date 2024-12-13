import { useRef, useEffect } from 'react';
import styles from './PitchVisualizer.module.css';

interface PitchVisualizerProps {
  pitchData: {
    timestamps: number[];
    pitches: number[];
    confidence: number[];
  };
  currentTime: number;
  userPitch?: number;
}

const PitchVisualizer = ({ pitchData, currentTime, userPitch }: PitchVisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    console.log('PitchVisualizer update:', { 
      pitchData, 
      currentTime, 
      userPitch 
    });
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Set background
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw pitch lines
      const timeWindow = 4; // Show 4 seconds of data
      const startTime = currentTime - timeWindow / 2;
      const endTime = currentTime + timeWindow / 2;

      // Draw reference pitch data
      pitchData.timestamps.forEach((time, i) => {
        if (time >= startTime && time <= endTime) {
          const x = ((time - startTime) / timeWindow) * canvas.width;
          const y = canvas.height - (pitchData.pitches[i] / 1000) * canvas.height;
          
          // Draw reference note blocks
          ctx.fillStyle = time <= currentTime ? '#4CAF50' : '#808080';
          ctx.fillRect(x - 20, y - 5, 40, 10);
        }
      });

      // Draw user's current pitch if available
      if (userPitch && userPitch > 0) {
        const x = canvas.width / 2; // Always draw at the center line
        const y = canvas.height - (userPitch / 1000) * canvas.height;
        
        // Draw user pitch indicator
        ctx.fillStyle = '#FF4081';
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fill();
        
        // Optional: Draw line to show pitch difference
        const currentRefPitch = getCurrentReferencePitch(currentTime, pitchData);
        if (currentRefPitch > 0) {
          const refY = canvas.height - (currentRefPitch / 1000) * canvas.height;
          ctx.strokeStyle = '#FF4081';
          ctx.setLineDash([5, 5]);
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x, refY);
          ctx.stroke();
          ctx.setLineDash([]); // Reset line dash
        }
      }

      // Draw current time indicator
      ctx.strokeStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.stroke();
    };

    draw();
  }, [pitchData, currentTime, userPitch]);

  return (
    <canvas
      ref={canvasRef}
      className={styles.visualizer}
      width={800}
      height={200}
    />
  );
};

// Helper function to get the current reference pitch
const getCurrentReferencePitch = (
  currentTime: number,
  pitchData: { timestamps: number[]; pitches: number[] }
) => {
  const index = pitchData.timestamps.findIndex(time => time >= currentTime);
  if (index === -1) return 0;
  return pitchData.pitches[index] || pitchData.pitches[index - 1] || 0;
};

export default PitchVisualizer;