import { redirect } from 'next/navigation';

export async function generateStaticParams() {
  return [{ lang: 'fr' }, { lang: 'en' }];
}

export default async function LangPage({ params }) {
  const { lang } = await params;
  redirect(`/${lang}/about`);
}

