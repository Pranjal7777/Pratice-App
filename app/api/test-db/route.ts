import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

export async function GET() {
  if (!uri) {
    return NextResponse.json({ error: "MongoDB URI not configured" }, { status: 500 });
  }

  let client: MongoClient | null = null;

  try {
    console.log('Creating new MongoDB client...');
    client = new MongoClient(uri);
    console.log('Connecting to MongoDB...');
    await client.connect();
    console.log('Connected to MongoDB successfully');
    await client.db("admin").command({ ping: 1 });
    console.log('Pinged MongoDB');

    return NextResponse.json({ message: "Successfully connected to MongoDB" });
  } catch (error: any) {
    console.error('MongoDB connection error:', error);
    return NextResponse.json({ error: error.message || 'Failed to connect to MongoDB' }, { status: 500 });
  } finally {
    if (client) {
      console.log('Closing database connection...');
      await client.close();
      console.log('Database connection closed');
    }
  }
}