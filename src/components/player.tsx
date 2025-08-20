import { useEffect, useRef } from 'react';
import { useInView } from '@/hooks/useInView';
import type { PlayerProps } from '@/types/player';

export const Player = ({
  src,
  poster,
  className = '',
  muted = true,
  controls = false,
}: PlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [containerRef, isInView] = useInView<HTMLDivElement>({
    threshold: 0.3,
  });

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (isInView) {
      videoElement.play().catch(err => {
        console.warn('Auto-play was prevented:', err);
        if (videoRef.current) {
          videoRef.current.controls = true;
        }
      });
    } else {
      videoElement.pause();
    }
  }, [isInView]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        className="object-cover w-full h-full"
        poster={poster}
        loop
        playsInline
        muted={muted}
        controls={controls}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
} 