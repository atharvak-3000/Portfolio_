import { useState, useEffect } from 'react';

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    const listener = () => setMatches(media.matches);
    // Initial check
    listener();
    
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [query]);

  return matches;
}
