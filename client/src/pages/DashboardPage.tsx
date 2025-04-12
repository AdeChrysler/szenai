import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Message } from '@/types/chat';
import UserMenu from '@/components/UserMenu';
import { DatabaseSetup } from '@/components/DatabaseSetup';
import { 
  MessageSquare, 
  Calendar, 
  Clock, 
  BarChart4, 
  ChevronRight, 
  Plus, 
  RefreshCcw,
  Moon,
  Sun,
  User
} from 'lucide-react';

// Utility function to group sessions
function groupMessagesBySession(messages: Message[]): Record<string, Message[]> {
  const sessions: Record<string, Message[]> = {};
  
  messages.forEach(message => {
    if (!sessions[message.session_id]) {
      sessions[message.session_id] = [];
    }
    sessions[message.session_id].push(message);
  });
  
  return sessions;
}

// Utility to format dates
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }).format(date);
}

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Toggle dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Fetch all chat history for the user
  const { 
    data: allChatHistory, 
    isLoading, 
    refetch 
  } = useQuery<{ messages: Message[] }>({
    queryKey: ['/api/chat/history', user?.id, { sessionId: 'all' }],
    enabled: !!user,
  });

  const allMessages = allChatHistory?.messages || [];
  const sessions = groupMessagesBySession(allMessages);
  const sessionCount = Object.keys(sessions).length;
  const messageCount = allMessages.length;
  
  // Calculate stats
  const userMessageCount = allMessages.filter(m => m.role === 'user').length;
  const assistantMessageCount = allMessages.filter(m => m.role === 'assistant').length;
  
  // Get most recent session
  const sortedSessions = Object.entries(sessions).sort((a, b) => {
    const aDate = new Date(a[1][a[1].length - 1].created_at);
    const bDate = new Date(b[1][b[1].length - 1].created_at);
    return bDate.getTime() - aDate.getTime();
  });

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <span className="text-xl font-bold text-primary-600 dark:text-primary-400 cursor-pointer">
                  AI Chat
                </span>
              </Link>
            </div>
            <nav className="ml-6 space-x-4 hidden md:flex">
              <Link href="/dashboard">
                <span className="text-gray-900 dark:text-white font-medium px-3 py-2 rounded-md border-b-2 border-primary-500 cursor-pointer">
                  Dashboard
                </span>
              </Link>
              <Link href="/chat">
                <span className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 cursor-pointer">
                  Chat
                </span>
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            
            {/* User dropdown */}
            <div className="relative">
              <UserMenu user={user} onSignOut={logout} />
            </div>
          </div>
        </div>
      </header>

      {/* Database Setup Component */}
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <DatabaseSetup />
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <div className="flex space-x-4">
            <Button 
              onClick={() => refetch()} 
              variant="outline" 
              size="sm"
              className="flex items-center"
            >
              <RefreshCcw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Link href="/chat">
              <Button size="sm" className="flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                New Chat
              </Button>
            </Link>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="w-full max-w-md mx-auto">
            <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
            <TabsTrigger value="history" className="flex-1">Chat History</TabsTrigger>
            <TabsTrigger value="stats" className="flex-1">Statistics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Conversations
                  </CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{sessionCount}</div>
                  <p className="text-xs text-muted-foreground">
                    {messageCount} total messages
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Since
                  </CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {allMessages.length > 0 
                      ? new Date(allMessages[0].created_at).toLocaleDateString() 
                      : 'No activity yet'}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {allMessages.length > 0 
                      ? `First message on ${formatDate(allMessages[0].created_at)}` 
                      : 'Start your first chat'}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Recent Activity
                  </CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {allMessages.length > 0 
                      ? new Date(allMessages[allMessages.length - 1].created_at).toLocaleDateString() 
                      : 'No activity yet'}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {allMessages.length > 0 
                      ? `Last message on ${formatDate(allMessages[allMessages.length - 1].created_at)}` 
                      : 'Start your first chat'}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Conversations */}
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Conversations</CardTitle>
                <CardDescription>
                  Your most recent chat sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-4">Loading your conversations...</div>
                ) : sortedSessions.length > 0 ? (
                  <div className="space-y-4">
                    {sortedSessions.slice(0, 5).map(([sessionId, messages]) => {
                      const lastMessage = messages[messages.length - 1];
                      const date = new Date(lastMessage.created_at);
                      return (
                        <Link href={`/chat?session=${sessionId}`} key={sessionId}>
                          <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                            <div className="flex items-center space-x-4">
                              <div className="bg-primary-100 dark:bg-primary-900 p-2 rounded-full">
                                <MessageSquare className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900 dark:text-white">
                                  Session {sessionId.substring(0, 8)}...
                                </h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md truncate">
                                  {lastMessage.content}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <Badge variant="outline">
                                {messages.length} messages
                              </Badge>
                              <span className="text-sm text-gray-500">
                                {date.toLocaleDateString()}
                              </span>
                              <ChevronRight className="h-5 w-5 text-gray-400" />
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                    {sortedSessions.length > 5 && (
                      <div className="text-center mt-4">
                        <Button variant="link" onClick={() => setActiveTab('history')}>
                          View all conversations
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MessageSquare className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No conversations yet</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">Start your first chat to see your conversation history</p>
                    <Link href="/chat">
                      <Button>Start a new chat</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Conversations</CardTitle>
                <CardDescription>
                  Your complete chat history
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-4">Loading your conversations...</div>
                ) : sortedSessions.length > 0 ? (
                  <div className="space-y-4">
                    {sortedSessions.map(([sessionId, messages]) => {
                      const lastMessage = messages[messages.length - 1];
                      const firstMessage = messages[0];
                      const startDate = new Date(firstMessage.created_at);
                      const endDate = new Date(lastMessage.created_at);
                      return (
                        <Link href={`/chat?session=${sessionId}`} key={sessionId}>
                          <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                            <div className="flex items-center space-x-4">
                              <div className="bg-primary-100 dark:bg-primary-900 p-2 rounded-full">
                                <MessageSquare className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900 dark:text-white">
                                  Session {sessionId.substring(0, 8)}...
                                </h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  Started: {startDate.toLocaleDateString()} at {startDate.toLocaleTimeString()}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <Badge variant="outline">
                                {messages.length} messages
                              </Badge>
                              <span className="text-sm text-gray-500">
                                Last activity: {endDate.toLocaleDateString()}
                              </span>
                              <ChevronRight className="h-5 w-5 text-gray-400" />
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MessageSquare className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No conversations yet</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">Start your first chat to see your conversation history</p>
                    <Link href="/chat">
                      <Button>Start a new chat</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Stats Tab */}
          <TabsContent value="stats" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Usage Statistics</CardTitle>
                <CardDescription>
                  Overview of your conversation metrics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Message Distribution */}
                <div>
                  <h3 className="text-lg font-medium mb-4 flex items-center">
                    <BarChart4 className="mr-2 h-5 w-5" />
                    Message Distribution
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Your Messages</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{userMessageCount}</div>
                        <div className="text-xs text-muted-foreground">
                          {messageCount > 0 ? `${Math.round(userMessageCount / messageCount * 100)}% of total` : 'No messages yet'}
                        </div>
                        <div className="mt-4 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 rounded-full" 
                            style={{ width: `${messageCount > 0 ? userMessageCount / messageCount * 100 : 0}%` }}
                          ></div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">AI Responses</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{assistantMessageCount}</div>
                        <div className="text-xs text-muted-foreground">
                          {messageCount > 0 ? `${Math.round(assistantMessageCount / messageCount * 100)}% of total` : 'No messages yet'}
                        </div>
                        <div className="mt-4 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-purple-500 rounded-full" 
                            style={{ width: `${messageCount > 0 ? assistantMessageCount / messageCount * 100 : 0}%` }}
                          ></div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* User Stats */}
                <div>
                  <h3 className="text-lg font-medium mb-4 flex items-center">
                    <User className="mr-2 h-5 w-5" />
                    User Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="text-sm text-gray-500 dark:text-gray-400">Email</div>
                      <div className="font-medium">{user.email}</div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="text-sm text-gray-500 dark:text-gray-400">User ID</div>
                      <div className="font-medium">{user.id}</div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="text-sm text-gray-500 dark:text-gray-400">Account Created</div>
                      <div className="font-medium">{user.created_at ? formatDate(user.created_at) : 'Not available'}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default DashboardPage;