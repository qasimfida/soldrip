import { useState, useEffect, useRef, RefObject } from 'react';

interface UseInViewOptions {
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
}

export function useInView<T extends Element>({
  rootMargin = '0px',
  threshold = 0,
  once = false,
}: UseInViewOptions = {}): [RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;
        setIsInView(isVisible);
        
        // If once is true and element is visible, unobserve
        if (once && isVisible && ref.current) {
          observer.unobserve(ref.current);
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [rootMargin, threshold, once]);

  return [ref, isInView];
} 