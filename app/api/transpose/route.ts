// import { NextRequest, NextResponse } from 'next/server';

// const chordMap = {
//   'C': ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
//   'C#': ['C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C'],
//   'D': ['D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#'],
//   'D#': ['D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D'],
//   'E': ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#'],
//   'F': ['F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E'],
//   'F#': ['F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F'],
//   'G': ['G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#'],
//   'G#': ['G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G'],
//   'A': ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'],
//   'A#': ['A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A'],
//   'B': ['B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#']
// };

// function transposeChord(chord: string, semitones: number): string {
//   const root = chord.replace(/m|dim|aug|\d+/g, '');
//   const suffix = chord.slice(root.length);
//   const index = chordMap['C'].indexOf(root);
//   if (index === -1) return chord; // Return original if not found
//   const newRoot = chordMap['C'][(index + semitones + 12) % 12];
//   return newRoot + suffix;
// }

// function transposeLyrics(lyrics: string, fromKey: string, toKey: string): string {
//   const semitones = chordMap[fromKey].indexOf(toKey);
//   const chordRegex = /\(([A-G][#b]?(?:m|dim|aug)?(?:\d+)?)\)/g;
  
//   return lyrics.replace(chordRegex, (match, chord) => {
//     const transposedChord = transposeChord(chord, semitones);
//     return `(${transposedChord})`;
//   });
// }

// export async function POST(req: NextRequest) {
//   try {
//     const { content, originalKey, transposedKey } = await req.json();

//     if (!content || !originalKey || !transposedKey) {
//       return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
//     }

//     const transposedContent = transposeLyrics(content, originalKey, transposedKey);

//     return NextResponse.json({ transposedContent });
//   } catch (error: any) {
//     console.error('Error in transpose API:', error);
//     return NextResponse.json({ 
//       error: error.message || 'An unexpected error occurred during transposition.',
//       details: error.stack || 'No additional details available'
//     }, { status: 500 });
//   }
// }
import { NextRequest, NextResponse } from 'next/server';

const chordMap = {
  'C': ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
  'C#': ['C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C'],
  'D': ['D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#'],
  'D#': ['D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D'],
  'E': ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#'],
  'F': ['F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E'],
  'F#': ['F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F'],
  'G': ['G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#'],
  'G#': ['G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G'],
  'A': ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'],
  'A#': ['A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A'],
  'B': ['B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#']
};

function transposeChord(chord: string, semitones: number): string {
  const root = chord.replace(/m|dim|aug|\d+/g, '');
  const suffix = chord.slice(root.length);
  const index = chordMap['C'].indexOf(root);
  if (index === -1) return chord; // Return original if not found
  const newRoot = chordMap['C'][(index + semitones + 12) % 12];
  return newRoot + suffix;
}

function transposeLyrics(lyrics: string, fromKey: string, toKey: string): string {
  const semitones = chordMap[fromKey].indexOf(toKey);
  const chordRegex = /\(([A-G][#b]?(?:m|dim|aug)?(?:\d+)?)\)/g;
  const chordRegexBrackets = /\[([A-G][#b]?(?:m|dim|aug)?(?:\d+)?)\]/g;
  
  return lyrics.replace(chordRegex, (match, chord) => {
    const transposedChord = transposeChord(chord, semitones);
    return `(${transposedChord})`;
  }).replace(chordRegexBrackets, (match, chord) => {
    const transposedChord = transposeChord(chord, semitones);
    return `[${transposedChord}]`;
  });
}

export async function POST(req: NextRequest) {
  try {
    const { content, originalKey, transposedKey } = await req.json();

    if (!content || !originalKey || !transposedKey) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const transposedContent = transposeLyrics(content, originalKey, transposedKey);

    return NextResponse.json({ transposedContent });
  } catch (error: any) {
    console.error('Error in transpose API:', error);
    return NextResponse.json({ 
      error: error.message || 'An unexpected error occurred during transposition.',
      details: error.stack || 'No additional details available'
    }, { status: 500 });
  }
}