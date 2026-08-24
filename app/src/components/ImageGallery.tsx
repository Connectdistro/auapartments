import { useCallback, useEffect, useState, type KeyboardEvent, type ReactNode, type TouchEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { PropertyImage } from '../data/properties';

interface ImageGalleryProps {
  images: PropertyImage[];
  title: string;
  topLeft?: ReactNode;
  topRight?: ReactNode;
}

export default function ImageGallery({ images, title, topLeft, topRight }: ImageGalleryProps) {
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const count = images.length;
  const goNext = useCallback(() => setIndex((i) => ((i + 1) % count + count) % count), [count]);
  const goPrev = useCallback(() => setIndex((i) => ((i - 1) % count + count) % count), [count]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxOpen(false);
      else if (event.key === 'ArrowRight') goNext();
      else if (event.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxOpen, goNext, goPrev]);

  const handleTouchStart = (event: TouchEvent) => setTouchStartX(event.touches[0].clientX);
  const handleTouchEnd = (event: TouchEvent) => {
    if (touchStartX === null) return;
    const deltaX = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) goNext();
      else goPrev();
    }
    setTouchStartX(null);
  };

  const handleMainKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setLightboxOpen(true);
    }
  };

  if (count === 0) return null;

  return (
    <div className="gallery">
      <div
        className="gallery-main"
        onClick={() => setLightboxOpen(true)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onKeyDown={handleMainKeyDown}
        role="button"
        tabIndex={0}
        aria-label={`View ${images[index].alt} photo full screen`}
      >
        <img className="gallery-image" src={images[index].src} alt={images[index].alt} />
        {topLeft ? (
          <div className="gallery-overlay-left" onClick={(event) => event.stopPropagation()}>
            {topLeft}
          </div>
        ) : null}
        {topRight ? (
          <div className="gallery-overlay-right" onClick={(event) => event.stopPropagation()}>
            {topRight}
          </div>
        ) : null}
        {count > 1 ? (
          <>
            <button
              type="button"
              className="gallery-nav gallery-nav-prev"
              onClick={(event) => {
                event.stopPropagation();
                goPrev();
              }}
              aria-label="Previous photo"
            >
              ‹
            </button>
            <button
              type="button"
              className="gallery-nav gallery-nav-next"
              onClick={(event) => {
                event.stopPropagation();
                goNext();
              }}
              aria-label="Next photo"
            >
              ›
            </button>
          </>
        ) : null}
      </div>

      {count > 1 ? (
        <div className="gallery-thumbs">
          {images.map((image, i) => (
            <button
              key={image.src}
              type="button"
              className={`gallery-thumb${i === index ? ' is-active' : ''}`}
              onClick={() => setIndex(i)}
              aria-label={`Show photo: ${image.alt}`}
              aria-current={i === index}
            >
              <img className="gallery-image" src={image.src} alt="" />
            </button>
          ))}
        </div>
      ) : null}

      <AnimatePresence>
        {lightboxOpen ? (
          <motion.div
            className="gallery-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            role="dialog"
            aria-modal="true"
            aria-label={`${title} photo gallery`}
          >
            <button
              type="button"
              className="gallery-lightbox-close"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close gallery"
            >
              ×
            </button>
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                className="gallery-lightbox-image"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={(event) => event.stopPropagation()}
              >
                <img className="gallery-image" src={images[index].src} alt={images[index].alt} />
              </motion.div>
            </AnimatePresence>
            {count > 1 ? (
              <>
                <button
                  type="button"
                  className="gallery-nav gallery-nav-prev"
                  onClick={(event) => {
                    event.stopPropagation();
                    goPrev();
                  }}
                  aria-label="Previous photo"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="gallery-nav gallery-nav-next"
                  onClick={(event) => {
                    event.stopPropagation();
                    goNext();
                  }}
                  aria-label="Next photo"
                >
                  ›
                </button>
              </>
            ) : null}
            <span className="gallery-lightbox-count">
              {index + 1} / {count}
            </span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
