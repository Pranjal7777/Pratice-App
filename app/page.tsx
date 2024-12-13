import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mic2, Music, Repeat, Bell, Facebook, Twitter, Instagram, Star, ChevronDown, FolderOpen, Edit3, Headphones, BarChart2, Calendar, BookOpen, Menu, Music2, BookMarked, History, Share2 } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 w-full border-b border-border/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center">
              <Link className="flex items-center space-x-3" href="/">
                <Mic2 className="h-8 w-8 md:h-10 md:w-10 text-primary" />
                <span className="font-bold text-lg md:text-xl">Singer's App</span>
              </Link>
            </div>
            <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
              <Link href="/features" className="text-sm lg:text-base font-medium hover:text-primary transition-colors">Features</Link>
              <Link href="/pricing" className="text-sm lg:text-base font-medium hover:text-primary transition-colors">Pricing</Link>
              <Link href="/blog" className="text-sm lg:text-base font-medium hover:text-primary transition-colors">Blog</Link>
              <Link href="/support" className="text-sm lg:text-base font-medium hover:text-primary transition-colors">Support</Link>
            </nav>
            <div className="flex items-center space-x-2 md:space-x-4">
              <Link href="/login">
                <Button variant="ghost" className="hidden sm:inline-flex">Log in</Button>
              </Link>
              <Link href="/signup">
                <Button>Sign up</Button>
              </Link>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[600px] flex items-center justify-center text-center text-white">
          <Image
            src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
            alt="Singer with guitar"
            layout="fill"
            objectFit="cover"
            quality={100}
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          <div className="relative z-10 max-w-3xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Never Forget Your Musical Journey</h1>
            <p className="text-xl mb-8">Keep track of your song practice, chord changes, and improvements. Your personal music evolution, all in one place.</p>
            <div className="space-x-4">
              <Button asChild size="lg">
                <Link href="/signup">Start Tracking Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/demo">See How It Works</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Enhanced Features Section */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Features Tailored for Musicians</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <Music2 className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Song Practice Tracker</h3>
                <p>Log your practice sessions, including duration, focus areas, and personal notes.</p>
              </div>
              <div className="text-center">
                <BookMarked className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Chord Progression Library</h3>
                <p>Save and organize chord progressions for each song, including variations and experiments.</p>
              </div>
              <div className="text-center">
                <History className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Version History</h3>
                <p>Track changes in your arrangements over time, never losing a great idea.</p>
              </div>
              <div className="text-center">
                <FolderOpen className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Smart Folder Management</h3>
                <p>Organize your songs into customizable folders. Sort by date, name, or artist for easy access.</p>
              </div>
              <div className="text-center">
                <Edit3 className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Advanced Song Editor</h3>
                <p>Edit lyrics, add chords, and make notes. Includes version history to track your changes.</p>
              </div>
              <div className="text-center">
                <Headphones className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Practice Session Recording</h3>
                <p>Record your practice sessions, visualize waveforms, and playback to analyze your performance.</p>
              </div>
              <div className="text-center">
                <BarChart2 className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
                <p>Set goals, log your practice time, and view detailed progress reports to stay motivated.</p>
              </div>
              <div className="text-center">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Practice Scheduler</h3>
                <p>Plan your practice sessions with our built-in calendar. Set reminders to stay consistent.</p>
              </div>
              <div className="text-center">
                <BookOpen className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Chord Library</h3>
                <p>Access a comprehensive chord library. Learn new chords and add them to your songs easily.</p>
              </div>
            </div>
          </div>
        </section>

        {/* New Section: How It Works */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <ol className="space-y-6">
                  <li className="flex items-start">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold mr-4">1</span>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Add Your Songs</h3>
                      <p>Input the songs you're practicing, including lyrics and initial chord progressions.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold mr-4">2</span>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Log Your Practice</h3>
                      <p>Record your practice sessions, noting any changes or improvements you make.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold mr-4">3</span>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Track Your Progress</h3>
                      <p>Review your history to see how your arrangements and skills have evolved over time.</p>
                    </div>
                  </li>
                </ol>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1598387993441-a364f854c3e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80"
                  alt="Musician writing notes"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card rounded-lg p-6 shadow-md">
                  <div className="flex items-center mb-4">
                    <Image
                      src={`https://i.pravatar.cc/60?img=${i}`}
                      alt={`User ${i}`}
                      width={60}
                      height={60}
                      className="rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-semibold">User {i}</h4>
                      <div className="flex">
                        {[...Array(5)].map((_, index) => (
                          <Star key={index} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground">"This app has revolutionized my singing practice. I've seen significant improvement in my skills since I started using it."</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Simple, Transparent Pricing</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Basic',
                  price: 9.99,
                  features: [
                    'Up to 50 songs',
                    'Basic folder management',
                    'Song editor with chord annotations',
                    'Practice session recording (up to 30 minutes)',
                    'Progress tracking'
                  ]
                },
                {
                  name: 'Pro',
                  price: 19.99,
                  features: [
                    'Unlimited songs',
                    'Advanced folder management',
                    'Full-featured song editor with version history',
                    'Unlimited practice session recording',
                    'Detailed progress analytics',
                    'Chord library access'
                  ]
                },
                {
                  name: 'Elite',
                  price: 29.99,
                  features: [
                    'All Pro features',
                    'Priority support',
                    'Collaborative features for band practice',
                    'Advanced audio analysis tools',
                    'Custom branding options',
                    'API access for integrations'
                  ]
                }
              ].map((plan, index) => (
                <div key={plan.name} className="bg-card rounded-lg p-6 shadow-md flex flex-col">
                  <h3 className="text-2xl font-semibold mb-4">{plan.name}</h3>
                  <p className="text-3xl font-bold mb-4">${plan.price}<span className="text-base font-normal">/month</span></p>
                  <ul className="mb-6 flex-grow">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="mb-2 flex items-start">
                        <ChevronDown className="h-5 w-5 mr-2 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full">Choose {plan.name}</Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I get started?</AccordionTrigger>
                <AccordionContent>
                  Simply sign up for a free trial, and you'll have immediate access to all features. You can start adding your songs and tracking your practice right away.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Can I use the app on multiple devices?</AccordionTrigger>
                <AccordionContent>
                  Yes, your account can be accessed from any device with an internet connection. Your data will be synced across all your devices.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is there a limit to how many songs I can add?</AccordionTrigger>
                <AccordionContent>
                  The number of songs you can add depends on your subscription plan. Basic users can add up to 50 songs, while Pro and Elite users have unlimited song storage.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>How does the practice recording feature work?</AccordionTrigger>
                <AccordionContent>
                  Our practice recording feature allows you to record your singing sessions directly in the app. You can then playback your recordings, visualize the audio waveform, and add notes for improvement. Basic users can record up to 30 minutes per session, while Pro and Elite users have unlimited recording time.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>Can I collaborate with other singers or band members?</AccordionTrigger>
                <AccordionContent>
                  Collaboration features are available for Elite plan subscribers. This includes shared folders, collaborative editing of songs, and the ability to share practice recordings with band members.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* New Section: Integration */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Seamless Integration with Your Workflow</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card rounded-lg p-6 shadow-md">
                <Share2 className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Export and Share</h3>
                <p>Easily export your song arrangements and practice notes to PDF or share them with bandmates.</p>
              </div>
              <div className="bg-card rounded-lg p-6 shadow-md">
                <Headphones className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Audio Recording</h3>
                <p>Record audio snippets of your practice sessions directly within the app for future reference.</p>
              </div>
              <div className="bg-card rounded-lg p-6 shadow-md">
                <Bell className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Practice Reminders</h3>
                <p>Set up custom reminders to keep your practice schedule on track and never miss a session.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Start Tracking Your Musical Journey Today</h2>
            <p className="text-xl mb-8">Join fellow musicians in documenting your progress and never losing a great idea again.</p>
            <Button asChild size="lg" variant="secondary">
              <Link href="/signup">Begin Your Free Trial</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">About Us</h3>
              <p className="text-sm text-muted-foreground">We're passionate about helping singers reach their full potential through technology and data-driven practice.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/features" className="hover:text-primary">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-primary">Pricing</Link></li>
                <li><Link href="/blog" className="hover:text-primary">Blog</Link></li>
                <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/terms" className="hover:text-primary">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <Facebook className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <Twitter className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <Instagram className="h-6 w-6" />
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Singer's Practice App. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
