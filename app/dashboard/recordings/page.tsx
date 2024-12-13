"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Pause, Upload } from 'lucide-react';

export default function RecordingsPage() {
  const [recordings, setRecordings] = useState([
    { id: 1, name: 'Practice Session 1', date: '2023-07-15', duration: '5:30' },
    { id: 2, name: 'Song Cover - Imagine', date: '2023-07-14', duration: '3:45' },
    { id: 3, name: 'Vocal Warm-up', date: '2023-07-13', duration: '2:15' },
  ]);

  const [playing, setPlaying] = useState(null);

  const handlePlay = (id) => {
    setPlaying(playing === id ? null : id);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Recording History</h1>
      
      <Button>
        <Upload className="mr-2 h-4 w-4" />
        Upload New Recording
      </Button>

      <div className="space-y-4">
        {recordings.map((recording) => (
          <Card key={recording.id}>
            <CardHeader>
              <CardTitle>{recording.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Date: {recording.date}</p>
                  <p className="text-sm text-muted-foreground">Duration: {recording.duration}</p>
                </div>
                <Button onClick={() => handlePlay(recording.id)} variant="outline">
                  {playing === recording.id ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}