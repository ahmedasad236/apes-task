import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BookingsProvider } from './contexts/BookingsContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BookingsProvider>
      <App />
    </BookingsProvider>
  </StrictMode>
);
