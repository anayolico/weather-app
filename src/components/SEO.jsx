import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, url, cityData }) => {
  const canonicalBaseUrl = 'https://weather-app-xi-tawny-68.vercel.app';
  const canonicalUrl = url ? `${canonicalBaseUrl}${url}` : canonicalBaseUrl;

  // Schema.org Structured Data (JSON-LD) for Search Engines
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "WeatherSky",
    "alternateName": "WeatherSky Forecast App",
    "url": canonicalUrl,
    "description": description,
    "applicationCategory": "WeatherApplication",
    "operatingSystem": "All",
    "creator": {
      "@type": "Person",
      "name": "Caleb Anayolico",
      "url": "https://anayolico.name.ng/"
    }
  };

  // Enrich schema with city geolocation if data is active
  if (cityData && cityData.coord) {
    schemaMarkup["contentLocation"] = {
      "@type": "Place",
      "name": cityData.name,
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": cityData.coord.lat,
        "longitude": cityData.coord.lon
      }
    };
  }

  return (
    <Helmet>
      {/* Standard SEO tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Open Graph / Facebook tags */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      {/* Twitter tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      
      <link rel="canonical" href={canonicalUrl} />

      {/* Structured Schema Data */}
      <script type="application/ld+json">
        {JSON.stringify(schemaMarkup)}
      </script>
    </Helmet>
  );
};

export default SEO;
