import { useCallback, useEffect, useMemo, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import {
  Plus, Pencil, Trash2, X, CalendarDays, Newspaper, RefreshCw,
  Search, ImagePlus, Upload, MapPin, Eye, EyeOff, Star, CheckCircle2,
} from 'lucide-react';
import { getNewsEvents, createNewsEvent, type NewsEventItem } from '@/services/newsEventsApi';

type NewsType = 'News' | 'Event';
type NewsForm = Omit<NewsEventItem, 'id'> & { imageUrl?: string; location?: string; isPublished?: boolean; isFeatured?: boolean };
const API_BASE_URL = '/api/news-events';
const emptyForm: NewsForm = {
  title: '', date: '', type: 'News', excerpt: '', content: '',
  imageUrl: '', location: '', isPublished: true, isFeatured: false,
};

function dateInput(value?: string) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value.slice(0, 10);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
function dateLabel(value?: string) {
  if (!value) return '—';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString('en-CA');
}
function isUpcoming(value?: string) {
  if (!value) return false;
  const date = new Date(value);
  const today = new Date(); today.setHours(0, 0, 0, 0);
  return !Number.isNaN(date.getTime()) && date >= today;
}
async function updateNewsEvent(id: string, item: NewsForm): Promise<NewsEventItem> {
  const response = await fetch(`${API_BASE_URL}/${encodeURIComponent(id)}`, {
    method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(item),
  });
  if (!response.ok) throw new Error((await response.text().catch(() => '')) || `Unable to update entry (HTTP ${response.status}).`);
  if (response.status === 204) return { ...item, id } as NewsEventItem;
  return response.json();
}
async function deleteNewsEvent(id: string) {
  const response = await fetch(`${API_BASE_URL}/${encodeURIComponent(id)}`, { method: 'DELETE' });
  if (!response.ok) throw new Error((await response.text().catch(() => '')) || `Unable to delete entry (HTTP ${response.status}).`);
}
async function uploadEventImage(file: File): Promise<string> {
  const body = new FormData();
  body.append('file', file);

  const response = await fetch(`${API_BASE_URL}/upload-image`, {
    method: 'POST',
    body,
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    throw new Error(
      errorText || `Image upload failed (HTTP ${response.status}).`
    );
  }

  const data = await response.json();

  if (!data.imageUrl) {
    throw new Error('The upload response did not contain imageUrl.');
  }

  return data.imageUrl as string;
}

export default function AdminNewsEvents() {
  const [items, setItems] = useState<NewsEventItem[]>([]);
  const [form, setForm] = useState<NewsForm>({ ...emptyForm });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All statuses');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadItems = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const data = await getNewsEvents();
      setItems([...data].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load news and events from the server.');
    } finally { setLoading(false); }
  }, []);
  useEffect(() => { void loadItems(); }, [loadItems]);

  const openAddForm = () => {
    setEditingId(null); setForm({ ...emptyForm }); setError(''); setMessage(''); setFormOpen(true);
  };
  const openEditForm = (item: NewsEventItem) => {
    const extended = item as NewsEventItem & { imageUrl?: string; location?: string; isPublished?: boolean; isFeatured?: boolean };
    setEditingId(item.id);
    setForm({
      title: item.title, date: dateInput(item.date),
      type: item.type?.toLowerCase() === 'event' ? 'Event' : 'News',
      excerpt: item.excerpt ?? '', content: item.content ?? '',
      imageUrl: extended.imageUrl ?? '', location: extended.location ?? '',
      isPublished: extended.isPublished ?? true, isFeatured: extended.isFeatured ?? false,
    });
    setError(''); setMessage(''); setFormOpen(true);
  };
  const handleImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/jpg'].includes(file.type)) {
      setError('Choose a JPG, JPEG, PNG, or WEBP image.'); return;
    }
    if (file.size > 20 * 1024 * 1024) { setError('Image size must be 20 MB or less.'); return; }
    setError(''); setUploading(true);
    try {
      const imageUrl = await uploadEventImage(file);
      setForm(current => ({ ...current, imageUrl }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to upload image.');
    } finally { setUploading(false); }
  };
  const saveItem = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setSaving(true); setError(''); setMessage('');
    const payload: NewsForm = {
      title: form.title.trim(), date: form.date, type: form.type,
      excerpt: form.excerpt.trim(), content: form.content.trim(),
      imageUrl: form.imageUrl || '', location: (form.location ?? '').trim(),
      isPublished: Boolean(form.isPublished), isFeatured: Boolean(form.isFeatured),
    };
    try {
      if (editingId !== null) {
        await updateNewsEvent(editingId, payload);
        setMessage('News or event updated successfully.');
      } else {
        await createNewsEvent(payload);
        setMessage('News or event saved successfully.');
      }
      setFormOpen(false); setForm({ ...emptyForm }); setEditingId(null); await loadItems();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save the news or event. Please try again.');
    } finally { setSaving(false); }
  };
  const deleteItem = async (item: NewsEventItem) => {
    if (!window.confirm(`Delete "${item.title}"? This cannot be undone.`)) return;
    setDeletingId(item.id); setError(''); setMessage('');
    try { await deleteNewsEvent(item.id); setMessage('Entry deleted successfully.'); await loadItems(); }
    catch (err) { setError(err instanceof Error ? err.message : 'Unable to delete this entry.'); }
    finally { setDeletingId(null); }
  };

  const extendedItems = items as (NewsEventItem & { imageUrl?: string; location?: string; isPublished?: boolean; isFeatured?: boolean })[];
  const upcomingCount = items.filter(item => isUpcoming(item.date)).length;
  const expiredCount = items.length - upcomingCount;
  const publishedCount = extendedItems.filter(item => item.isPublished !== false).length;
  const draftsCount = items.length - publishedCount;
  const filteredItems = useMemo(() => extendedItems.filter(item => {
    const text = `${item.title} ${item.excerpt} ${item.type} ${item.location ?? ''}`.toLowerCase();
    const matchesSearch = text.includes(search.toLowerCase());
    const upcoming = isUpcoming(item.date);
    const published = item.isPublished !== false;
    const matchesStatus = statusFilter === 'All statuses'
      || (statusFilter === 'Published' && published)
      || (statusFilter === 'Drafts' && !published)
      || (statusFilter === 'Upcoming' && upcoming)
      || (statusFilter === 'Expired' && !upcoming);
    return matchesSearch && matchesStatus;
  }), [extendedItems, search, statusFilter]);

  return (
    <main className="min-h-screen bg-[#f7f8f5] px-4 py-7 text-[#0d3b2e] sm:px-7 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <header className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-[.2em] text-[#dcb53f]">Madha College of Physiotherapy</p>
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">NEWS &amp; EVENTS <span className="text-[#dcb53f]">ADMIN</span></h1>
            <p className="mt-2 text-sm text-slate-500">Manage campus news, announcements and upcoming events.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => void loadItems()} disabled={loading} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold shadow-sm transition hover:bg-slate-50 disabled:opacity-50">
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} /> Refresh
            </button>
            <button onClick={openAddForm} className="inline-flex items-center gap-2 rounded-xl bg-[#0d3b2e] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-amber-500/20 transition hover:bg-[#174c3b]">
              <Plus size={18} /> Add New
            </button>
          </div>
        </header>

        {message && <div className="mb-5 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800"><CheckCircle2 size={17} />{message}</div>}
        {error && !formOpen && <div role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}

        <section className="mb-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {[
            { label: 'Total', value: items.length },
            { label: 'Upcoming', value: upcomingCount },
            { label: 'Expired', value: expiredCount },
            { label: 'Published', value: publishedCount },
            { label: 'Drafts', value: draftsCount },
          ].map(card => <div key={card.label} className="rounded-2xl border border-white bg-white p-5 shadow-[0_8px_24px_rgba(9,36,73,.05)]">
            <p className="text-[11px] font-bold uppercase tracking-[.14em] text-slate-500">{card.label}</p>
            <p className="mt-2 text-3xl font-extrabold text-[#0d3b2e]">{card.value}</p>
          </div>)}
        </section>

        <div className="mb-3">
          <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-400 shadow-sm">
            <Search size={18} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search news and events..." className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400" />
          </label>
        </div>
        <div className="mb-5">
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-[#dcb53f]">
            <option>All statuses</option><option>Published</option><option>Drafts</option><option>Upcoming</option><option>Expired</option>
          </select>
        </div>

        <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_10px_32px_rgba(9,36,73,.06)]">
          <div className="hidden grid-cols-[80px_minmax(180px,1.7fr)_130px_minmax(100px,1fr)_130px_190px] gap-4 border-b border-slate-200 bg-slate-50/80 px-5 py-4 text-[10px] font-extrabold uppercase tracking-[.16em] text-slate-500 lg:grid">
            <span>Image</span><span>Title / Category</span><span>Date</span><span>Location</span><span>Status</span><span>Actions</span>
          </div>
          {loading ? <div className="px-6 py-16 text-center text-sm text-slate-500">Loading saved news and events...</div>
          : filteredItems.length === 0 ? <div className="px-6 py-16 text-center"><Newspaper size={38} className="mx-auto mb-3 text-slate-300" /><p className="font-bold">No news or events found</p><p className="mt-1 text-sm text-slate-500">Try changing your search or add a new entry.</p></div>
          : <div className="divide-y divide-slate-100">
            {filteredItems.map(item => <article key={item.id} className="grid gap-4 px-5 py-4 lg:grid-cols-[80px_minmax(180px,1.7fr)_130px_minmax(100px,1fr)_130px_190px] lg:items-center lg:gap-4">
              <div className="h-14 w-20 overflow-hidden rounded-xl bg-slate-100">
                {item.imageUrl ? <img src={item.imageUrl} alt="" className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-slate-300"><ImagePlus size={24} /></div>}
              </div>
              <div className="min-w-0">
                <p className="truncate font-bold text-[#0d3b2e]">{item.title}</p>
                <p className="mt-1 text-xs text-slate-500">{item.type === 'Event' ? 'College Event' : 'News / Announcement'}{item.isFeatured ? ' · Featured' : ''}</p>
                <p className="mt-1 line-clamp-1 text-xs text-slate-500 lg:hidden">{item.excerpt}</p>
              </div>
              <p className="text-sm font-medium text-slate-600">{dateLabel(item.date)}</p>
              <p className="flex items-center gap-1 text-sm text-slate-600"><MapPin size={14} className="shrink-0 text-slate-400" />{item.location || '—'}</p>
              <div className="flex flex-wrap gap-1.5">
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase ${item.isPublished === false ? 'bg-slate-100 text-slate-600' : 'bg-emerald-100 text-emerald-700'}`}>{item.isPublished === false ? 'Draft' : 'Published'}</span>
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase ${isUpcoming(item.date) ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>{isUpcoming(item.date) ? 'Upcoming' : 'Expired'}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => openEditForm(item)} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold hover:bg-slate-50">Edit</button>
                <button onClick={() => void deleteItem(item)} disabled={deletingId === item.id} className="rounded-lg border border-red-200 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 disabled:opacity-50">{deletingId === item.id ? 'Deleting…' : 'Delete'}</button>
              </div>
            </article>)}
          </div>}
        </section>
      </div>

      {formOpen && <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[#06172e]/65 p-3 backdrop-blur-[2px] sm:items-center sm:p-6">
        <section role="dialog" aria-modal="true" aria-labelledby="news-modal-title" className="my-3 w-full max-w-[580px] overflow-hidden rounded-2xl border border-[#DCB53F] bg-white shadow-[0_0_0_1px_rgba(220,181,63,0.95),0_0_12px_rgba(220,181,63,0.75),0_0_28px_rgba(220,181,63,0.48),0_0_48px_rgba(220,181,63,0.22)] sm:my-4">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3 sm:px-5">
            <div><p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#dcb53f]">{editingId ? 'Manage entry' : 'Create new entry'}</p><h2 id="news-modal-title" className="mt-1 text-xl font-extrabold text-[#0d3b2e]">{editingId ? 'Edit News / Event' : 'Add News / Event'}</h2></div>
            <button type="button" onClick={() => setFormOpen(false)} aria-label="Close form" className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100"><X size={21} /></button>
          </div>
          <form onSubmit={saveItem} className="space-y-3 px-5 py-4 sm:px-5">
            {error && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}
            <div><label htmlFor="news-title" className="mb-1.5 block text-[11px] font-extrabold uppercase tracking-wider text-[#174c3b]">Title *</label><input id="news-title" required maxLength={200} value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Enter news or event title" className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-[#dcb53f] focus:ring-4 focus:ring-amber-500/10" /></div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div><label htmlFor="news-type" className="mb-1.5 block text-[11px] font-extrabold uppercase tracking-wider text-[#174c3b]">Category *</label><select id="news-type" value={form.type} onChange={e => setForm({ ...form, type: e.target.value as NewsType })} className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-[#dcb53f]"><option value="News">News / Announcement</option><option value="Event">College Event</option></select></div>
              <div><label htmlFor="news-date" className="mb-1.5 block text-[11px] font-extrabold uppercase tracking-wider text-[#174c3b]">Date *</label><input id="news-date" type="date" required value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-[#dcb53f]" /></div>
            </div>
            <div><label htmlFor="news-excerpt" className="mb-1.5 block text-[11px] font-extrabold uppercase tracking-wider text-[#174c3b]">Short Description *</label><textarea id="news-excerpt" required maxLength={500} rows={2} value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} placeholder="Write a short summary" className="w-full resize-y rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm outline-none focus:border-[#dcb53f]" /></div>
            <div><label htmlFor="news-content" className="mb-1.5 block text-[11px] font-extrabold uppercase tracking-wider text-[#174c3b]">Full Details *</label><textarea id="news-content" required rows={3} value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} placeholder="Write the full news or event details" className="w-full resize-y rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm outline-none focus:border-[#dcb53f]" /></div>
            <div><label htmlFor="news-location" className="mb-1.5 block text-[11px] font-extrabold uppercase tracking-wider text-[#174c3b]">Location</label><input id="news-location" value={form.location ?? ''} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="e.g. Madha College Auditorium" className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm outline-none focus:border-[#dcb53f]" /></div>

            <div>
              <p className="mb-2 text-xs font-extrabold uppercase tracking-wider text-[#174c3b]">Event Image</p>
              <input ref={fileInputRef} type="file" accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp" onChange={handleImage} className="hidden" />
              {form.imageUrl ? <div className="overflow-hidden rounded-xl border border-slate-200">
                <img src={form.imageUrl} alt="Selected event preview" className="h-36 w-full bg-slate-50 object-cover sm:h-40" />
                <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3"><p className="text-xs font-semibold text-slate-500">Image preview</p><button type="button" disabled={uploading} onClick={() => fileInputRef.current?.click()} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-xs font-bold text-[#0d3b2e] hover:bg-slate-50 disabled:opacity-50"><Upload size={15} /> Replace image</button></div>
              </div> : <button type="button" disabled={uploading} onClick={() => fileInputRef.current?.click()} className="flex min-h-[78px] w-full flex-row flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/70 px-4 py-3 text-left transition hover:border-[#dcb53f] hover:bg-[#fbf7e8] disabled:opacity-50 sm:justify-between">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f6edc9] text-[#0d3b2e]"><ImagePlus size={21} /></span><span className="min-w-0 flex-1"><span className="block text-sm font-extrabold text-[#0d3b2e]">{uploading ? 'Uploading image…' : 'Upload an image'}</span><span className="mt-1 block text-[11px] text-slate-500">JPG, JPEG, PNG or WEBP · Max 20 MB</span></span><span className="inline-flex items-center gap-2 rounded-lg bg-[#0d3b2e] px-4 py-2 text-xs font-bold text-white"><Upload size={14} /> Choose File</span>
              </button>}
              {form.imageUrl && <button type="button" onClick={() => setForm({ ...form, imageUrl: '' })} className="mt-2 text-xs font-bold text-red-600 hover:underline">Remove image</button>}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 px-3.5 py-2.5"><span className="flex items-center gap-2 text-sm font-bold text-[#174c3b]"><Eye size={16} /> Published</span><input type="checkbox" checked={Boolean(form.isPublished)} onChange={e => setForm({ ...form, isPublished: e.target.checked })} className="h-5 w-5 accent-[#dcb53f]" /></label>
              <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 px-3.5 py-2.5"><span className="flex items-center gap-2 text-sm font-bold text-[#174c3b]"><Star size={16} /> Featured</span><input type="checkbox" checked={Boolean(form.isFeatured)} onChange={e => setForm({ ...form, isFeatured: e.target.checked })} className="h-5 w-5 accent-[#dcb53f]" /></label>
            </div>
            <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-3 sm:flex-row">
              <button type="button" onClick={() => setFormOpen(false)} disabled={saving || uploading} className="flex-1 rounded-xl bg-slate-100 px-5 py-2.5 text-sm font-extrabold text-[#174c3b] transition hover:bg-slate-200 disabled:opacity-50">Cancel</button>
              <button type="submit" disabled={saving || uploading} className="flex-1 rounded-xl bg-[#dcb53f] px-5 py-2.5 text-sm font-extrabold text-[#0d3b2e] shadow-lg shadow-amber-500/20 transition hover:bg-[#174c3b] disabled:cursor-not-allowed disabled:opacity-50">{saving ? 'Saving…' : uploading ? 'Uploading image…' : editingId ? 'Save Changes' : 'Save Entry'}</button>
            </div>
          </form>
        </section>
      </div>}
    </main>
  );
}
