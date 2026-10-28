import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

type HeaderTheme = 'light' | 'dark';

export function useHeaderTheme(): [HeaderTheme, boolean] {
  const [theme, setTheme] = useState<HeaderTheme>('dark');
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let frame = 0;

    const getLuminance = (color: string): number | null => {
      const match = color.match(
        /rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/
      );

      if (!match) return null;

      return (
        Number(match[1]) * 0.299 +
        Number(match[2]) * 0.587 +
        Number(match[3]) * 0.114
      ) / 255;
    };

    const detectTheme = () => {
      const y = Math.min(35, window.innerHeight - 1);
      const xPositions = [
        window.innerWidth * 0.25,
        window.innerWidth * 0.5,
        window.innerWidth * 0.75,
      ];

      const detected: HeaderTheme[] = [];

      for (const x of xPositions) {
        const elements = document.elementsFromPoint(x, y);

        for (const element of elements) {
          const el = element as HTMLElement;

          if (
            el === document.body ||
            el === document.documentElement ||
            el.closest('header') ||
            el.closest('nav')
          ) {
            continue;
          }

          const style = window.getComputedStyle(el);

          // Dark gradient overlays, commonly used on hero images.
          if (
            style.backgroundImage !== 'none' &&
            style.backgroundImage.includes('gradient')
          ) {
            detected.push('dark');
            break;
          }

          const background = style.backgroundColor;

          if (
            !background ||
            background === 'transparent' ||
            background === 'rgba(0, 0, 0, 0)'
          ) {
            continue;
          }

          const luminance = getLuminance(background);

          if (luminance !== null) {
            detected.push(luminance > 0.55 ? 'light' : 'dark');
            break;
          }
        }
      }

      if (detected.length > 0) {
        const lightCount = detected.filter(
          (value) => value === 'light'
        ).length;

        setTheme(
          lightCount > detected.length / 2 ? 'light' : 'dark'
        );
      }
    };

    const update = () => {
      setScrolled(window.scrollY > 20);
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(detectTheme);
    };

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    update();

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      cancelAnimationFrame(frame);
    };
  }, [location.pathname]);

  return [theme, scrolled];
}