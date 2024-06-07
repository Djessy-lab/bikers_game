"use client";

import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster"
import { useState, useEffect } from 'react';
import "./globals.css";
import { metadata } from './metadata';
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      if (darkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('darkMode', 'true');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('darkMode', 'false');
      }
    }
  }, [darkMode, mounted]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body suppressHydrationWarning={true} className={`${inter.className} ${mounted && darkMode ? 'dark' : ''} bg-2 dark:bg-background`}>
        {children}
        <Toaster className="text-sm text-gray-700 dark:text-gray-300" />
        <Button onClick={toggleDarkMode} variant="ghost" className="fixed top-4 right-4 z-50 p-2 rounded-full">
          {darkMode ? <MoonIcon className="text-yellow-500" /> : <SunIcon className="text-blue-500" />}
        </Button>
      </body>
    </html>
  );
}
