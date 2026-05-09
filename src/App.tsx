/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./lib/AuthContext";
import { LandingPage } from "./pages/LandingPage";
import { Dashboard } from "./pages/Dashboard";
import { PanicMode } from "./pages/PanicMode";
import { StudyAssistant } from "./pages/StudyAssistant";
import { Community } from "./pages/Community";
import { FocusMode } from "./pages/FocusMode";
import { VivaSimulator } from "./pages/VivaSimulator";
import { NotesPYQ } from "./pages/NotesPYQ";
import { Sidebar } from "./components/layout/Sidebar";
import { Header } from "./components/layout/Header";
import { AnimatePresence } from "motion/react";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex bg-brand-bg min-h-screen text-slate-200">
          <Sidebar />
          
          <div className="flex-1 flex flex-col ml-64 min-h-screen overflow-x-hidden">
            <Header />
            
            <main className="flex-1 relative">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/panic" element={<PanicMode />} />
                  <Route path="/assistant" element={<StudyAssistant />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/focus" element={<FocusMode />} />
                  <Route path="/viva" element={<VivaSimulator />} />
                  <Route path="/notes" element={<NotesPYQ />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </AnimatePresence>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

