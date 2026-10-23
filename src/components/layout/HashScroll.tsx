import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { usePrefersReducedMotion } from '../../utils/usePrefersReducedMotion';

export function HashScroll() {
  const location = useLocation();
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const id = location.hash.replace('#', '');

    if (!id) {
      if (location.pathname !== '/') {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
      return;
    }

    const timer = window.setTimeout(() => {
      const destino = document.getElementById(id);
      if (!destino) {
        return;
      }

      destino.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    }, 60);

    return () => window.clearTimeout(timer);
  }, [location.pathname, location.hash, location.key, reducedMotion]);

  return null;
}
