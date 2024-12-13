"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CreateSongPage() {
  const [title, setTitle] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [selectedWord, setSelectedWord] = useState('');
  const [chords, setChords] = useState({});

  const handleLyricsChange = (e) => {
    setLyrics(e.target.value);
  };

  const handleWordClick = (word) => {
    setSelectedWord(word);
  };

  const handleAddChord = (chord) => {
    if (selectedWord) {
      setChords({
        ...chords,
        [selectedWord]: chord,
      });
      setSelectedWord('');
    }
  };

  const renderLyricsWithChords = () => {
    return lyrics.split(' ').map((word, index) => (
      <span
        key={index}
        onClick={() => handleWordClick(word)}
        className={`cursor-pointer ${selectedWord === word ? 'bg-primary text-primary-foreground' : ''}`}
      >
        {chords[word] && <span className="text-primary text-xs">{chords[word]}</span>}
        {word}{' '}
      </span>
    ));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Create New Song</h1>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Song Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter song title"
          />
        </div>
        
        <div>
          <Label htmlFor="lyrics">Lyrics</Label>
          <Textarea
            id="lyrics"
            value={lyrics}
            onChange={handleLyricsChange}
            placeholder="Enter song lyrics"
            rows={10}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lyrics with Chords</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="whitespace-pre-wrap">
            {renderLyricsWithChords()}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Add Chords</h2>
        <div className="flex space-x-2">
          {['C', 'D', 'E', 'F', 'G', 'A', 'B'].map((chord) => (
            <Button key={chord} onClick={() => handleAddChord(chord)} variant="outline">
              {chord}
            </Button>
          ))}
        </div>
      </div>

      <Button>Save Song</Button>
    </div>
  );
}