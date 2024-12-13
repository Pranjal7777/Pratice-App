import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
let client: MongoClient | null = null;

async function connectToDatabase() {
  if (!client) {
    console.log('Creating new MongoDB client...');
    client = new MongoClient(uri!,{
        connectTimeoutMS: 30000, 
    });
    console.log('Connecting to MongoDB...');
    await client.connect();
    console.log('Connected to MongoDB successfully');
  }
  return client;
}

export async function POST(req: Request) {
  if (!uri) {
    console.error('MongoDB URI not configured');
    return NextResponse.json({ error: "MongoDB URI not configured" }, { status: 500 });
  }

  let connectedClient: MongoClient | null = null;

  try {
    console.log('Connecting to database...');
    connectedClient = await connectToDatabase();
    console.log('Connected to database');
    const database = connectedClient.db('singers_app');
    console.log('Accessed singers_app database');
    const songs = database.collection('songs');
    console.log('Accessed songs collection');

    const { title, artist, originalKey, transposedKey, content } = await req.json();
    console.log('Received song data:', { title, artist, originalKey, transposedKey });

    console.log('Inserting song into database...');
    const result = await songs.insertOne({
      title,
      artist,
      originalKey,
      transposedKey,
      content,
      createdAt: new Date(),
    });
    console.log('Song inserted successfully, ID:', result.insertedId);

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error: any) {
    console.error('Error saving song:', error);
    return NextResponse.json({ error: error.message || 'Failed to save song' }, { status: 500 });
  } finally {
    if (connectedClient) {
      console.log('Closing database connection...');
      await connectedClient.close();
      console.log('Database connection closed');
    }
  }
}

// ... (rest of the file remains the same)