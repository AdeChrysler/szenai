import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import LoginPage from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import LeadsPage from "./pages/LeadsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import IntegrationsPage from "./pages/IntegrationsPage";
import SettingsPage from "./pages/SettingsPage";
import NewChatUIPage from "./pages/NewChatUIPage";
import WhatsAppNewChatPage from "./pages/WhatsAppNewChatPage"; // Added import for WhatsAppNewChatPage
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { useEffect } from "react";

// Protected route component
const ProtectedRoute = ({ component: Component }: { component: React.FC }) => {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading && !user) {
      setLocation("/login");
    }
  }, [user, isLoading, setLocation]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-12 w-12 rounded-full bg-blue-500/30 mb-4"></div>
        <div className="h-2 w-24 bg-gray-700 rounded-full"></div>
      </div>
    </div>;
  }

  return user ? <Component /> : null;
};

function Router() {
  return (
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="/dashboard">
        <ProtectedRoute component={DashboardPage} />
      </Route>
      <Route path="/chat">
        <ProtectedRoute component={ChatPage} />
      </Route>
      <Route path="/new-chat-ui">
        <ProtectedRoute component={NewChatUIPage} />
      </Route>
      <Route path="/whatsapp-new-chat">
        <ProtectedRoute component={WhatsAppNewChatPage} />
      </Route>
      <Route path="/leads">
        <ProtectedRoute component={LeadsPage} />
      </Route>
      <Route path="/analytics">
        <ProtectedRoute component={AnalyticsPage} />
      </Route>
      <Route path="/integrations">
        <ProtectedRoute component={IntegrationsPage} />
      </Route>
      <Route path="/settings">
        <ProtectedRoute component={SettingsPage} />
      </Route>
      <Route path="/" component={LandingPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <Router />
          <Toaster />
        </div>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;