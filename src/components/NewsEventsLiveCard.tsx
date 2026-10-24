
import { useEffect, useState } from "react";
import { ArrowRight, CalendarDays, Radio, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface NewsEvent {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  type: string;
  imageUrl?: string | null;
  location?: string | null;
  isPublished?: boolean;
}

const API_URL = "/api/news-events";

function isUpcomingEvent(event: NewsEvent): boolean {
  if (event.isPublished === false || !event.date) return false;

  const eventDate = new Date(event.date);
  if (Number.isNaN(eventDate.getTime())) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  eventDate.setHours(0, 0, 0, 0);

  return eventDate >= today;
}

function NewsEventsLiveCardStyles() {
  return (
    <style>{`
      @property --news-angle {
        syntax: "<angle>";
        initial-value: 0deg;
        inherits: false;
      }

      .news-live-card {
        position: absolute;
        right: clamp(300px, 24vw, 380px);
        bottom: 165px;
        z-index: 1000;
        width: 320px;
        height: 285px;
        box-sizing: border-box;
        padding: 10px;
        overflow: hidden;
        border: 1px solid rgba(255, 204, 75, 0.85);
        border-radius: 13px;
        color: #f8fafc;
        background: linear-gradient(
          135deg,
          rgba(0, 65, 48, 0.92),
          rgba(0, 39, 34, 0.96)
        );
        -webkit-backdrop-filter: blur(5px);
        backdrop-filter: blur(5px);
        box-shadow:
          0 0 8px rgba(255, 196, 50, 0.35),
          0 0 18px rgba(255, 196, 50, 0.18),
          inset 0 0 10px rgba(255, 212, 93, 0.04);
        isolation: isolate;
        animation: news-live-golden-glow 2.5s ease-in-out infinite;
      }

      .news-live-card__shine {
        position: absolute;
        inset: 0;
        z-index: 2;
        padding: 1.5px;
        border-radius: inherit;
        pointer-events: none;
        background: conic-gradient(
          from var(--news-angle, 0deg),
          transparent 0deg,
          transparent 245deg,
          rgba(255, 190, 35, 0.15) 275deg,
          #ffca42 300deg,
          #fff4b0 315deg,
          #ffffff 322deg,
          #ffca42 333deg,
          transparent 350deg,
          transparent 360deg
        );
        animation: news-live-orbit 3s linear infinite;
        -webkit-mask:
          linear-gradient(#000 0 0) content-box,
          linear-gradient(#000 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
      }

      @keyframes news-live-orbit {
        to { --news-angle: 360deg; }
      }

      @keyframes news-live-golden-glow {
        0%, 100% {
          box-shadow:
            0 0 7px rgba(255, 196, 50, 0.35),
            0 0 16px rgba(255, 196, 50, 0.15);
        }
        50% {
          box-shadow:
            0 0 10px rgba(255, 205, 65, 0.65),
            0 0 22px rgba(255, 196, 50, 0.3);
        }
      }

      .news-live-card__header,
      .news-live-card__footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }

      .news-live-card__header { margin-bottom: 8px; }

      .news-live-card__live {
        display: flex;
        align-items: center;
        gap: 5px;
        color: #ffd45d;
        font-size: 9px;
        font-weight: 800;
        letter-spacing: 0.7px;
      }

      .news-live-card__live svg {
        flex-shrink: 0;
        color: #29e59a;
        animation: news-live-pulse 1.6s ease-in-out infinite;
      }

      .news-live-card__counter {
        color: #d5e8df;
        font-size: 9px;
        white-space: nowrap;
      }

      .news-live-card__content {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        width: 100%;
        min-width: 0;
        animation: news-live-appear 0.45s ease;
      }

      .news-live-card__image {
        display: block;
        width: 100%;
        height: 105px;
        flex-shrink: 0;
        object-fit: cover;
        object-position: center;
        border-radius: 8px;
        border: 1px solid rgba(255, 209, 86, 0.45);
        box-sizing: border-box;
      }

      .news-live-card__meta {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 5px;
        width: 100%;
        margin-top: 7px;
        margin-bottom: 6px;
      }

      .news-live-card__category {
        display: inline-flex;
        align-items: center;
        padding: 3px 7px;
        border-radius: 20px;
        color: #063b2b;
        background: #35d69a;
        font-size: 7px;
        font-weight: 800;
        letter-spacing: 0.2px;
      }

      .news-live-card__date {
        display: flex;
        align-items: center;
        gap: 3px;
        color: #ffd45d;
        font-size: 9px;
        font-weight: 700;
      }

      .news-live-card__date svg { flex-shrink: 0; }

      .news-live-card__text {
        display: block;
        width: 100%;
        min-width: 0;
      }

      .news-live-card__text h3 {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        margin: 0 0 4px;
        overflow: hidden;
        color: #fff;
        font-size: 11px;
        line-height: 1.35;
        font-weight: 700;
      }

      .news-live-card__text p {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        margin: 0;
        overflow: hidden;
        color: #e0ebe6;
        font-size: 9px;
        line-height: 1.4;
      }

      .news-live-card__footer {
        margin-top: 8px;
        padding-top: 7px;
        border-top: 1px solid rgba(255, 212, 93, 0.25);
      }

      .news-live-card__dots {
        display: flex;
        align-items: center;
        gap: 5px;
      }

      .news-live-card__dot {
        width: 6px;
        height: 6px;
        flex-shrink: 0;
        padding: 0;
        border: 1px solid #c7d8d0;
        border-radius: 50%;
        background: transparent;
        cursor: pointer;
      }

      .news-live-card__dot.is-active {
        width: 14px;
        border-color: #ffd45d;
        border-radius: 5px;
        background: #ffd45d;
      }

      .news-live-card__details {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        flex-shrink: 0;
        padding: 6px 8px;
        border: 1px solid #ffd45d;
        border-radius: 6px;
        color: #092f24;
        background: linear-gradient(135deg, #ffdf79, #e9b72e);
        font-size: 9px;
        font-weight: 800;
        cursor: pointer;
      }

      .news-live-card__details:hover {
        transform: translateY(-1px);
        box-shadow: 0 0 10px rgba(255, 204, 75, 0.5);
      }

      .news-live-card__close { display: none; }

      @media (min-width: 1024px) and (max-width: 1439px) {
        .news-live-card {
          right: 270px;
          bottom: 135px;
          width: 285px;
          height: 265px;
          padding: 9px;
        }

        .news-live-card__image { height: 90px; }
      }

      @media (min-width: 601px) and (max-width: 1023px) {
        .news-live-card {
          right: 80px;
          bottom: 90px;
          width: 245px;
          height: 235px;
          padding: 8px;
        }

        .news-live-card__image { height: 75px; }

        .news-live-card__header {
          margin-bottom: 6px;
          padding-right: 24px;
        }

        .news-live-card__footer {
          margin-top: 6px;
          padding-top: 5px;
        }
      }

      @media (max-width: 600px) {
        .news-live-card {
          right: 10px;
          bottom: 90px;
          left: auto;
          width: min(190px, calc(100vw - 32px));
          height: 158px;
          min-height: 0;
          padding: 6px;
        }

        .news-live-card__header {
          margin-bottom: 4px;
          gap: 4px;
          padding-right: 24px;
        }

        .news-live-card__live {
          gap: 3px;
          font-size: 7px;
          letter-spacing: 0.3px;
        }

        .news-live-card__live svg {
          width: 10px;
          height: 10px;
        }

        .news-live-card__counter { font-size: 7px; }
        .news-live-card__image { height: 48px; }

        .news-live-card__meta {
          margin-top: 4px;
          margin-bottom: 3px;
          gap: 3px;
        }

        .news-live-card__category {
          padding: 2px 5px;
          font-size: 6px;
        }

        .news-live-card__date {
          gap: 2px;
          font-size: 7px;
        }

        .news-live-card__date svg {
          width: 9px;
          height: 9px;
        }

        .news-live-card__text h3 {
          margin-bottom: 2px;
          font-size: 9px;
          line-height: 1.2;
        }

        .news-live-card__text p {
          font-size: 7px;
          line-height: 1.2;
        }

        .news-live-card__footer {
          margin-top: 4px;
          padding-top: 4px;
          gap: 4px;
        }

        .news-live-card__dots { gap: 3px; }

        .news-live-card__dot {
          width: 5px;
          height: 5px;
        }

        .news-live-card__dot.is-active { width: 10px; }

        .news-live-card__details {
          gap: 3px;
          padding: 4px 5px;
          font-size: 7px;
        }

        .news-live-card__details svg {
          width: 10px;
          height: 10px;
        }
      }

      @media (max-width: 1023px) {
        .news-live-card__close {
          position: absolute;
          top: 5px;
          right: 5px;
          z-index: 5;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 23px;
          height: 23px;
          padding: 0;
          border: 1px solid rgba(255, 212, 93, 0.7);
          border-radius: 50%;
          background: rgba(0, 39, 34, 0.95);
          color: #fff;
          cursor: pointer;
        }

        .news-live-card__close:hover {
          background: #e9b72e;
          color: #092f24;
        }
      }

      @keyframes news-live-pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.45; }
      }

      @keyframes news-live-appear {
        from {
          opacity: 0;
          transform: translateY(4px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .news-live-card,
        .news-live-card__shine,
        .news-live-card__live svg,
        .news-live-card__content {
          animation: none;
        }
      }

      .news-live-card--empty {
        display: flex;
        flex-direction: column;
      }

      .news-live-card__empty-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
        padding: 12px;
        text-align: center;
        color: #ffd45d;
      }

      .news-live-card__empty-content h3 {
        margin: 0;
        color: #fff;
        font-size: 13px;
        font-weight: 800;
        letter-spacing: 0.7px;
      }

      .news-live-card__empty-content p {
        margin: 0;
        color: #e0ebe6;
        font-size: 11px;
        line-height: 1.5;
      }
    `}</style>
  );
}

export default function NewsEventsLiveCard() {
  const [events, setEvents] = useState<NewsEvent[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isCardVisible, setIsCardVisible] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    const loadEvents = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Unable to load news and events");
        }

        const data: NewsEvent[] = await response.json();

        if (!cancelled) {
          const upcoming = data
            .filter(isUpcomingEvent)
            .sort(
              (a, b) =>
                new Date(a.date).getTime() -
                new Date(b.date).getTime()
            );

          setEvents(upcoming);
          setActiveIndex(0);
        }
      } catch (error) {
        console.error("News and events loading failed:", error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadEvents();

    const refreshTimer = window.setInterval(loadEvents, 60000);

    return () => {
      cancelled = true;
      window.clearInterval(refreshTimer);
    };
  }, []);

  useEffect(() => {
    if (events.length < 2) return;

    const slideTimer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % events.length);
    }, 5000);

    return () => window.clearInterval(slideTimer);
  }, [events.length]);

  const activeEvent = events[activeIndex];

  const formatDate = (date: string) => {
    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) return "NEW";

    return parsed
      .toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      })
      .toUpperCase();
  };

  const openDetails = () => {
    if (!activeEvent) return;

    navigate("/news-events", {
      state: { eventId: activeEvent.id },
    });
  };

  if (loading || !isCardVisible) {
    return null;
  }

  if (events.length === 0) {
    return (
      <aside
        className="news-live-card news-live-card--empty"
        aria-label="Live college news and events"
      >
        <NewsEventsLiveCardStyles />

        <button
          type="button"
          className="news-live-card__close"
          onClick={() => setIsCardVisible(false)}
          aria-label="Close live updates"
          title="Close"
        >
          <X size={14} />
        </button>

        <div className="news-live-card__shine" />

        <div className="news-live-card__header">
          <div className="news-live-card__live">
            <Radio size={13} />
            <span>LIVE UPDATES</span>
          </div>
        </div>

        <div className="news-live-card__empty-content">
          <CalendarDays size={28} />
          <h3>WAITING FOR UPDATES</h3>
          <p>Stay tuned for upcoming college events and announcements.</p>
        </div>
      </aside>
    );
  }

  return (
    <aside
      className="news-live-card"
      aria-label="Live college news and events"
    >
      <NewsEventsLiveCardStyles />

      <button
        type="button"
        className="news-live-card__close"
        onClick={() => setIsCardVisible(false)}
        aria-label="Close live updates"
        title="Close"
      >
        <X size={14} />
      </button>

      <div className="news-live-card__shine" />

      <div className="news-live-card__header">
        <div className="news-live-card__live">
          <Radio size={13} />
          <span>LIVE UPDATES</span>
        </div>

        <span className="news-live-card__counter">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(events.length).padStart(2, "0")}
        </span>
      </div>

      <div className="news-live-card__content" key={activeEvent.id}>
        {activeEvent.imageUrl && (
          <img
            className="news-live-card__image"
            src={activeEvent.imageUrl}
            alt=""
          />
        )}

        <div className="news-live-card__text">
          <div className="news-live-card__meta">
            <span className="news-live-card__category">
              {activeEvent.type === "Event"
                ? "CAMPUS EVENT"
                : "ANNOUNCEMENT"}
            </span>

            <span className="news-live-card__date">
              <CalendarDays size={12} />
              {formatDate(activeEvent.date)}
            </span>
          </div>

          <h3>{activeEvent.title}</h3>
          <p>{activeEvent.excerpt || activeEvent.content}</p>
        </div>
      </div>

      <div className="news-live-card__footer">
        <div className="news-live-card__dots">
          {events.slice(0, 5).map((event, index) => (
            <button
              key={event.id}
              type="button"
              className={
                index === activeIndex
                  ? "news-live-card__dot is-active"
                  : "news-live-card__dot"
              }
              aria-label={`Show update ${index + 1}`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>

        <button
          type="button"
          className="news-live-card__details"
          onClick={openDetails}
        >
          View Details
          <ArrowRight size={14} />
        </button>
      </div>
    </aside>
  );
}
