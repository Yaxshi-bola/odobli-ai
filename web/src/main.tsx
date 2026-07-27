import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { ErrorBoundary } from './components/ErrorBoundary.tsx';

// Initialize Telegram WebApp safely
if (typeof window !== 'undefined' && (window as any).Telegram?.WebApp) {
  try {
    const tg = (window as any).Telegram.WebApp;
    if (typeof tg.ready === 'function') {
      try { tg.ready(); } catch (e) {}
    }
    if (typeof tg.expand === 'function') {
      try { tg.expand(); } catch (e) {}
    }
    
    if (typeof tg.disableVerticalSwipes === 'function') {
      try { tg.disableVerticalSwipes(); } catch (e) {}
    }

    if (typeof tg.enableClosingConfirmation === 'function') {
      try { tg.enableClosingConfirmation(); } catch (e) {}
    }

    if (typeof tg.setHeaderColor === 'function') {
      try { tg.setHeaderColor('#FFF5F8'); } catch (e) {}
    }
    if (typeof tg.setBackgroundColor === 'function') {
      try { tg.setBackgroundColor('#FDF2F7'); } catch (e) {}
    }
  } catch (e) {
    console.error("Telegram WebApp init error:", e);
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
