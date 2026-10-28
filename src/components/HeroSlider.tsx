import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { heroSlides } from '@/data/content';
import Navbar from '@/components/Navbar';

interface HeroSliderProps {
  onEnquiryClick: () => void;
}

export default function HeroSlider({ onEnquiryClick }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % heroSlides.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + heroSlides.length) % heroSlides.length), []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="relative h-[100vh] min-h-[600px] max-h-[900px] overflow-hidden">
      {/* Slide images */}
      {heroSlides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className={`w-full h-full object-cover transition-transform duration-[7000ms] ${
              i === current ? 'scale-110' : 'scale-100'
            }`}
          />
        </div>
      ))}

      {/* Dark forest-green overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-forest-900/85 via-forest-900/40 to-forest-900/60 z-10" />
      <div className="absolute inset-0 bg-forest-900/20 z-10" />

      {/* Navbar overlay */}
      <div className="absolute top-0 left-0 w-full z-30">
        <Navbar onEnquiryClick={onEnquiryClick} />
      </div>

      {/* Hero heading — bottom-left */}

<div className="absolute bottom-32 left-20 right--50 z-20">
            <div className="container-mcp">
          {heroSlides.map((slide, i) => (
            <div
              key={i}
              className={`transition-all duration-700 ${
                i === current ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 absolute'
              }`}
            >
              {i === current && (
                <div className="max-w-2xl animate-fade-up">
                  
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-base md:text-xl text-gray-200 leading-relaxed mb-6 max-w-xl">
                    {slide.subtitle}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link to="/courses" className="btn-primary">
                      Explore Programs
                    </Link>
                    <Link
                      to="/about"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-white/60 text-white font-semibold rounded-lg transition-all duration-300 hover:bg-white hover:text-forest-700 active:scale-95"
                    >
                      About the College
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Slide indicators — bottom-left, below heading */}
      <div className="absolute bottom-6 left-20 z-20">
        <div className="container-mcp">
          <div className="flex items-center gap-2.5">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? 'w-8 h-8 bg-gold-500 border-2 border-gold-500'
                    : 'w-3 h-3 bg-white/40 border-2 border-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
              
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
