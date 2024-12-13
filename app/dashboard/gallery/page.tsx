import { getAllGalleryItems } from '@/lib/actions/song.actions';
import SongList from './SongList';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function GalleryPage() {
  const session = await getServerSession(authOptions);
  const songs = await getAllGalleryItems(session._id);
console.log(songs,"songs")
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Gallery</h1>
        <Button asChild>
          <Link href="/dashboard/add-new-song">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add 
          </Link>
        </Button>
      </div>
      <SongList initialSongs={songs || []} />
    </div>
  );
}