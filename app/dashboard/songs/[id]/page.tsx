"use client"

import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { getGalleryItemById, updateGalleryItem } from '@/lib/actions/song.actions';
import WaveSurfer from '@wavesurfer/react';
import { Play, Pause } from 'lucide-react';
import { useTheme } from 'next-themes';
import './AudioPlayer.css';

const scales = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export default function SongPage() {
  const { id } = useParams();
  const [song, setSong] = useState(null);
  const [title, setTitle] = useState('');
  const [key, setKey] = useState('');
  const [content, setContent] = useState('');
  const { toast } = useToast();
  const [audioUrl, setAudioUrl] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const wavesurferRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    fetchSong();
  }, [id]);

  const fetchSong = async () => {
    try {
      const response = await getGalleryItemById(id);
      if (!response) {
        throw new Error('Failed to fetch song');
      }
      setSong(response);
      setTitle(response.title);
      setKey(response.key);
      setContent(response.content);
      setAudioUrl(response.audioUrl);
      console.log(response,"mkosadakosdaokdok")
    } catch (error) {
      console.error('Error fetching song:', error);
      toast({
        title: "Error",
        description: "Failed to fetch song. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSaveSong = async () => {
    try {
      const response = updateGalleryItem(id,{title,content,key})

      if (!response) {
        throw new Error('Failed to update song');
      }

      toast({
        title: "Song Updated",
        description: "Your song has been successfully updated.",
      });
    } catch (error) {
      console.error('Error updating song:', error);
      toast({
        title: "Update Error",
        description: "Failed to update the song. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handlePlayPause = useCallback(() => {
    setIsPlaying(!isPlaying);
    wavesurferRef.current?.playPause();
  }, [isPlaying]);

  const onReady = useCallback((wavesurfer) => {
    wavesurferRef.current = wavesurfer;
  }, []);

  if (!song) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Song</h1>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Song</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="key"> key</Label>
          <Select value={key} onValueChange={setKey}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select transposed key" />
            </SelectTrigger>
            <SelectContent>
              {scales.map((scale) => (
                <SelectItem key={scale} value={scale}>{scale}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Chords and Lyrics</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[300px]"
          />
        </CardContent>
      </Card>
      {audioUrl && (
        <Card>
          <CardHeader>
            <CardTitle>Audio Player</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="wavesurfer-container flex items-center">
              <div className="flex-grow">
                <WaveSurfer
                  height={100}
                  waveColor="#4ade80"
                  progressColor="#22c55e"
                  url={audioUrl}
                  onReady={onReady}
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="ml-4"
                onClick={handlePlayPause}
              >
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      <Button onClick={handleSaveSong}>Save Changes</Button>
    </div>
  );
}
