import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;
let client: MongoClient | null = null;

async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(uri!);
    await client.connect();
  }
  return client;
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  if (!uri) {
    return NextResponse.json({ error: "MongoDB URI not configured" }, { status: 500 });
  }

  try {
    const connectedClient = await connectToDatabase();
    const database = connectedClient.db('singers_app');
    const songs = database.collection('songs');

    const song = await songs.findOne({ _id: new ObjectId(params.id) });

    if (!song) {
      return NextResponse.json({ error: 'Song not found' }, { status: 404 });
    }

    return NextResponse.json(song);
  } catch (error: any) {
    console.error('Error fetching song:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch song' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  if (!uri) {
    return NextResponse.json({ error: "MongoDB URI not configured" }, { status: 500 });
  }

  try {
    const { title, artist, originalKey, transposedKey, content } = await req.json();

    const connectedClient = await connectToDatabase();
    const database = connectedClient.db('singers_app');
    const songs = database.collection('songs');

    const result = await songs.updateOne(
      { _id: new ObjectId(params.id) },
      {
        $set: {
          title,
          artist,
          originalKey,
          transposedKey,
          content,
          updatedAt: new Date(),
        }
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Song not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error updating song:', error);
    return NextResponse.json({ error: error.message || 'Failed to update song' }, { status: 500 });
  }
}