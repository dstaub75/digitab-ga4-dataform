# digitab-ga4-dataform
Terraform de la data ga4 de www.digitab.fr avec GCP Dataform et SQL


Excellent choix ! Nous allons rédiger un brouillon du fichier `README.md` pour votre dépôt Dataform, en mettant en lumière la résolution du conflit de région.

Voici une proposition de `README.md` structuré comme un document d'ingénierie d'analyse.

---

#📊 Pipeline ELT Google Analytics 4 (GA4) avec Dataform et BigQueryCe projet démontre la construction d'un pipeline complet de transformation (T) des données brutes d'export GA4 vers des modèles de données structurés, prêts pour l'analyse et la Business Intelligence (BI).

##🚀 Objectif du ProjetL'objectif principal est de convertir les logs d'événements complexes et imbriqués de l'export BigQuery GA4 en un modèle relationnel (principalement Schéma en Étoile) facile à interroger par les outils BI (Looker Studio, Tableau, etc.), en suivant les meilleures pratiques d'ingénierie d'analyse.

###Architecture Simplifiée##🛠️ Stack Technique* **Transformation :** Dataform (GCP)
* **Data Warehouse :** BigQuery
* **Source de Données :** Export quotidien GA4
* **Langage :** SQL (Standard SQL)

##📁 Structure du DépôtLe projet suit la convention de nommage standard de Dataform :

```
ga4-dataform-pipeline/
├── definitions/
│   ├── sources/        # Déclaration des datasets sources (analytics_...)
│   ├── staging/        # Nettoyage et aplanissement des événements bruts (ex: stg_events)
│   ├── intermediate/   # Construction des sessions et logiques complexes (ex: itm_sessions)
│   └── marts/          # Tables finales prêtes pour la BI (ex: dim_users, fact_sessions)
└── workflow_settings.yaml # Configuration de l'environnement (Région, Schémas)

```

---

##🛑 Étude de Cas : Débogage du Conflit de RégionLors du déploiement initial, le pipeline Dataform a systématiquement échoué avec des erreurs de localisation. Cette section détaille l'analyse et la résolution d'un problème d'environnement critique sur GCP.

###1. Le Problème (Initial/Masqué)L'erreur signalée était que BigQuery ne pouvait pas lier les datasets en raison d'un conflit de région :

> **Problème de fond :** Le dataset de destination par défaut (`dataform_staging`) avait été créé automatiquement en région **`US`** (États-Unis), car il s'agissait de la région par défaut du projet.
> **Conflit :** Les données sources GA4 étaient stockées en **`europe-west9`** (Paris).

BigQuery interdit strictement de joindre ou de transformer des données entre des régions géographiques aussi éloignées.

###2. La Solution : Alignement Géographique du PipelinePour résoudre ce problème d'environnement, la configuration de l'espace de travail Dataform a été ajustée pour forcer l'exécution dans la région exacte de la source.

1. **Identification de la Source :** Vérification dans BigQuery, le dataset source GA4 est confirmé à **`europe-west9`**.
2. **Mise à jour IaC (Infrastructure as Code) :** Le fichier `workflow_settings.yaml` a été modifié pour définir la localisation par défaut sur `europe-west9`.

####Extrait de `workflow_settings.yaml````yaml
defaultProject: "digitab-480909"
defaultLocation: "europe-west9"  # ALIGNEMENT CRITIQUE
defaultDataset: "dataform_staging"

```

###3. RésultatL'alignement de la `defaultLocation` a permis à Dataform de **créer le dataset `dataform_staging` dans la région `europe-west9**` et d'exécuter l'intégralité du pipeline avec succès, prouvant la robustesse du code une fois l'environnement correctement configuré.

---

##📐 Modélisation des Données (Mart)Le pipeline applique les principes de modélisation dimensionnelle pour transformer les événements GA4 en objets métier utilisables.

| Modèle | Type | Description |
| --- | --- | --- |
| `stg_events` | Staging (Table) | Vue aplanissant les champs imbriqués (`event_params`, `items`) et nettoyant les colonnes essentielles. |
| `dim_users` | Dimension | Table regroupant les utilisateurs uniques et leurs propriétés permanentes. |
| `fact_sessions` | Fait | Table au grain de la session, incluant les indicateurs clés (durée, nombre d'événements, etc.). |

---

**Vous pouvez copier ce texte et l'utiliser comme base pour votre dépôt GitHub !**

Voulez-vous ajouter plus de détails sur un modèle SQL spécifique (par exemple, comment vous avez aplanit les `event_params`) ?
