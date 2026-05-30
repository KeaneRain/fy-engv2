export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export const SERVICES = [
  {
    id: 'construction',
    icon: 'building' as const,
    title: 'Engineering Construction',
    description: 'We deliver high-quality construction solutions tailored to your project needs.',
  },
  {
    id: 'management',
    icon: 'clipboard' as const,
    title: 'Project Management',
    description: 'Expert management, scheduling, and supervision to ensure project success.',
  },
  {
    id: 'design',
    icon: 'ruler' as const,
    title: 'Design Services',
    description: 'Innovative and functional designs that bring your vision to life.',
  },
]

export const PROJECTS = [
  { id: 'residence', title: 'Modern Residence', category: 'Residential', image: '/projects/residence.jpg' },
  { id: 'commercial', title: 'Commercial Building', category: 'Commercial', image: '/projects/commercial.jpg' },
  { id: 'industrial', title: 'Industrial Facility', category: 'Industrial', image: '/projects/industrial.jpg' },
  { id: 'highrise', title: 'High-Rise Development', category: 'Mixed Use', image: '/projects/highrise.jpg' },
]

export const STATS = [
  { value: '10+', label: 'Years Experience' },
  { value: '100+', label: 'Projects Completed' },
  { value: '99%', label: 'Client Satisfaction' },
]

export const CONTACT = {
  phone: '+63 962 894 8608',
  email: 'fyenggcons@gmail.com',
  address: 'Cabuyao City, Philippines',
}
