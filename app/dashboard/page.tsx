
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic2, FolderOpen, Clock, Bell, BarChart2, Music, Calendar } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

const Dashboard = async() => {
  const session = await getServerSession(authOptions);

  // Mock data - in a real app, this would come from an API or database
  const recentFiles = [
    { id: 1, name: 'Bohemian Rhapsody', lastEdited: '2 hours ago' },
    { id: 2, name: 'Imagine', lastEdited: '1 day ago' },
    { id: 3, name: 'Shape of You', lastEdited: '3 days ago' },
  ];

  const upcomingReminders = [
    { id: 1, text: 'Practice high notes', date: 'Tomorrow, 3 PM' },
    { id: 2, text: 'Record new song', date: 'Friday, 2 PM' },
  ];

  const recentActivity = [
    { id: 1, text: 'Practiced "Bohemian Rhapsody"', time: '2 hours ago' },
    { id: 2, text: 'Added new song "Imagine"', time: '1 day ago' },
    { id: 3, text: 'Completed vocal exercise', time: '2 days ago' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Welcome back, Alex!</h1>
        <Button asChild>
          <Link href="/dashboard/create">Start New Practice Session</Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart2 className="mr-2" />
              Your Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Progress value={0} className="w-full" />
              <p className="text-center text-sm text-muted-foreground">
                {"You've completed"} {0}% of your weekly goal
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Music className="mr-2" />
              Quick Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>Songs Practiced: 12</p>
              <p>Total Practice Time: 5h 30m</p>
              <p>Streak: 7 days</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FolderOpen className="mr-2" />
              Recent Files
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {recentFiles.map((file) => (
                <li key={file.id} className="flex justify-between items-center">
                  <span>{file.name}</span>
                  <span className="text-sm text-muted-foreground">{file.lastEdited}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="mr-2" />
              Upcoming Reminders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {upcomingReminders.map((reminder) => (
                <li key={reminder.id} className="flex justify-between items-center">
                  <span>{reminder.text}</span>
                  <span className="text-sm text-muted-foreground">{reminder.date}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="mr-2" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {recentActivity.map((activity) => (
              <li key={activity.id} className="flex items-start space-x-4">
                <div className="bg-primary rounded-full p-2">
                  <Mic2 className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <p>{activity.text}</p>
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-2 bg-[url('https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center text-white">
          <CardContent className="flex flex-col justify-end h-[200px] bg-black bg-opacity-50">
            <h3 className="text-2xl font-bold mb-2">Weekly Challenge</h3>
            <p>Practice a new song in a different genre</p>
            <Button className="mt-4 w-fit">Accept Challenge</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>Virtual Karaoke Night - July 20</li>
              <li>Local Open Mic - July 25</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;