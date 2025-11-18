import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import WelcomePage from "@/pages/WelcomePage";
import HomePage from "@/pages/HomePage";
import GamesPage from "@/pages/GamesPage";
import TasksPage from "@/pages/TasksPage";
import ProfilePage from "@/pages/ProfilePage";
import UserStorePage from "@/pages/StorePage";
import LimboGame from "@/pages/games/LimboGame";
import DiceGame from "@/pages/games/DiceGame";
import MinesGame from "@/pages/games/MinesGame";
import NotFoundPage from "@/pages/NotFoundPage";
import AdminLoginPage from "@/pages/admin/AdminLoginPage";
import AdminLayout from "@/components/AdminLayout";
import DashboardPage from "@/pages/admin/DashboardPage";
import UsersPage from "@/pages/admin/UsersPage";
import NotificationsPage from "@/pages/admin/NotificationsPage";
import TasksAdminPage from "@/pages/admin/TasksPage";
import TaskApprovalsPage from "@/pages/admin/TaskApprovalsPage";
import GameSettingsPage from "@/pages/admin/GameSettingsPage";
import AdminStorePage from "@/pages/admin/StorePage";
import SponsorsPage from "@/pages/admin/SponsorsPage";
import SettingsPage from "@/pages/admin/SettingsPage";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuthStore } from "@/store/auth-store";

// Protected Route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { hasJoinedChannel, showWelcome } = useAuthStore();
  
  if (showWelcome || !hasJoinedChannel) {
    return <Navigate to="/welcome" replace />;
  }
  
  return <>{children}</>;
}

function App() {
  const { initialize, completeWelcome } = useAuthStore();

  useEffect(() => {
    // Initialize auth and Telegram Web App on mount
    initialize();
  }, [initialize]);

  const handleWelcomeComplete = () => {
    completeWelcome();
  };

  return (
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          {/* Welcome Route */}
          <Route path="/welcome" element={<WelcomePage onComplete={handleWelcomeComplete} />} />
          
          {/* Protected Public Routes */}
          <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/games" element={<ProtectedRoute><GamesPage /></ProtectedRoute>} />
          <Route path="/games/limbo" element={<ProtectedRoute><LimboGame /></ProtectedRoute>} />
          <Route path="/games/dice" element={<ProtectedRoute><DiceGame /></ProtectedRoute>} />
          <Route path="/games/mines" element={<ProtectedRoute><MinesGame /></ProtectedRoute>} />
          <Route path="/tasks" element={<ProtectedRoute><TasksPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="tasks" element={<TasksAdminPage />} />
            <Route path="task-approvals" element={<TaskApprovalsPage />} />
            <Route path="game-settings" element={<GameSettingsPage />} />
            <Route path="store" element={<AdminStorePage />} />
            <Route path="sponsors" element={<SponsorsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </TooltipProvider>
  );
}

export default App;
