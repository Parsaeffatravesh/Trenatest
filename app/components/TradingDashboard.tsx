'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    initDashboard?: () => void;
    __dashboard_initialized__?: boolean;
  }
}

interface TradingDashboardProps {
  initialHtml: string;
}

const DASHBOARD_SCRIPT_ID = 'dashboard-script';

export default function TradingDashboard({ initialHtml }: TradingDashboardProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = initialHtml;
    }

    const existingScript = document.getElementById(DASHBOARD_SCRIPT_ID) as HTMLScriptElement | null;

    if (!existingScript) {
      const script = document.createElement('script');
      script.id = DASHBOARD_SCRIPT_ID;
      script.src = '/dashboard.js';
      script.defer = true;
      script.addEventListener('load', () => {
        if (typeof window.initDashboard === 'function' && !window.__dashboard_initialized__) {
          window.initDashboard();
          window.__dashboard_initialized__ = true;
        }
      });
      document.body.appendChild(script);
    } else if (typeof window.initDashboard === 'function' && !window.__dashboard_initialized__) {
      window.initDashboard();
      window.__dashboard_initialized__ = true;
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [initialHtml]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#0a0e17] text-white"
      dangerouslySetInnerHTML={{ __html: initialHtml }}
    />
  );
}
