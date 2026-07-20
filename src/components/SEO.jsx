import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, url, cityData }) => {
  const canonicalBaseUrl = 'https://weather-app-xi-tawny-68.vercel.app';
  const portfolioUrl = 'https://anayolico.name.ng/';
  const appImage = `${canonicalBaseUrl}/weathersky-logo.png`;
  const canonicalUrl = url ? `${canonicalBaseUrl}${url}` : canonicalBaseUrl;

  const creator = {
    "@type": "Person",
    "@id": `${portfolioUrl}#person`,
    "name": "Caleb Anayolico",
    "url": portfolioUrl,
    "jobTitle": "Web and Mobile Developer",
    "sameAs": [portfolioUrl]
  };

  const webApp = {
    "@type": "WebApplication",
    "@id": `${canonicalBaseUrl}/#webapp`,
    "name": "WeatherSky",
    "alternateName": [
      "WeatherSky Forecast App",
      "Caleb Anayolico Weather App",
      "Anayolico Weather App"
    ],
    "url": canonicalUrl,
    "image": appImage,
    "description": description,
    "applicationCategory": "WeatherApplication",
    "operatingSystem": "Web",
    "browserRequirements": "Requires JavaScript. Works in modern browsers.",
    "isAccessibleForFree": true,
    "creator": {
      "@id": `${portfolioUrl}#person`
    },
    "publisher": {
      "@id": `${portfolioUrl}#person`
    },
    "isPartOf": {
      "@type": "WebSite",
      "@id": `${canonicalBaseUrl}/#website`,
      "name": "WeatherSky",
      "url": canonicalBaseUrl,
      "creator": {
        "@id": `${portfolioUrl}#person`
      }
    }
  };

  if (cityData && cityData.coord) {
    webApp["contentLocation"] = {
      "@type": "Place",
      "name": cityData.name,
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": cityData.coord.lat,
        "longitude": cityData.coord.lon
      }
    };
  }

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@graph": [creator, webApp]
  };

  return (
    <Helmet>
      {/* Standard SEO tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content="Caleb Anayolico" />
      <meta name="creator" content="Caleb Anayolico" />
      <meta name="publisher" content="Caleb Anayolico" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

      {/* Open Graph / Facebook tags */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="WeatherSky" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={appImage} />
      <meta property="og:image:alt" content="WeatherSky real-time weather forecast app by Caleb Anayolico" />

      {/* Twitter tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={appImage} />
      <meta name="twitter:image:alt" content="WeatherSky real-time weather forecast app by Caleb Anayolico" />
      
      <link rel="canonical" href={canonicalUrl} />
      <link rel="author" href={portfolioUrl} />
      <link rel="me" href={portfolioUrl} />

      {/* Structured Schema Data */}
      <script type="application/ld+json">
        {JSON.stringify(schemaMarkup)}
      </script>
    </Helmet>
  );
};

export default SEO;
