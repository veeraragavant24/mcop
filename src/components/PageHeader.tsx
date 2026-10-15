import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  image: string;
  breadcrumbs: { label: string; path?: string }[];
}

export default function PageHeader({ title, subtitle, image, breadcrumbs }: PageHeaderProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative h-[340px] md:h-[400px] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-forest-900/90 via-forest-900/75 to-forest-900/50" />
      <img src={image} alt={title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 flex items-end pb-10">
        <div className="container-mcp">
          <nav className="flex items-center gap-2 text-sm text-gray-300 mb-3">
            
          
<nav className="flex items-center gap-2 text-sm text-gray-300 mb-3">
  {breadcrumbs
    .filter((crumb) => crumb.label.toLowerCase() !== 'home')
    .map((crumb, i, filteredBreadcrumbs) => (
      <span key={`${crumb.label}-${i}`} className="flex items-center gap-2">
        {i > 0 && (
          <ChevronRight className="w-3.5 h-3.5 text-gold-500" />
        )}

        {crumb.path && i < filteredBreadcrumbs.length - 1 ? (
          <Link
            to={crumb.path}
            className="hover:text-gold-400 transition-colors"
          >
            {crumb.label}
          </Link>
        ) : (
          <span className="text-gold-400">{crumb.label}</span>
        )}
      </span>
    ))}
</nav>
</nav>

          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">{title}</h1>
          {subtitle && <p className="text-lg text-gray-200 mt-3 max-w-2xl">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}
