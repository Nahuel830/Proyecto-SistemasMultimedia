import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import styles from './Reveal.module.css';

type Retardo = 1 | 2 | 3;

interface RevealProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly delay?: Retardo;
}

export function Reveal({ children, className, delay }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(
    () => typeof IntersectionObserver === 'undefined',
  );

  useEffect(() => {
    const nodo = ref.current;
    if (!nodo || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px' },
    );

    observer.observe(nodo);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={clsx(
        styles.reveal,
        visible && styles.visible,
        delay && styles[`delay${delay}`],
        className,
      )}
    >
      {children}
    </div>
  );
}
