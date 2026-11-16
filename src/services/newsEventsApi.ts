export interface NewsEventItem {
  id: string;
  title: string;
  date: string;
  type: 'News' | 'Event';
  excerpt: string;
  content: string;
  imageUrl?: string;
  location?: string;
  isPublished?: boolean;
  isFeatured?: boolean;
}

export async function getNewsEvents(): Promise<NewsEventItem[]> {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5196'}/api/news-events`
  );

  if (!response.ok) {
    throw new Error('Unable to load news and events.');
  }

  return response.json();
}