"use client"

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Music, ChevronRight, Search, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { deleteGalleryItem } from '@/lib/actions/song.actions';
import { useRouter } from 'next/navigation';

export default function SongList({ initialSongs }) {
  const [songs, setSongs] = useState(initialSongs);
  const [searchTerm, setSearchTerm] = useState('');
  const [songToDelete, setSongToDelete] = useState(null);
  const router = useRouter();

  const filteredSongs = songs.filter(song => 
    song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (songs.length === 0) {
    return (
      <div className="text-center py-12 " style={{ height: "calc(100vh - 186px)", display: "flex",flexDirection: "column", justifyContent: "center"}}>
        <Music className="mx-auto h-12 w-12 text-muted-foreground" />
        <h2 className="mt-4 text-lg font-semibold">No songs found</h2>
        <p className="mt-2 text-muted-foreground">Get started by adding your first song!</p>
      </div>
    );
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteGalleryItem(id);
      setSongs(songs.filter(song => song._id !== id));
      router.refresh(); // Refresh the page to reflect the changes
    } catch (error) {
      console.error('Failed to delete song:', error);
    } finally {
      setSongToDelete(null); // Close the confirmation dialog
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Search className="text-muted-foreground" />
        <Input
          placeholder="Search songs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 !mt-[60px]">
        {filteredSongs.map((song) => (
          <div key={song._id} className="relative">
            <Dialog>
              <DialogTrigger asChild>
                <Card className="cursor-pointer hover:bg-accent transition-colors">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium truncate">
                      {song.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4">
                      <Music className="h-10 w-10 text-primary" />
                      <div>
                        <p className="text-sm font-medium leading-none truncate mb-2">
                          {song.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Key: {song.key}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>{song.title}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <p className="text-sm font-medium">Artist:</p>
                    <p className="col-span-3">{song.title}</p>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <p className="text-sm font-medium"> Key:</p>
                    <p className="col-span-3">{song.key}</p>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <p className="text-sm font-medium">Chords and Lyrics:</p>
                    <Textarea
                      className="col-span-3"
                      value={song.content}
                      readOnly
                      rows={10}
                    />
                  </div>
                </div>
                <div className="flex justify-between mt-4">
                  <Button asChild>
                    <Link href={`/dashboard/songs/${song._id}`}>
                      Edit Song <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="destructive" onClick={() => handleDelete(song._id)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8"
              onClick={(e) => {
                e.stopPropagation();
                setSongToDelete(song);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={!!songToDelete} onOpenChange={() => setSongToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{songToDelete?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSongToDelete(null)}>Cancel</Button>
            <Button variant="destructive" onClick={() => handleDelete(songToDelete?._id)}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
