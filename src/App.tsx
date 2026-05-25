/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Facts } from './components/Facts';
import { CodeSection } from './components/CodeSection';
import { GameDemo } from './components/GameDemo';
import { motion } from 'motion/react';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-indigo-200 border-t-8 border-indigo-600">
      <header className="relative pt-12 pb-8 px-8 border-b border-slate-200 mb-8 max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-2">
            Gra w życie Conwaya
          </h1>
          <p className="text-slate-500 text-sm md:text-base uppercase tracking-widest font-semibold">
            Automat Komórkowy • Matematyka • Obliczenia
          </p>
        </motion.div>
      </header>

      <main className="max-w-6xl mx-auto px-6">
        <Facts />
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <CodeSection />
          <GameDemo />
        </div>
      </main>

      <footer className="py-8 text-center text-slate-500 font-sans text-sm border-t border-slate-200 mt-16 bg-white">
        <p>S27160 - Jakub Daniel - przygotowane za pomocą Google AI studio</p>
      </footer>
    </div>
  );
}
