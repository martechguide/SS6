import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import Home from "@/pages/home";
import BatchSubjects from "@/pages/batch-subjects";
import SubjectVideos from "@/pages/subject-videos";
import VideoPlayer from "@/pages/video-player";
import MultiVideoViewer from "@/pages/multi-video-viewer";
import AdminDashboard from "@/pages/admin-dashboard";
import MonetizationSetup from "@/pages/monetization-setup";
import AdsterraManagement from "@/pages/adsterra-management";
import AdminUsers from "@/pages/AdminUsers";
import AdsShowcase from "@/pages/ads-showcase";
import AdminAdsManagement from "@/pages/admin-ads-management";
import AdminLogin from "@/pages/admin-login";


function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Switch>
      {/* Admin routes - always accessible for admin login flow */}
      <Route path="/admin-login" component={AdminLogin} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin-dashboard" component={AdminDashboard} />
      <Route path="/admin/users" component={AdminUsers} />
      <Route path="/admin/ads" component={AdminAdsManagement} />
      <Route path="/monetization" component={MonetizationSetup} />
      <Route path="/adsterra-management" component={AdsterraManagement} />
      
      {isLoading || !isAuthenticated ? (
        <Route path="/" component={Landing} />
      ) : (
        <>
          <Route path="/" component={Home} />
          <Route path="/batch/:batchId" component={BatchSubjects} />
          <Route path="/batch/:batchId/course/:courseId" component={BatchSubjects} />
          <Route path="/batch/:batchId/subject/:subjectId" component={SubjectVideos} />
          <Route path="/batch/:batchId/course/:courseId/subject/:subjectId" component={SubjectVideos} />
          <Route path="/video/:videoId" component={VideoPlayer} />
          <Route path="/multi-video/:videoId" component={MultiVideoViewer} />
          <Route path="/ads-showcase" component={AdsShowcase} />
        </>
      )}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
