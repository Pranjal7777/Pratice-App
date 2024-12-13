"use client"; // This component is client-side rendered

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { createGalleryItem, createSongWithAudio } from '@/lib/actions/song.actions';

const scales = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export default function AddNewSongForm({ session }) {
  const [isTransposing, setIsTransposing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const formik = useFormik({
    initialValues: {
      title: '',
      key: '',
      content: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      key: Yup.string().required('Song key is required'),
      content: Yup.string().required('Chords and lyrics are required'),
    }),
    onSubmit: handleSaveSong,
  });

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      setAudioFile(file);
    }
  }

  async function handleSaveSong(values: any) {
    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('key', values.key);
      formData.append('content', values.content);
      formData.append('userId', session._id);
      
      if (audioFile) {
        formData.append('audioFile', audioFile);
      }

      const result = await createGalleryItem(formData);

      if (!result) {
        throw new Error("Failed to save song");
      }
      toast({
        title: "Song Saved",
        description: "Your song has been successfully saved.",
      });
      router.push('/dashboard/gallery');
    } catch (error: any) {
      console.error('Error saving song:', error);
      toast({
        title: "Save Error",
        description: error.message || "Failed to save the song. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Song</Label>
          <Input
            id="title"
            {...formik.getFieldProps('title')}
          />
          {formik.touched.title && formik.errors.title && (
            <div className="text-red-500">{formik.errors.title}</div>
          )}
        </div>
        <div>
          <Label htmlFor="key">Key / Scale</Label>
          <Select
            onValueChange={(value) => formik.setFieldValue('key', value)}
            value={formik.values.key}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select transposed key" />
            </SelectTrigger>
            <SelectContent>
              {scales.map((scale) => (
                <SelectItem key={scale} value={scale}>{scale}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {formik.touched.key && formik.errors.key && (
            <div className="text-red-500">{formik.errors.key}</div>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Chords and Lyrics</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            {...formik.getFieldProps('content')}
            className="min-h-[300px]"
          />
          {formik.touched.content && formik.errors.content && (
            <div className="text-red-500">{formik.errors.content}</div>
          )}
        </CardContent>
      </Card>

      <div className="flex flex-col space-y-4">
        <div>
          <Label htmlFor="audioFile">Upload Audio File</Label>
          <Input
            id="audioFile"
            type="file"
            accept="audio/mp3,audio/wav,audio/flac"
            onChange={handleFileChange}
          />
          {audioFile && <p>Selected file: {audioFile.name}</p>}
        </div>
        <div className="flex space-x-4">
          <Button type="button" onClick={() => handleTranspose()} disabled={isTransposing}>
            {isTransposing ? 'Transposing...' : 'Transpose'}
          </Button>
          <Button type="submit" disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Song'}
          </Button>
        </div>
      </div>
    </form>
  );
}
