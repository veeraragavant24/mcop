
import { useCallback, useEffect, useState } from 'react';
import { Calendar, ArrowRight, X, RefreshCw } from 'lucide-react';
import {
  getNewsEvents,
  type NewsEventItem,
} from '@/services/newsEventsApi';

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
        err instanceof Error
          ? err.message
          : 'Unable to load news and events.'
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

    if (Number.isNaN(parsed.getTime())) {
      return 'Date to be announced';
    }

    return parsed.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const getImageUrl = (
    item: NewsEventItem
  ): string | undefined => {
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

    return typeof value === 'string' && value.trim()
      ? value
      : undefined;
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingEvents = newsItems
    .filter((item) => {
      if (item.type?.trim().toLowerCase() !== 'event') {
        return false;
      }

      const eventDate = new Date(item.date);

      if (Number.isNaN(eventDate.getTime())) {
        return false;
      }

      eventDate.setHours(0, 0, 0, 0);
      return eventDate >= today;
    })
    .sort(
      (a, b) =>
        new Date(a.date).getTime() -
        new Date(b.date).getTime()
    );

  const renderImage = (
    item: NewsEventItem,
    className: string
  ) => {
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
      <div
        className={`${className} news-image-placeholder`}
        aria-label="No event image"
      >
        <Calendar size={30} />
        <span>Madha College</span>
      </div>
    );
  };

  return (
    <div className="news-page">
      {/* All News & Events CSS is included in this file */}
      <style>{`
        /* =========================================
           MADHA COLLEGE OF PHYSIOTHERAPY
           NEWS & EVENTS STYLES
        ========================================= */

        :root {
          --news-green: #103d2e;
          --news-green-dark: #082b20;
          --news-green-light: #137a66;
          --news-gold: #d8b54c;
          --news-gold-bright: #f1cf62;
          --news-gold-glow: rgba(216, 181, 76, 0.36);
          --news-text-muted: #65746d;
          --news-border: #e2eae5;
        }

        .news-page {
          position: relative;
          display: block;
          width: 100%;
          min-height: 400px;
          background: #fff;
          color: #17392f;
        }

        .news-container {
          width: min(1050px, 92%);
          margin: 0 auto;
        }

        /* PAGE HEADER */

        .news-page-header {
          padding: 65px 0;
          background: var(--news-green);
          color: #fff;
        }

        .news-eyebrow {
          margin: 0 0 12px;
          color: var(--news-gold-bright);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 2px;
        }

        .news-page-header h1 {
          margin: 0;
          font-size: clamp(32px, 5vw, 46px);
          font-weight: 700;
        }

        .news-header-description {
          max-width: 580px;
          margin: 15px 0 0;
          color: #d4e1da;
          font-size: 15px;
          line-height: 1.8;
        }

        .news-accent-line {
          width: 55px;
          height: 3px;
          margin-top: 16px;
          border-radius: 5px;
          background: var(--news-gold);
          box-shadow: 0 0 12px var(--news-gold-glow);
        }

        /* EVENTS SECTION */

        .news-section {
          padding: 48px 0 12px;
        }

        .news-section-heading {
          margin-bottom: 25px;
        }

        .news-section-heading h2 {
          margin: 0;
          color: var(--news-green);
          font-size: 28px;
          font-weight: 700;
        }

        .news-event-grid {
          display: grid;
          grid-template-columns:
            repeat(auto-fill, minmax(min(100%, 320px), 340px));
          justify-content: start;
          align-items: stretch;
          gap: 26px;
        }

        /* EVENT CARD */

        .news-event-card {
          position: relative;
          display: flex;
          width: 100%;
          min-width: 0;
          flex-direction: column;
          overflow: hidden;
          border: 1px solid rgba(216, 181, 76, 0.62);
          border-radius: 4px;
          background: #fff;
          box-shadow: 0 4px 14px rgba(16, 61, 46, 0.06);
          transition:
            transform 0.25s ease,
            border-color 0.25s ease,
            box-shadow 0.25s ease;
        }

        .news-event-card:hover {
          transform: translateY(-5px);
          border-color: #f1cf62;
          box-shadow:
            0 0 0 1px rgba(241, 207, 98, 0.72),
            0 0 18px rgba(216, 181, 76, 0.62),
            0 0 36px rgba(216, 181, 76, 0.32),
            0 12px 28px rgba(16, 61, 46, 0.12);
        }

        .news-event-card:focus-within {
          outline: 2px solid #d8b54c;
          outline-offset: 4px;
          box-shadow: 0 0 24px rgba(216, 181, 76, 0.5);
        }

        .news-event-image {
          display: block;
          width: 100%;
          height: 190px;
          flex: 0 0 190px;
          object-fit: cover;
          background: #f5f7f4;
        }

        .news-event-card-body {
          display: flex;
          flex: 1;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
          padding: 18px;
        }

        .news-event-date {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--news-green-light);
          font-size: 12px;
          font-weight: 700;
        }

        .news-event-date svg {
          flex: 0 0 auto;
        }

        .news-event-content {
          width: 100%;
          min-width: 0;
        }

        .news-event-content h3 {
          margin: 0 0 8px;
          color: var(--news-green);
          font-size: 19px;
          font-weight: 700;
          line-height: 1.45;
          overflow-wrap: anywhere;
        }

        .news-event-content p {
          margin: 0;
          color: var(--news-text-muted);
          font-size: 14px;
          line-height: 1.7;
          overflow-wrap: anywhere;
        }

        /* BUTTONS */

        .news-details-button {
          display: inline-flex;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 11px 15px;
          border: 1px solid var(--news-gold);
          border-radius: 3px;
          background: var(--news-gold);
          color: var(--news-green-dark);
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition:
            background 0.2s ease,
            box-shadow 0.2s ease;
        }

        .news-event-card .news-details-button {
          width: 100%;
          margin-top: auto;
        }

        .news-details-button:hover {
          background: #e6ca78;
          box-shadow: 0 0 14px rgba(216, 181, 76, 0.35);
        }

        .news-category {
          display: inline-block;
          padding: 6px 10px;
          border: 1px solid rgba(216, 181, 76, 0.5);
          border-radius: 3px;
          background: #fbf6e5;
          color: var(--news-green);
          font-size: 11px;
          font-weight: 700;
        }

        .news-text-button {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          margin-top: auto;
          padding: 0;
          border: 0;
          background: transparent;
          color: var(--news-green-light);
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
        }

        .news-text-button:hover {
          color: #b28b22;
          text-shadow: 0 0 10px rgba(216, 181, 76, 0.28);
        }

        /* LOADING, ERROR AND EMPTY STATES */

        .news-empty {
          padding: 24px;
          border: 1px solid var(--news-gold);
          border-radius: 3px;
          background: #fff;
          color: var(--news-text-muted);
          text-align: center;
          box-shadow: 0 0 14px rgba(216, 181, 76, 0.2);
        }

        .news-refresh-row {
          padding-bottom: 24px;
        }

        /* IMAGE PLACEHOLDER */

        .news-image-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: #7a8a81;
          background:
            linear-gradient(
              135deg,
              rgba(216, 181, 76, 0.12),
              rgba(16, 61, 46, 0.06)
            ),
            #f5f7f4;
          font-size: 12px;
          font-weight: 700;
        }

        /* DETAILS MODAL */

        .news-modal-overlay {
          position: fixed;
          z-index: 9999;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: rgba(5, 24, 18, 0.72);
        }

        .news-modal {
          position: relative;
          width: min(600px, 100%);
          max-height: 85vh;
          overflow-y: auto;
          padding: 28px;
          border: 1px solid var(--news-gold);
          border-radius: 6px;
          background: #fff;
          box-shadow:
            0 0 0 1px rgba(216, 181, 76, 0.3),
            0 0 26px rgba(216, 181, 76, 0.4);
        }

        .news-modal-image {
          display: block;
          width: 100%;
          max-height: 300px;
          margin-bottom: 20px;
          border-radius: 4px;
          object-fit: cover;
        }

        .news-modal-close {
          position: absolute;
          top: 12px;
          right: 12px;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border: 1px solid rgba(216, 181, 76, 0.4);
          border-radius: 3px;
          background: #fff;
          color: var(--news-green);
          cursor: pointer;
        }

        .news-modal h2 {
          margin: 16px 35px 10px 0;
          color: var(--news-green);
          font-size: 25px;
          line-height: 1.5;
        }

        .news-modal-date {
          display: flex;
          align-items: center;
          gap: 7px;
          color: var(--news-green-light);
          font-size: 13px;
          font-weight: 600;
        }

        .news-modal-content {
          margin: 22px 0;
          color: var(--news-text-muted);
          font-size: 15px;
          line-height: 1.9;
          white-space: pre-wrap;
          overflow-wrap: anywhere;
        }

        /* TABLET */

        @media (max-width: 900px) {
          .news-event-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 20px;
          }
        }

        /* MOBILE */

        @media (max-width: 560px) {
          .news-page-header {
            padding: 48px 0;
          }

          .news-section {
            padding-top: 34px;
          }

          .news-section-heading h2 {
            font-size: 24px;
          }

          .news-event-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .news-event-image {
            height: 220px;
            flex-basis: 220px;
          }

          .news-event-card-body {
            padding: 17px;
          }

          .news-modal {
            padding: 24px 18px;
          }
        }

        /* REDUCED MOTION ACCESSIBILITY */

        @media (prefers-reduced-motion: reduce) {
          .news-event-card {
            transition: none;
          }
        }
      `}</style>

      {/* PAGE HEADER */}
      <section className="news-page-header">
        <div className="news-container">
          <p className="news-eyebrow">
            MADHA COLLEGE OF PHYSIOTHERAPY
          </p>

          <h1>News &amp; Events</h1>

          <div className="news-accent-line" />

          <p className="news-header-description">
            Stay updated with the latest announcements and activities
            at our college.
          </p>
        </div>
      </section>

      {/* LOADING STATE */}
      {loading ? (
        <section className="news-section">
          <div className="news-container">
            <p className="news-empty">
              Loading news and events...
            </p>
          </div>
        </section>
      ) : error ? (
        /* ERROR STATE */
        <section className="news-section">
          <div className="news-container">
            <p className="news-empty" role="alert">
              {error}
            </p>

            <button
              className="news-details-button"
              type="button"
              onClick={() => void loadNewsEvents()}
            >
              <RefreshCw size={16} />
              Try Again
            </button>
          </div>
        </section>
      ) : (
        <>
          {/* UPCOMING EVENTS */}
          <section className="news-section">
            <div className="news-container">
              <div className="news-section-heading">
                <h2>Upcoming Events</h2>
                <div className="news-accent-line" />
              </div>

              {upcomingEvents.length === 0 ? (
                <p className="news-empty">
                  No upcoming events at the moment.
                </p>
              ) : (
                <div className="news-event-grid">
                  {upcomingEvents.map((item) => (
                    <article
                      className="news-event-card"
                      key={item.id}
                    >
                      {renderImage(item, 'news-event-image')}

                      <div className="news-event-card-body">
                        <div className="news-event-date">
                          <Calendar size={16} />
                          <span>{formatDate(item.date)}</span>
                        </div>

                        <span className="news-category">
                          {item.type}
                        </span>

                        <div className="news-event-content">
                          <h3>{item.title}</h3>
                          <p>{item.excerpt}</p>
                        </div>

                        <button
                          className="news-details-button"
                          type="button"
                          onClick={() => setSelected(item)}
                        >
                          View Details
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* REFRESH BUTTON */}
          <div className="news-container news-refresh-row">
            <button
              className="news-text-button"
              type="button"
              onClick={() => void loadNewsEvents()}
            >
              <RefreshCw size={16} />
              Refresh News &amp; Events
            </button>
          </div>
        </>
      )}

      {/* EVENT DETAILS MODAL */}
      {selected && (
        <div
          className="news-modal-overlay"
          onClick={() => setSelected(null)}
        >
          <section
            className="news-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="news-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="news-modal-close"
              type="button"
              aria-label="Close details"
              onClick={() => setSelected(null)}
            >
              <X size={22} />
            </button>

            {renderImage(selected, 'news-modal-image')}

            <span className="news-category">
              {selected.type}
            </span>

            <h2 id="news-modal-title">
              {selected.title}
            </h2>

            <p className="news-modal-date">
              <Calendar size={16} />
              {formatDate(selected.date)}
            </p>

            <p className="news-modal-content">
              {selected.content || selected.excerpt}
            </p>

            <button
              className="news-details-button"
              type="button"
              onClick={() => setSelected(null)}
            >
              Close
            </button>
          </section>
        </div>
      )}
    </div>
  );
}
