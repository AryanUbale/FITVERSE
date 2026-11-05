import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useFitness } from "../../context/FitnessContext";
import { CheckCircle, AlertCircle, X } from "lucide-react";

export const AppLayout = () => {
  const { notification, setNotification } = useFitness();

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Collapsible Left Sidebar (260px) */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen bg-black">
        {/* Sticky Top Header */}
        <Header />

        {/* Global Floating Toast Notification Banner */}
        {notification && (
          <div className="fixed bottom-6 right-6 z-50 max-w-sm animate-fadeIn">
            <div className="bg-[#111111] border border-[#FFD21F]/40 p-4 rounded-[20px] shadow-2xl flex items-start gap-3">
              <div className="p-2 rounded-xl bg-[#FFD21F]/15 text-[#FFD21F] shrink-0">
                {notification.type === "achievement" ? (
                  <CheckCircle className="w-5 h-5 text-[#FFD21F]" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-[#FFD21F]" />
                )}
              </div>
              <div className="flex-1 min-w-0 pr-2">
                <h5 className="text-xs font-bold text-white">{notification.title}</h5>
                <p className="text-[11px] text-[#A1A1A1] mt-0.5 leading-relaxed font-medium">
                  {notification.message}
                </p>
              </div>
              <button
                onClick={() => setNotification(null)}
                className="text-[#6B6B6B] hover:text-white p-1 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Content area: max width 1440px with 32px padding */}
        <main className="flex-1 p-6 md:p-8 max-w-[1440px] w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
