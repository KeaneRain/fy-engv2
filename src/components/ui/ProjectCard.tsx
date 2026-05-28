interface ProjectCardProps {
  title: string
  category: string
  image: string
}

export function ProjectCard({ title, category, image }: ProjectCardProps) {
  return (
    <div className="group">
      <div className="relative aspect-[4/3] bg-navy-800 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="#2563eb" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="8" y="16" width="40" height="32" />
            <path d="M8 16 L28 6 L48 16" />
            <rect x="20" y="30" width="7" height="18" />
            <rect x="32" y="24" width="8" height="7" />
            <rect x="12" y="24" width="6" height="6" />
          </svg>
        </div>
      </div>
      <div className="mt-2">
        <p className="text-white font-body font-semibold text-sm">{title}</p>
        <p className="text-blueprint-300 text-xs font-mono tracking-wide">{category}</p>
      </div>
    </div>
  )
}
