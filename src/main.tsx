import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';


if (
  performance.getEntriesByType("navigation")[0] &&
  (performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming)
    .type === "reload"
) {
  window.history.replaceState(null, "", "/");
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
