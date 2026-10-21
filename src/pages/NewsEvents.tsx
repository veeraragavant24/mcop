import { useCallback, useEffect, useState } from 'react';
import { Calendar, ArrowRight, X, RefreshCw, MapPin } from 'lucide-react';
import {
  getNewsEvents,
  type NewsEventItem,
} from '@/services/newsEventsApi';
import './NewsEvents.css';

export default function NewsEvents() {
  const [selected, setSelected] = useState<NewsEventItem | null>(null);
  const [newsItems, setNewsItems] = useState<NewsEventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadNewsEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const items = await getNewsEvents();
      setNewsItems(Array.isArray(items) ? items : []);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : 'Unable to load news and events.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadNewsEvents();
  }, [loadNewsEvents]);

  const formatDate = (date: string) => {
    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return 'Date to be announced';

    return parsed.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const getImageUrl = (item: NewsEventItem): string | undefined => {
    // Supports imageUrl from the API as well as imageURL/imageUrl naming variations.
    const record = item as NewsEventItem & {
      imageUrl?: string | null;
      imageURL?: string | null;
      image?: string | null;
      ImageUrl?: string | null;
      imagePath?: string | null;
    };
    const value =
      record.imageUrl ??
      record.imageURL ??
      record.ImageUrl ??
      record.imagePath ??
      record.image;
    return typeof value === 'string' && value.trim() ? value : undefined;
  };

 
const today = new Date();
today.setHours(0, 0, 0, 0);

const upcomingEvents = newsItems
  .filter((item) => {
    if (item.isPublished === false) return false;

    const eventDate = new Date(item.date);
    if (Number.isNaN(eventDate.getTime())) return false;

    eventDate.setHours(0, 0, 0, 0);
    return eventDate >= today;
  })
  .sort(
    (a, b) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
  );


  const renderImage = (item: NewsEventItem, className: string) => {
    const imageUrl = getImageUrl(item);
    return imageUrl ? (
      <img
        className={className}
        src={imageUrl}
        alt={item.title}
        loading="lazy"
        onError={(event) => {
          event.currentTarget.style.display = 'none';
        }}
      />
    ) : (
      <div className={`${className} news-image-placeholder`} aria-label="No event image">
        <Calendar size={30} />
        <span>Madha College</span>
      </div>
    );
  };

  return (
    <div className="news-page">
      <section className="news-page-header">
        <div className="news-container">
          <p className="news-eyebrow">MADHA COLLEGE OF PHYSIOTHERAPY</p>
          <h1>News &amp; Events</h1>
          <div className="news-accent-line" />
          <p className="news-header-description">
            Stay updated with the latest announcements and activities at our college.
          </p>
        </div>
      </section>

      {loading ? (
        <section className="news-section">
          <div className="news-container"><p className="news-empty">Loading news and events...</p></div>
        </section>
      ) : error ? (
        <section className="news-section">
          <div className="news-container">
            <p className="news-empty" role="alert">{error}</p>
            <button className="news-details-button" type="button" onClick={() => void loadNewsEvents()}>
              <RefreshCw size={16} /> Try Again
            </button>
          </div>
        </section>
      ) : (
        <>
          <section className="news-section">
            <div className="news-container">
              <div className="news-section-heading">
                <h2>Upcoming Events</h2>
                <div className="news-accent-line" />
              </div>

              {upcomingEvents.length === 0 ? (
                <p className="news-empty">No upcoming events at the moment.</p>
              ) : (
                <div className="news-event-grid">
                  {upcomingEvents.map((item) => (
                    <article className="news-event-card" key={item.id}>
                      {renderImage(item, 'news-event-image')}
                      <div className="news-event-card-body">
                        <div className="news-event-date">
                          <Calendar size={16} />
                          <span>{formatDate(item.date)}</span>
                        </div>
                        <span className="news-category">{item.type}</span>
                        <div className="news-event-content">
                          <h3>{item.title}</h3>
                          <p>{item.excerpt}</p>
                        </div>
                        <button className="news-details-button" type="button" onClick={() => setSelected(item)}>
                          View Details <ArrowRight size={16} />
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>

          <div className="news-container news-refresh-row">
            <button className="news-text-button" type="button" onClick={() => void loadNewsEvents()}>
              <RefreshCw size={16} /> Refresh News &amp; Events
            </button>
          </div>
        </>
      )}

      {selected && (
        <div className="news-modal-overlay" onClick={() => setSelected(null)}>
          <section
            className="news-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="news-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button className="news-modal-close" type="button" aria-label="Close details" onClick={() => setSelected(null)}>
              <X size={22} />
            </button>
            {renderImage(selected, 'news-modal-image')}
            <span className="news-category">{selected.type}</span>
            <h2 id="news-modal-title">{selected.title}</h2>
            <p className="news-modal-date"><Calendar size={16} /> {formatDate(selected.date)}</p>
            <p className="news-modal-content">{selected.content || selected.excerpt}</p>
            <button className="news-details-button" type="button" onClick={() => setSelected(null)}>Close</button>
          </section>
        </div>
      )}
    </div>
  );
}
