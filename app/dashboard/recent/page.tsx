"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Music, Clock, Edit2 } from 'lucide-react';

export default function RecentSongs() {
  const [recentSongs, setRecentSongs] = useState([
    { id: 1, title: 'Bohemian Rhapsody', artist: 'Queen', lastPracticed: '2024-03-10' },
    { id: 2, title: 'Imagine', artist: 'John Lennon', lastPracticed: '2024-03-09' },
    { id: 3, title: 'Shape of You', artist: 'Ed Sheeran', lastPracticed: '2024-03-08' },
    { id: 4, title: 'Rolling in the Deep', artist: 'Adele', lastPracticed: '2024-03-07' },
    { id: 5, title: 'Billie Jean', artist: 'Michael Jackson', lastPracticed: '2024-03-06' },
  ]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Recent Songs</h1>
        <div className="flex space-x-2">
          <Input
            placeholder="Search songs..."
            className="max-w-sm"
          />
          <Button variant="outline">
            Search
          </Button>
        </div>
      </div>
      <div className="bg-card rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Artist</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Last Practiced</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-card divide-y divide-muted">
            {recentSongs.map((song) => (
              <tr key={song.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Music className="flex-shrink-0 h-5 w-5 text-muted-foreground" />
                    <div className="ml-4">
                      <div className="text-sm font-medium">{song.title}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm">{song.artist}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="flex-shrink-0 mr-1.5 h-4 w-4" />
                    {song.lastPracticed}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button variant="ghost" size="sm">
                    <Edit2 className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}