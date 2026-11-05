import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { FitnessProvider } from "./context/FitnessContext";
import { AppLayout } from "./components/Layout/AppLayout";

// Code-split pages for near-instant initial page load
const LandingPage = lazy(() => import("./pages/LandingPage").then((m) => ({ default: m.LandingPage })));
const Onboarding = lazy(() => import("./pages/Onboarding").then((m) => ({ default: m.Onboarding })));
const Dashboard = lazy(() => import("./pages/Dashboard").then((m) => ({ default: m.Dashboard })));
const ExerciseLibrary = lazy(() => import("./pages/ExerciseLibrary").then((m) => ({ default: m.ExerciseLibrary })));
const ExerciseDetails = lazy(() => import("./pages/ExerciseDetails").then((m) => ({ default: m.ExerciseDetails })));
const WorkoutPlans = lazy(() => import("./pages/WorkoutPlans").then((m) => ({ default: m.WorkoutPlans })));
const EquipmentGuidePage = lazy(() => import("./pages/EquipmentGuidePage").then((m) => ({ default: m.EquipmentGuidePage })));
const EquipmentAlternativesPage = lazy(() => import("./pages/EquipmentAlternativesPage").then((m) => ({ default: m.EquipmentAlternativesPage })));
const CalendarPage = lazy(() => import("./pages/CalendarPage").then((m) => ({ default: m.CalendarPage })));
const ProgressPage = lazy(() => import("./pages/ProgressPage").then((m) => ({ default: m.ProgressPage })));
const Achievements = lazy(() => import("./pages/Achievements").then((m) => ({ default: m.Achievements })));
const VirtualTrainerPage = lazy(() => import("./pages/VirtualTrainerPage").then((m) => ({ default: m.VirtualTrainerPage })));
const Settings = lazy(() => import("./pages/Settings").then((m) => ({ default: m.Settings })));
const ActiveWorkoutSession = lazy(() => import("./pages/ActiveWorkoutSession").then((m) => ({ default: m.ActiveWorkoutSession })));

// Minimalist fast loading fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh] w-full">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 rounded-full border-2 border-white/[0.08] border-t-[#FFD21F] animate-spin" />
      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#6B6B6B]">
        Loading...
      </span>
    </div>
  </div>
);

export default function App() {
  return (
    <FitnessProvider>
      <Router>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public Landing Page */}
            <Route path="/" element={<LandingPage />} />

            {/* Onboarding Flow */}
            <Route path="/onboarding" element={<Onboarding />} />

            {/* Active Dedicated Workout Interface */}
            <Route path="/workout-session" element={<ActiveWorkoutSession />} />

            {/* Main App with Persistent Sidebar & Header Layout */}
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/exercises" element={<ExerciseLibrary />} />
              <Route path="/exercise/:id" element={<ExerciseDetails />} />
              <Route path="/plans" element={<WorkoutPlans />} />
              <Route path="/equipment-guide" element={<EquipmentGuidePage />} />
              <Route path="/equipment-alternatives" element={<EquipmentAlternativesPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/progress" element={<ProgressPage />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/trainer" element={<VirtualTrainerPage />} />
              <Route path="/settings" element={<Settings />} />
            </Route>

            {/* Catch-all redirect to Dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Suspense>
      </Router>
    </FitnessProvider>
  );
}
