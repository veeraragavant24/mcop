export interface NewsEventItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  type: 'News' | 'Event' | string;
  imageUrl?: string | null;
  location?: string | null;
  isPublished?: boolean;
  isFeatured?: boolean;
}

const API_BASE_URL = '/api/news-events';

export async function getNewsEvents(): Promise<NewsEventItem[]> {
  const response = await fetch(API_BASE_URL);

  if (!response.ok) {
    throw new Error(`Unable to load news and events (HTTP ${response.status}).`);
  }

  return response.json();
}

export async function createNewsEvent(
  item: Omit<NewsEventItem, 'id'>
): Promise<NewsEventItem> {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || `Unable to create entry (HTTP ${response.status}).`);
  }

  return response.json();
}