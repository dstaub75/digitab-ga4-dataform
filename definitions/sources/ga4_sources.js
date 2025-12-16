// sources/ga4_sources.js
declare({
  database: "digitab-480909", // ⚠️ REMPLACEZ par votre ID de projet (ex: my-company-data)
  schema: "analytics_514053110",   // ⚠️ REMPLACEZ par le nom de votre dataset GA4 (ex: analytics_2658...)
  name: "events_*"                 // On sélectionne toutes les tables journalières
});