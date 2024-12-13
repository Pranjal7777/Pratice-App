
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AddNewSongForm from "@/components/AddNewSong";
import { getServerSession } from "next-auth";

export default async function AddNewSongPage() {

  const session = await getServerSession(authOptions);
  console.log(session,"okasdokdkodok")
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Add New Song</h1>
      <AddNewSongForm session={session}/>
    </div>
  );
}
