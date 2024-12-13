'use server'

import { connectToDatabase } from '@/utils/connect.db';

// ... (keep the existing chordMap and transposition functions)

export async function transposeSong(content: string, originalKey: string, transposedKey: string) {
  return transposeLyrics(content, originalKey, transposedKey);
}

export async function saveSong(songData: any) {
  try {
    const { db } = await connectToDatabase();
    const gallery = db.collection('gallery');

    const result = await gallery.insertOne({
      ...songData,
      createdAt: new Date(),
    });

    return { success: true, id: result.insertedId };
  } catch (error: any) {
    console.error('Error saving song:', error);
    return { error: error.message || 'Failed to save song' };
  }
}