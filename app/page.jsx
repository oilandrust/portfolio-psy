import { redirect } from 'next/navigation';

export default function RootPage() {
  // Default to French for SEO
  redirect('/fr');
}

