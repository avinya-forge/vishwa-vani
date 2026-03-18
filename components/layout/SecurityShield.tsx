'use client';

import { useEffect } from 'react';

/**
 * Vishwa-Vani: Console Shield & Obfuscation Layer 🛡️
 * 
 * This client-side script enforces basic security as requested:
 * 1. Disables right-click context menu (to block easy "Inspect").
 * 2. Blocks common 'Developer Tools' keyboard shortcuts (F12, Ctrl+Shift+I).
 * 3. Monitors for console-opening attempts.
 */
export default function SecurityShield() {
  useEffect(() => {
    // 1. Disable Right-Click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // 2. Block DevTools Shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.key === 'F12') {
        e.preventDefault();
        return false;
      }
      // Ctrl+Shift+I, J, C, U
      if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C' || e.key === 'U')) {
        e.preventDefault();
        return false;
      }
      // Ctrl+U (Page Source)
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        return false;
      }
    };

    // 3. Console Detection (Passive)
    let consoleOpened = false;
    const threshold = 160;
    const check = () => {
      if (window.outerWidth - window.innerWidth > threshold || 
          window.outerHeight - window.innerHeight > threshold) {
        if (!consoleOpened) {
          console.log('%cॐ शांति: Unauthorized inspection detected.', 
            'color: #EA580C; font-size: 20px; font-weight: bold; font-family: serif;');
          consoleOpened = true;
        }
      }
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', check);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', check);
    };
  }, []);

  return null;
}
