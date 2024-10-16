import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mic2 } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <main className="container mx-auto px-6 py-12 flex flex-col items-center justify-center min-h-screen text-center">
        <Mic2 className="w-16 h-16 mb-6 text-primary" />
        <h1 className="text-4xl font-bold mb-4">Singer's Practice App</h1>
        <p className="text-xl mb-8 max-w-2xl">
          Track your singing practice, manage songs, and improve your performance with our comprehensive tool for singers.
        </p>
        <div className="space-x-4">
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/login">Login</Link>
          </Button>
        </div>
        <section className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          <FeatureCard
            title="Track Your Practice"
            description="Upload audio files or create lyric sheets to monitor your progress."
          />
          <FeatureCard
            title="Manage Chords"
            description="Easily annotate lyrics with chords and manage chord changes."
          />
          <FeatureCard
            title="Scale Transposition"
            description="Change chord scales for any song to match your vocal range."
          />
          <FeatureCard
            title="Practice Reminders"
            description="Set reminders to keep your practice schedule on track."
          />
          <FeatureCard
            title="Progress Analytics"
            description="Visualize your improvement over time with detailed analytics."
          />
          <FeatureCard
            title="Collaborative Features"
            description="Share and collaborate on songs with other singers."
          />
        </section>
      </main>
      <footer className="bg-background py-6">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>&copy; 2024 Singer's Practice App. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            <Link href="/terms" className="hover:underline">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-card p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}