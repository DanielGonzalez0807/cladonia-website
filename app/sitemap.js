import { experiences } from '@/data/experiences';

export default function sitemap() {
  const baseUrl = 'https://www.cladonia.org';
  
  // Páginas estáticas
  const routes = ['', '/form'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));

  // Páginas de experiencias dinámicas
  const experienceRoutes = Object.keys(experiences).map((slug) => ({
    url: `${baseUrl}/experiencies/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  return [...routes, ...experienceRoutes];
}
