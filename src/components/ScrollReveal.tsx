
import type { ReactNode, CSSProperties } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

type Direction =
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'scale'
  | 'fade';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'li' | 'span';
}

const directionClasses: Record<Direction, string> = {
  up: 'reveal-up',
  down: 'reveal-down',
  left: 'reveal-left',
  right: 'reveal-right',
  scale: 'reveal-scale',
  fade: 'reveal-fade',
};

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  className = '',
  as: Tag = 'div',
}: ScrollRevealProps) {
  const { ref, visible } = useScrollReveal<HTMLElement>();

  const style: CSSProperties = {
    transitionDelay: `${delay}ms`,
    willChange: visible ? 'auto' : 'transform, opacity, filter',
  };

  return (
    <Tag
      ref={ref as never}
      className={[
        'premium-reveal',
        directionClasses[direction],
        visible ? 'reveal-visible' : '',
        className,
      ].filter(Boolean).join(' ')}
      style={style}
    >
      {children}
    </Tag>
  );
}
