interface ProjectCardProps {
  title: string
  category: string
  image: string
}

export function ProjectCard({ title, category, image }: ProjectCardProps) {
  return (
    <div className="group">
      <div className="relative aspect-[4/3] bg-navy-800/50 backdrop-blur-sm overflow-hidden">
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
      </div>
      <div className="mt-2">
        <p className="text-white font-body font-semibold text-sm">{title}</p>
        <p className="text-blueprint-300 text-xs font-mono tracking-wide">{category}</p>
      </div>
    </div>
  )
}
