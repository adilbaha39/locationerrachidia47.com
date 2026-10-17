# Location Errachidia 47

Site Next.js 15 de location de voitures à Errachidia (Maroc).

## Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Server Components by default
- Static generation for all pages including vehicle details

## Demarrage

```bash
npm install
npm run dev
```

Ouvrir http://localhost:3000

```bash
npm run build
npm start
npm run lint
```

## Configuration importante avant deploiement

1. **Domaine** — dans `src/data/site.ts` ou via variable d'environnement :

```bash
NEXT_PUBLIC_SITE_URL=https://votre-domaine.com
```

Le placeholder actuel est `https://REPLACE-WITH-REAL-DOMAIN.example`.

2. **Images** — placer les fichiers dans `public/images/` (voir liste ci-dessous).

3. **Claims non verifies** — retires ou desactives dans `src/data/site.ts` (`features`) :
   - Assurance incluse
   - Livraison aeroport
   - Service 24/7 (horaires reels : 8h-22h)
   - Avis / nombre de clients

## Routes

| Route | Description |
|-------|-------------|
| `/` | Accueil |
| `/voitures` | Flotte complete + filtres |
| `/voitures/[slug]` | Fiche vehicule (SSG) |
| `/apropos` | A propos |
| `/conditions` | Conditions de location |
| `/contact` | Contact + formulaire WhatsApp |
| `/sitemap.xml` | Sitemap |
| `/robots.txt` | Robots |

## WhatsApp

Numero : `212619213238`  
Helper : `src/lib/whatsapp.ts`

## SEO

- `generateMetadata` par page
- JSON-LD LocalBusiness / AutoRental, WebSite, BreadcrumbList, Product
- Contenu flotte rendu cote serveur
- Canonical, Open Graph, Twitter cards

## Images a ajouter dans public/images/

- logo.png
- hero.jpg, golf.jpg, classe-e.jpg, raptor.jpg, sportage.jpg, audi.jpg
- evoque.jpg, gle.jpg, duster.jpg, hilux.jpg
- desert.jpg, road.jpg, ville.jpg, map.jpg
- agence.jpg, documents.jpg, maroc-map.png
