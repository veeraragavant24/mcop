
import { useEffect, useState } from "react";
import { ArrowRight, CalendarDays, Radio, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./NewsEventsLiveCard.css";

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
  if (event.isPublished === false || !event.date) {
    return false;
  }

  const eventDate = new Date(event.date);

  if (Number.isNaN(eventDate.getTime())) {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  eventDate.setHours(0, 0, 0, 0);

  return eventDate >= today;
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

    // Refresh the latest events every minute.
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

  if (loading) {
    return null;
  }

  if (!isCardVisible) {
    return null;
  }

  // No upcoming events: show the waiting message.
  if (events.length === 0) {
    return (
      <aside
        className="news-live-card news-live-card--empty"
        aria-label="Live college news and events"
      >
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
