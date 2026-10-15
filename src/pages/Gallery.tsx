import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import SectionTitle from '@/components/SectionTitle';
import { galleryItems, galleryCategories } from '@/data/content';

export default function Gallery() {
  const [filter, setFilter] = useState<string>('All');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = filter === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === filter);

  return (
    <div>
      <PageHeader
        title="Gallery"
        subtitle="A visual journey through campus life, training facilities, clinical practice, and academic events at Madha College of Physiotherapy."
        image="https://images.pexels.com/photos/28463480/pexels-photo-28463480.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
        breadcrumbs={[{ label: 'Gallery' }]}
      />

      <section className="section-padding bg-white">
        <div className="container-mcp">
          <SectionTitle
            eyebrow="Campus Life"
            title="Photo Gallery"
            description="Explore moments from our classrooms, laboratories, clinical training sessions, events, and student activities."
          />

          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
                  filter === cat
                    ? 'bg-forest-700 text-white shadow-lg'
                    : 'bg-forest-50 text-forest-700 hover:bg-forest-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((item) => (
              <button
                key={item.id}
                onClick={() => setLightbox(item.id)}
                className="group relative rounded-xl overflow-hidden aspect-[4/3] shadow-sm hover:shadow-2xl transition-all duration-300"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-900/80 via-forest-900/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
                <div className="absolute inset-0 flex flex-col justify-end p-4 text-left">
                  <span className="text-xs text-gold-400 font-semibold uppercase tracking-wide mb-1">
                    {item.category}
                  </span>
                  <p className="text-white text-sm font-semibold leading-snug">{item.title}</p>
                </div>
                <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4 text-white" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-forest-900/95 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/40 transition-colors z-10"
            onClick={() => setLightbox(null)}
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-4xl max-h-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={galleryItems.find((g) => g.id === lightbox)?.image}
              alt={galleryItems.find((g) => g.id === lightbox)?.title}
              className="max-w-full max-h-[80vh] rounded-xl object-contain mx-auto"
            />
            <div className="text-center mt-4">
              <span className="text-gold-400 text-sm font-semibold uppercase tracking-wide">
                {galleryItems.find((g) => g.id === lightbox)?.category}
              </span>
              <p className="text-white text-lg font-semibold mt-1">
                {galleryItems.find((g) => g.id === lightbox)?.title}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
