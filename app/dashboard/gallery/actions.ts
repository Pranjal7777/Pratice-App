'use server'

import { connectToDatabase } from '@/utils/connect.db';

export async function getSongs() {
  try {
    const { db } = await connectToDatabase();
    const songs = db.collection('songs');

    const result = await songs.find().toArray();
    return result;
  } catch (error: any) {
    console.error('Error fetching songs:', error);
    throw new Error('Failed to fetch songs');
  }
}