interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  light?: boolean;
}

export function SectionHeader({
  title,
  subtitle,
  className = "",
  light = false,
}: SectionHeaderProps) {
  return (
    <div className={`text-center ${className}`}>
      <h2
        className={`font-heading text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl ${
          light ? "text-white" : "text-foreground"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mx-auto mt-3 max-w-2xl text-base lg:text-lg ${
            light ? "text-white/80" : "text-muted-foreground"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
