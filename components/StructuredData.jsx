'use client';

export default function StructuredData({ profile, currentLang, baseUrl }) {
  if (!profile) return null;

  const profileImage = `${baseUrl}/data/profile/IMG-20250419-WA0003 (2).jpg`;
  
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.title || 'Olivier Rouiller',
    jobTitle: profile.subtitle || '',
    description: profile.about?.substring(0, 200) || '',
    image: profileImage,
    url: `${baseUrl}/${currentLang}/`,
    sameAs: [], // Add social media links if available
    alumniOf: {
      '@type': 'Organization',
      name: 'University of Strasbourg'
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
    />
  );
}

