interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
  light?: boolean;
}

export default function SectionTitle({
  eyebrow,
  title,
  description,
  center = true,
  light = false,
}: SectionTitleProps) {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      {eyebrow && (
        <span
          className={`inline-block text-sm font-semibold uppercase tracking-wider mb-3 ${
            light ? 'text-gold-400' : 'text-gold-600'
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-2xl md:text-4xl font-bold leading-tight ${
          light ? 'text-white' : 'text-forest-800'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base md:text-lg leading-relaxed max-w-3xl ${
            center ? 'mx-auto' : ''
          } ${light ? 'text-gray-300' : 'text-gray-600'}`}
        >
          {description}
        </p>
      )}
      <div className={`h-1 w-20 bg-gold-500 rounded-full mt-5 ${center ? 'mx-auto' : ''}`} />
    </div>
  );
}
