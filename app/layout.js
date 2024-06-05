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

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster />
        <Button onClick={toggleDarkMode} variant="ghost" className="fixed top-4 right-4 z-50">
          {darkMode ? <MoonIcon /> : <SunIcon />}
        </Button>
      </body>
    </html>
  );
}
