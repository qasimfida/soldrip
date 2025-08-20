import { useState, useEffect, useRef, type RefObject } from 'react';

interface UseInViewOptions {
  threshold?: number;
  once?: boolean;
}

export function useInView<T extends Element>(
  options: UseInViewOptions = { threshold: 0.1, once: true }
): [RefObject<T | null>, boolean] {
  const [inView, setInView] = useState(false);
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (options.once) {
            observer.unobserve(currentRef);
          }
        } else if (!options.once) {
          setInView(false);
        }
      },
      {
        threshold: options.threshold,
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options.threshold, options.once]);

  return [ref, inView];
} 