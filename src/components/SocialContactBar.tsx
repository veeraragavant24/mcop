import { useEffect, useState } from 'react';
import { Facebook, Instagram, Phone, Mail } from 'lucide-react';

type BgTheme = 'light' | 'dark';

const items = [
  { icon: Facebook, label: 'Facebook', href: 'https://facebook.com', external: true },
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com', external: true },
  { icon: Phone, label: 'Call us', href: 'tel:+910000000000', external: false },
  { icon: Mail, label: 'Email us', href: 'mailto:info@madhacollege.edu', external: false },
];

function useBgTheme(): BgTheme {
  const [theme, setTheme] = useState<BgTheme>('dark');

  useEffect(() => {
    let rafId = 0;

    const isNavbarElement = (el: HTMLElement): boolean => {
      if (!el) return false;
      if (el.tagName === 'NAV' || el.tagName === 'HEADER') return true;
      if (el.closest('nav') || el.closest('header')) return true;
      const cls = el.className;
      if (typeof cls === 'string' && (cls.includes('z-40') || cls.includes('z-50') || cls.includes('z-[60]'))) return true;
      return false;
    };

    const luminanceOf = (bg: string): number | null => {
      const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (!match) return null;
      const [, r, g, b] = match;
      return (parseInt(r) * 0.299 + parseInt(g) * 0.587 + parseInt(b) * 0.114) / 255;
    };

    const samplePoint = (x: number, y: number): 'light' | 'dark' | null => {
      const stack = document.elementsFromPoint(x, y) as HTMLElement[];
      if (!stack.length) return null;

      for (const el of stack) {
        if (!el || el === document.body) continue;
        if (isNavbarElement(el)) continue;
        if (el.tagName === 'IMG') continue;

        const style = window.getComputedStyle(el);
        const bgColor = style.backgroundColor;
        if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
          const lum = luminanceOf(bgColor);
          if (lum !== null) return lum > 0.55 ? 'light' : 'dark';
        }
      }

      const bodyBg = window.getComputedStyle(document.body).backgroundColor;
      const lum = luminanceOf(bodyBg);
      if (lum !== null) return lum > 0.55 ? 'light' : 'dark';
      return null;
    };

    const detectTheme = () => {
      // Sample at the contact bar's position (right side, vertically centered)
      const x = window.innerWidth - 40;
      const y = window.innerHeight / 2;

      const samples: ('light' | 'dark' | null)[] = [
        samplePoint(x, y - 30),
        samplePoint(x, y),
        samplePoint(x, y + 30),
      ];

      const valid = samples.filter((s): s is 'light' | 'dark' => s !== null);
      if (!valid.length) return;

      const lightCount = valid.filter((s) => s === 'light').length;
      const darkCount = valid.length - lightCount;
      setTheme(lightCount > darkCount ? 'light' : 'dark');
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(detectTheme);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    detectTheme();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return theme;
}

export default function SocialContactBar() {
  const bgTheme = useBgTheme();


return (
  <div className="fixed right-3 lg:right-4 top-1/2 -translate-y-1/2 z-[1000] hidden md:flex flex-col items-center gap-3">

    {/* Golden Apply Now button */}
    <button
  type="button"
  onClick={() => {
    window.dispatchEvent(
      new CustomEvent('open-admission-enquiry')
    );
  }}
  
className="apply-now-button w-12 h-36 lg:w-14 lg:h-40
           rounded-full bg-gold-500 text-forest-900
           flex items-center justify-center
           transition-all duration-300"

>
  <span className="-rotate-90 whitespace-nowrap text-sm font-bold">
    Apply Now
  </span>
  
</button>


    {/* Existing social and contact icons */}
    {items.map((item, i) => (
      <a
        key={i}
        href={item.href}
        {...(item.external
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
        className="group relative w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center bg-forest-700 hover:bg-gold-500 transition-all duration-300 hover:scale-110 hover:shadow-lg"
        aria-label={item.label}
        title={item.label}
      >
        <span
          className={`absolute inset-0 rounded-full border transition-colors duration-300 ${
            bgTheme === 'light'
              ? 'border-forest-700/30 group-hover:border-gold-500'
              : 'border-white/20 group-hover:border-gold-500'
          }`}
        />

        <item.icon
          className="relative w-6 h-6 lg:w-7 lg:h-7 text-white group-hover:text-forest-900 transition-colors duration-300"
          strokeWidth={2.2}
        />
      </a>
        ))}
    </div>
  );
}
