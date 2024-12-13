"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FolderOpen, MoreVertical, PlusCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export default function FoldersPage() {
  const [folders, setFolders] = useState([
    { id: 1, name: 'Pop Songs', songCount: 15 },
    { id: 2, name: 'Rock Classics', songCount: 8 },
    { id: 3, name: 'Jazz Standards', songCount: 12 },
  ]);
  const [newFolderName, setNewFolderName] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      const newFolder = {
        id: folders.length + 1,
        name: newFolderName.trim(),
        songCount: 0,
      };
      setFolders([...folders, newFolder]);
      setNewFolderName('');
      setIsDialogOpen(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Folders</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Folder
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Folder</DialogTitle>
              <DialogDescription>
                Enter a name for your new folder.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreateFolder}>Create Folder</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {folders.map((folder) => (
          <Card key={folder.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {folder.name}
              </CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Rename</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                  <DropdownMenuItem>Move</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <FolderOpen className="h-10 w-10 text-primary" />
                <div>
                  <p className="text-sm font-medium leading-none">
                    {folder.songCount} songs
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Last edited 2 days ago
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}