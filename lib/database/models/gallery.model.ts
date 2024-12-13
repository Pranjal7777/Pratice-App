import mongoose, { Document, Schema, model, models } from "mongoose";

export interface Gallery extends Document {
    _id: string;
    title: string;
    key:string;
    content: string;

    // type: string;
    // parentId:string;
    audioUrl?: string;
    createdAt: Date;
    updatedAt: Date;
}

const gallerySchema = new mongoose.Schema({
    title: { type: String, required: true },
    key: { type: String, required:true },
    content: { type: String, required: true },  // Chords and lyrics
    // type: { type: String, enum: ['song', 'folder'], required: true },  // 'song' or 'folder'
    // parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Gallery', default: null },  // Nested folder support
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    audioUrl: { type: String, default: null ,required:false},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },{timestamps:true})

const Gallery = models.Gallery || model('Gallery', gallerySchema);

export default Gallery as mongoose.Model<Gallery>;