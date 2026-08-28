import { redirect } from 'next/navigation';
import { getPortfolioData } from '../../../../lib/portfolio';

export async function generateStaticParams() {
  const portfolio = getPortfolioData();
  const languages = ['fr', 'en'];
  const params = [];

  languages.forEach(lang => {
    const interests = portfolio[lang]?.interests || [];
    interests.forEach(interest => {
      const slug = interest.slug || interest.id?.toString();
      if (!slug) return;
      params.push({ lang, slug });
    });
  });

  return params;
}

export default async function InterestSlugRedirectPage({ params }) {
  const { lang, slug, id } = await params;
  const slugOrId = slug ?? id;
  redirect(`/${lang}/articles/${slugOrId}/`);
}
