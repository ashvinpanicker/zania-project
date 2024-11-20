import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

async function startApp() {
  if (process.env.NODE_ENV === 'development') {
    const { worker } = await import('./mocks/browser');
    // Initialize MSW
    await worker.start({ 
      onUnhandledRequest: 'bypass',
      serviceWorker: {
        url: '/mockServiceWorker.js'
      }
    });
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

startApp();