import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, canonical, jsonLd }) {
  const siteName = 'Artmetal';
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} — Chaudronnerie & Fabrication Inox à Casablanca`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical || 'https://artmetal.ma/'} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical || 'https://artmetal.ma/'} />
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}
