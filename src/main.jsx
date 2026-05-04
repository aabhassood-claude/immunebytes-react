import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { router } from './router'

// Intercept clicks on internal <a href="/..."> and convert to hash navigation
// so all existing anchor tags work with HashRouter without converting to <Link>
document.addEventListener('click', (e) => {
  let el = e.target;
  while (el && el.nodeName !== 'A') el = el.parentElement;
  if (!el) return;
  const href = el.getAttribute('href');
  if (!href || !href.startsWith('/')) return;
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  if (el.target && el.target !== '_self') return;
  e.preventDefault();
  window.location.hash = '#' + href;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}, true);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
