// 'use server';

// import { connectToDatabase } from '../database';
// import Song from '../database/models/song.model';
// import { handleError } from '../utils/handleError';

// export const createSong = async (songData: {
//   title: string;
//   artist: string;
//   originalKey: string;
//   transposedKey: string;
//   content: string;
// }) => {
//   try {
//     console.log('connecting');
//     await connectToDatabase();
//     console.log('connected');

//     const newSong = await Song.create(songData);

//     return JSON.parse(JSON.stringify(newSong));
//   } catch (error) {
//     handleError(error);
//   }
// };

// export const getAllSongs = async () => {
//   try {
//     await connectToDatabase();

//     const songs = await Song.find().sort({ createdAt: -1 });

//     return JSON.parse(JSON.stringify(songs));
//   } catch (error) {
//     handleError(error);
//   }
// };

// export const getSongById = async (id: string) => {
//   try {
//     await connectToDatabase();

//     const song = await Song.findById(id);

//     if (!song) throw new Error('Song not found');

//     return JSON.parse(JSON.stringify(song));
//   } catch (error) {
//     handleError(error);
//   }
// };

// export const updateSong = async (
//   id: string,
//   songData: {
//     title?: string;
//     artist?: string;
//     originalKey?: string;
//     transposedKey?: string;
//     content?: string;
//   }
// ) => {
//   try {
//     await connectToDatabase();

//     const updatedSong = await Song.findByIdAndUpdate(
//       id,
//       { ...songData, updatedAt: Date.now() },
//       { new: true }
//     );

//     if (!updatedSong) throw new Error('Song not found');

//     return JSON.parse(JSON.stringify(updatedSong));
//   } catch (error) {
//     handleError(error);
//   }
// };

// export const deleteSong = async (id: string) => {
//   try {
//     await connectToDatabase();

//     const deletedSong = await Song.findByIdAndDelete(id);

//     if (!deletedSong) throw new Error('Song not found');

//     return JSON.parse(JSON.stringify(deletedSong));
//   } catch (error) {
//     handleError(error);
//   }
// };


'use server';

import { uploadAudio } from '../cloudinary';
import { connectToDatabase } from '../database';
import Gallery from '../database/models/gallery.model';  // Renamed model
import { handleError } from '../utils/handleError';
import { revalidatePath } from "next/cache";

// Create a new song or folder in the gallery
export const createGalleryItem = async (formData: FormData) => {
  try {
    console.log('connecting');
    await connectToDatabase();
    console.log('connected');

    const title = formData.get('title') as string;
    const key = formData.get('key') as string;
    const content = formData.get('content') as string;
    const userId = formData.get('userId') as string;
    const audioFile = formData.get('audioFile') as File | null;

    console.log(title,key)

    let audioUrl = '';

    // If an audio file is provided, upload it to Cloudinary
    if (audioFile) {
      const buffer = Buffer.from(await audioFile.arrayBuffer());
      audioUrl = await uploadAudio(buffer);
    }
console.log(audioUrl,"koadokadkoako")
let payload = {
  title,
  key,
  content,
  userId,
  audioUrl,
}
console.log(payload,"payload")
    const newGalleryItem = await Gallery.create(payload);

    revalidatePath('/dashboard/gallery');
    return JSON.parse(JSON.stringify(newGalleryItem));
  } catch (error) {
    console.error('Error in createGalleryItem:', error);
    handleError(error);
  }
};

// Fetch all gallery items (songs/folders)
export const getAllGalleryItems = async (userId: string) => {
  try {
    await connectToDatabase();
    const galleryItems = await Gallery.find({
      userId: userId
    }).sort({ createdAt: -1 });

    return JSON.parse(JSON.stringify(galleryItems));
  } catch (error) {
    handleError(error); // Ensure you have a proper error handling function
  }
};
// Fetch a specific gallery item (song or folder) by ID
export const getGalleryItemById = async (id: string) => {
  try {
    await connectToDatabase();

    const galleryItem = await Gallery.findById(id);

    if (!galleryItem) throw new Error('Gallery item not found');

    return JSON.parse(JSON.stringify(galleryItem));
  } catch (error) {
    handleError(error);
  }
};

// Update a specific gallery item (song or folder) by ID
export const updateGalleryItem = async (
  id: string,
  galleryData: {
    title: string;
    key: string;
    content: string;
  }
) => {
  try {
    await connectToDatabase();

    const updatedGalleryItem = await Gallery.findByIdAndUpdate(
      id,
      { ...galleryData, updatedAt: Date.now() },
      { new: true }
    );

    if (!updatedGalleryItem) throw new Error('Gallery item not found');

    return JSON.parse(JSON.stringify(updatedGalleryItem));
  } catch (error) {
    handleError(error);
  }
};

// Delete a specific gallery item (song or folder) by ID
export const deleteGalleryItem = async (id: string) => {
  try {
    await connectToDatabase();

    const deletedGalleryItem = await Gallery.findByIdAndDelete(id);

    if (!deletedGalleryItem) throw new Error('Gallery item not found');

    return JSON.parse(JSON.stringify(deletedGalleryItem));
  } catch (error) {
    handleError(error);
  }
};


