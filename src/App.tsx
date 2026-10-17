/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { storageService } from './services/storageService';
import { User } from './types/chemistry';

// Pages
import { Home } from './pages/Home';
import { AiAssistantPage } from './pages/AiAssistantPage';
import { VirtualLabPage } from './pages/VirtualLabPage';
import { PeriodicTablePage } from './pages/PeriodicTablePage';
import { ReactionsPage } from './pages/ReactionsPage';
import { MoleculesPage } from './pages/MoleculesPage';
import { LessonsPage } from './pages/LessonsPage';
import { QuizPage } from './pages/QuizPage';
import { CalculatorPage } from './pages/CalculatorPage';
import { LabNotebookPage } from './pages/LabNotebookPage';
import { SafetyPage } from './pages/SafetyPage';
import { ResultsPage } from './pages/ResultsPage';
import { AiFloatingWidget } from './components/AiFloatingWidget';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [navParam, setNavParam] = useState<string | undefined>(undefined);
  const [searchOpen, setSearchOpen] = useState(false);
  const [currentUser] = useState<User>(() => storageService.getCurrentUser());

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleNavigate = (page: string, param?: string) => {
    setCurrentPage(page);
    setNavParam(param);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenSearch={() => setSearchOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {currentPage === 'home' && (
          <Home currentUser={currentUser} onNavigate={handleNavigate} />
        )}
        {currentPage === 'ai-assistant' && (
          <AiAssistantPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'virtual-lab' && (
          <VirtualLabPage
            initialExperimentId={navParam}
            onNavigateToNotebook={() => handleNavigate('lab-notebook')}
          />
        )}
        {currentPage === 'periodic-table' && (
          <PeriodicTablePage initialElementSymbol={navParam} />
        )}
        {currentPage === 'reactions' && (
          <ReactionsPage />
        )}
        {currentPage === 'molecules' && (
          <MoleculesPage />
        )}
        {currentPage === 'lessons' && (
          <LessonsPage
            initialLessonId={navParam}
            onNavigateToLab={(expId) => handleNavigate('virtual-lab', expId)}
          />
        )}
        {currentPage === 'quiz' && (
          <QuizPage />
        )}
        {currentPage === 'calculator' && (
          <CalculatorPage />
        )}
        {currentPage === 'lab-notebook' && (
          <LabNotebookPage />
        )}
        {currentPage === 'safety' && (
          <SafetyPage />
        )}
        {currentPage === 'results' && (
          <ResultsPage />
        )}
      </main>

      {/* Global Search Dialog */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Floating AI Chemistry Assistant Widget */}
      <AiFloatingWidget onNavigate={handleNavigate} />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
