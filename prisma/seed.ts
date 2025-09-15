// prisma/seed.ts
import { PrismaClient, SubmissionStatus } from '../src/generated/prisma/client';
import  bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début du seeding...');

  // Nettoyer les données existantes
  await prisma.productCategory.deleteMany({});
  await prisma.submission.deleteMany({});
  await prisma.blogPost.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.admin.deleteMany({});
  // 1. Créer les catégories
  console.log('📂 Création des catégories...');
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Holothurie Séchée',
        slug: 'holothurie-sechee',
        description: 'Concombres de mer séchés de qualité pharmaceutique',
        metaTitle: 'Holothurie Séchée - Qualité Pharmaceutique',
        metaDesc: 'Fournisseurs d\'holothurie séchée pour l\'industrie pharmaceutique. Qualité premium garantie.'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Bêche-de-mer Premium',
        slug: 'beche-de-mer-premium',
        description: 'Bêche-de-mer de grade premium pour applications médicales',
        metaTitle: 'Bêche-de-mer Premium - Grade Médical',
        metaDesc: 'Approvisionnement en bêche-de-mer premium pour laboratoires pharmaceutiques.'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Concombre Pacifique',
        slug: 'concombre-pacifique',
        description: 'Concombres de mer du Pacifique, origine contrôlée',
        metaTitle: 'Concombre de Mer Pacifique - Origine Contrôlée',
        metaDesc: 'Concombres de mer du Pacifique, traçabilité garantie pour l\'industrie pharmaceutique.'
      }
    })
  ]);

  console.log(`✅ ${categories.length} catégories créées`);

  // 2. Créer les produits
  console.log('📦 Création des produits...');
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Holothuria Scabra Grade A',
        slug: 'holothuria-scabra-grade-a',
        description: `
          <p>L'Holothuria Scabra de grade A représente le standard de qualité le plus élevé pour l'industrie pharmaceutique. Cette espèce de concombre de mer, également connue sous le nom de "Sandfish", est particulièrement recherchée pour ses propriétés thérapeutiques exceptionnelles.</p>
          
          <h3>Propriétés Pharmaceutiques</h3>
          <p>Rich en saponines triterpéniques, cette espèce présente des propriétés anti-inflammatoires, anticoagulantes et immunomodulatrices remarquables. Les composés bioactifs présents incluent notamment les holothurines A et B, essentielles pour les applications pharmaceutiques modernes.</p>
          
          <h3>Traitement et Préparation</h3>
          <p>Nos specimens sont traités selon les protocoles pharmaceutiques les plus stricts, avec séchage contrôlé à basse température pour préserver l'intégrité des principes actifs. Le processus de déshydratation respecte les normes GMP (Good Manufacturing Practices).</p>
          
          <h3>Applications Thérapeutiques</h3>
          <ul>
            <li>Développement de médicaments anti-cancer</li>
            <li>Traitements anti-inflammatoires</li>
            <li>Suppléments nutritionnels haut de gamme</li>
            <li>Recherche en immunologie</li>
          </ul>
        `,
        shortDesc: 'Holothuria Scabra de grade pharmaceutique A, riche en saponines triterpéniques pour applications médicales avancées.',
        specs: `
Espèce: Holothuria scabra
Grade: A (Pharmaceutique)
Taux d'humidité: < 12%
Saponines: > 15%
Taille: 8-12 cm
Origine: Océan Indien
Certification: GMP, ISO 22000
Conditionnement: Sachets sous vide 1kg
Conservation: Lieu sec, température < 25°C
Durée de conservation: 24 mois
        `,
        metaTitle: 'Holothuria Scabra Grade A - Concombre de Mer Pharmaceutique',
        metaDesc: 'Achat Holothuria Scabra grade A pour industrie pharmaceutique. Qualité premium, certification GMP, livraison rapide.',
        keywords: 'holothuria scabra, concombre mer grade A, sandfish pharmaceutique, saponines triterpéniques',
        image: '/images/products/holothuria-scabra-a.jpg',
        minQuantity: 50,
        maxQuantity: 1000,
        priceRange: '850-1200 EUR/kg',
        quality: 'Grade A Pharmaceutique',
        origin: 'Océan Indien',
        isActive: true,
        featured: true
      }
    }),
    prisma.product.create({
      data: {
        name: 'Holothuria Edulis Premium',
        slug: 'holothuria-edulis-premium',
        description: `
          <p>L'Holothuria Edulis Premium est une espèce de concombre de mer hautement valorisée dans l'industrie pharmaceutique pour sa concentration exceptionnelle en peptides bioactifs et en chondroïtine sulfate naturelle.</p>
          
          <h3>Composition Bioactive</h3>
          <p>Cette espèce se distingue par sa teneur élevée en glycosaminoglycanes, particulièrement en chondroïtine sulfate et en acide hyaluronique naturels. Ces composés sont essentiels pour le développement de traitements arthritiques et de thérapies régénératives.</p>
          
          <h3>Processus de Récolte Durable</h3>
          <p>Récoltée selon des méthodes durables dans les eaux cristallines du Pacifique Sud, notre Holothuria Edulis bénéficie d'une traçabilité complète depuis la zone de pêche jusqu'au laboratoire. Chaque lot est accompagné d'un certificat d'origine et d'analyses complètes.</p>
        `,
        shortDesc: 'Holothuria Edulis premium, source naturelle de chondroïtine sulfate pour applications thérapeutiques.',
        specs: `
Espèce: Holothuria edulis
Grade: Premium
Chondroïtine sulfate: > 8%
Protéines: > 45%
Taille: 10-15 cm
Origine: Pacifique Sud
Récolte: Durable et traçable
Séchage: Naturel contrôlé
Analyses: Métaux lourds, microbiologie
Conformité: Pharmacopée Européenne
        `,
        metaTitle: 'Holothuria Edulis Premium - Source Chondroïtine Naturelle',
        metaDesc: 'Holothuria Edulis premium pour extraction chondroïtine sulfate. Qualité pharmaceutique, récolte durable.',
        keywords: 'holothuria edulis, chondroïtine sulfate naturelle, concombre mer premium, thérapies régénératives',
        image: '/images/products/holothuria-edulis.jpg',
        minQuantity: 25,
        maxQuantity: 500,
        priceRange: '1200-1800 EUR/kg',
        quality: 'Premium',
        origin: 'Pacifique Sud',
        isActive: true,
        featured: true
      }
    }),
    prisma.product.create({
      data: {
        name: 'Stichopus Japonicus Bio',
        slug: 'stichopus-japonicus-bio',
        description: `
          <p>Le Stichopus Japonicus certifié biologique représente l'excellence dans le domaine des concombres de mer thérapeutiques. Cette espèce, traditionnellement utilisée en médecine asiatique, trouve aujourd'hui sa place dans la pharmacologie moderne.</p>
          
          <h3>Certification Biologique</h3>
          <p>Notre Stichopus Japonicus bénéficie de la certification biologique européenne, garantissant l'absence de contaminants chimiques et le respect de l'environnement marin. Les zones de récolte sont strictement contrôlées et préservées.</p>
          
          <h3>Propriétés Thérapeutiques Uniques</h3>
          <p>Exceptionnellement riche en céramides et en gangliosides, cette espèce présente des propriétés neuroprotectrices et anti-âge remarquables. Les études cliniques montrent une efficacité particulière dans le traitement des troubles cognitifs légers.</p>
        `,
        shortDesc: 'Stichopus Japonicus certifié bio, riche en céramides pour applications neuroprotectrices.',
        specs: `
Espèce: Stichopus japonicus
Certification: Bio EU
Céramides: > 12%
Gangliosides: > 6%
Taille: 15-20 cm
Origine: Mer du Japon
Traitement: 100% naturel
Contrôles: Pesticides, métaux lourds
Conditionnement: Emballage biodégradable
Traçabilité: Blockchain
        `,
        metaTitle: 'Stichopus Japonicus Bio - Concombre Mer Neuroprotecteur',
        metaDesc: 'Stichopus Japonicus certifié bio, source céramides naturelles. Applications neuroprotectrices, qualité pharmaceutique.',
        keywords: 'stichopus japonicus bio, céramides naturelles, neuroprotection, concombre mer bio',
        image: '/images/products/stichopus-japonicus.jpg',
        minQuantity: 10,
        maxQuantity: 200,
        priceRange: '2500-3500 EUR/kg',
        quality: 'Bio Certifié',
        origin: 'Mer du Japon',
        isActive: true,
        featured: false
      }
    }),
    prisma.product.create({
      data: {
        name: 'Thelenota Ananas Extract Ready',
        slug: 'thelenota-ananas-extract-ready',
        description: `
          <p>Le Thelenota Ananas "Extract Ready" est spécialement préparé pour l'extraction industrielle de composés bioactifs. Cette espèce géante de concombre de mer offre un rendement exceptionnel en substances d'intérêt pharmaceutique.</p>
          
          <h3>Préparation Spécialisée</h3>
          <p>Nos specimens subissent un processus de préparation unique optimisant l'extraction des principes actifs. Le traitement enzymatique contrôlé augmente la biodisponibilité des saponines et facilite les processus d'extraction industrielle.</p>
        `,
        shortDesc: 'Thelenota Ananas préparé pour extraction industrielle, rendement optimisé en composés bioactifs.',
        specs: `
Espèce: Thelenota ananas
Format: Extract Ready
Rendement d'extraction: > 85%
Saponines totales: > 20%
Préparation: Traitement enzymatique
Granulométrie: 2-5mm
Origine: Indonésie
Stockage: -18°C
Durée de conservation: 36 mois
Applications: Extraction industrielle
        `,
        metaTitle: 'Thelenota Ananas Extract Ready - Extraction Industrielle',
        metaDesc: 'Thelenota Ananas préparé pour extraction. Rendement optimisé, format industriel, qualité constante.',
        keywords: 'thelenota ananas, extraction industrielle, saponines, concombre mer extract ready',
        image: '/images/products/thelenota-ananas.jpg',
        minQuantity: 100,
        maxQuantity: 5000,
        priceRange: '450-650 EUR/kg',
        quality: 'Extract Ready',
        origin: 'Indonésie',
        isActive: true,
        featured: false
      }
    }),
    prisma.product.create({
      data: {
        name: 'Holothuria Nobilis Pharma Grade',
        slug: 'holothuria-nobilis-pharma-grade',
        description: `
          <p>L'Holothuria Nobilis Pharma Grade est le fruit d'une sélection rigoureuse et d'un processus de traitement pharmaceutique avancé. Cette espèce rare offre une concentration unique en triterpénoïdes bioactifs.</p>
          
          <h3>Rareté et Excellence</h3>
          <p>Espèce rare et protégée, notre Holothuria Nobilis provient exclusivement d'élevages durables certifiés. Chaque specimen est individuellement contrôlé pour garantir la qualité pharmaceutique exceptionnelle.</p>
        `,
        shortDesc: 'Holothuria Nobilis grade pharmaceutique, espèce rare riche en triterpénoïdes bioactifs.',
        specs: `
Espèce: Holothuria nobilis
Grade: Pharmaceutique
Rareté: Espèce protégée
Triterpénoïdes: > 18%
Source: Élevage durable
Contrôle: Individuel
Traçabilité: Complète
Certification: Pharma EU
Applications: Recherche avancée
Disponibilité: Limitée
        `,
        metaTitle: 'Holothuria Nobilis Pharma Grade - Espèce Rare Premium',
        metaDesc: 'Holothuria Nobilis grade pharmaceutique, espèce rare pour recherche avancée. Qualité exceptionnelle.',
        keywords: 'holothuria nobilis, espèce rare, triterpénoïdes, pharma grade, recherche pharmaceutique',
        image: '/images/products/holothuria-nobilis.jpg',
        minQuantity: 5,
        maxQuantity: 50,
        priceRange: '5000-8000 EUR/kg',
        quality: 'Pharma Grade',
        origin: 'Élevage Certifié',
        isActive: true,
        featured: false
      }
    })
  ]);

  console.log(`✅ ${products.length} produits créés`);

  // 3. Associer produits et catégories
  console.log('🔗 Association produits-catégories...');
  const productCategoryLinks = await Promise.all([
    // Holothuria Scabra -> Holothurie Séchée + Concombre Pacifique
    prisma.productCategory.create({
      data: {
        productId: products[0].id,
        categoryId: categories[0].id
      }
    }),
    prisma.productCategory.create({
      data: {
        productId: products[0].id,
        categoryId: categories[2].id
      }
    }),
    // Holothuria Edulis -> Bêche-de-mer Premium + Concombre Pacifique
    prisma.productCategory.create({
      data: {
        productId: products[1].id,
        categoryId: categories[1].id
      }
    }),
    prisma.productCategory.create({
      data: {
        productId: products[1].id,
        categoryId: categories[2].id
      }
    }),
    // Stichopus Japonicus -> Bêche-de-mer Premium
    prisma.productCategory.create({
      data: {
        productId: products[2].id,
        categoryId: categories[1].id
      }
    }),
    // Thelenota Ananas -> Holothurie Séchée
    prisma.productCategory.create({
      data: {
        productId: products[3].id,
        categoryId: categories[0].id
      }
    }),
    // Holothuria Nobilis -> Bêche-de-mer Premium
    prisma.productCategory.create({
      data: {
        productId: products[4].id,
        categoryId: categories[1].id
      }
    })
  ]);

  console.log(`✅ ${productCategoryLinks.length} associations créées`);

  // 4. Créer des soumissions d'exemple
  console.log('📝 Création des soumissions...');
  const submissions = await Promise.all([
    prisma.submission.create({
      data: {
        supplier: 'Pacific Marine Resources Ltd',
        email: 'contact@pacificmarine.com',
        phone: '+61 8 9123 4567',
        company: 'Pacific Marine Resources',
        website: 'https://pacificmarine.com',
        productId: products[0].id,
        quantity: '500kg',
        price: '950 EUR/kg',
        quality: 'Grade A Premium',
        origin: 'Australie - Grande Barrière',
        message: 'Fournisseur certifié avec 15 ans d\'expérience. Traçabilité complète et analyses disponibles.',
        certifications: 'MSC, ISO 22000, HACCP',
        status: 'ACCEPTED'
      }
    }),
    prisma.submission.create({
      data: {
        supplier: 'Indo Ocean Trading',
        email: 'sales@indoocean.co.id',
        phone: '+62 361 123456',
        company: 'Indo Ocean Trading Pte Ltd',
        productId: products[0].id,
        quantity: '1000kg',
        price: '880 EUR/kg',
        quality: 'Grade A Standard',
        origin: 'Indonésie - Sulawesi',
        message: 'Production en grande quantité, livraison mensuelle possible. Certificats de qualité fournis.',
        certifications: 'BRC, ISO 9001',
        status: 'ACCEPTED'
      }
    }),
    prisma.submission.create({
      data: {
        supplier: 'Madagascar Sea Products',
        email: 'export@madaseaproducts.mg',
        phone: '+261 20 12 345 67',
        company: 'Madagascar Sea Products SARL',
        productId: products[1].id,
        quantity: '200kg',
        price: '1450 EUR/kg',
        quality: 'Premium Plus',
        origin: 'Madagascar - Côte Ouest',
        message: 'Spécialiste Holothuria Edulis, récolte artisanale durable. Partenariat à long terme possible.',
        certifications: 'Fair Trade, Organic',
        status: 'ACCEPTED'
      }
    }),
    prisma.submission.create({
      data: {
        supplier: 'Japan Marine Bio Co',
        email: 'intl@japanmarinebio.jp',
        phone: '+81 3 1234 5678',
        company: 'Japan Marine Bio Co Ltd',
        productId: products[2].id,
        quantity: '50kg',
        price: '2800 EUR/kg',
        quality: 'Bio Certifié Premium',
        origin: 'Japon - Mer d\'Okhotsk',
        message: 'Certification bio JAS, contrôle qualité strict, emballage sous vide individuel.',
        certifications: 'JAS Organic, ISO 14001',
        status: 'PENDING'
      }
    })
  ]);

  console.log(`✅ ${submissions.length} soumissions créées`);

  // 5. Créer du contenu blog pour le SEO
  console.log('📚 Création du contenu blog...');
  const blogPosts = await Promise.all([
    prisma.blogPost.create({
      data: {
        title: 'Guide Complet des Concombres de Mer dans l\'Industrie Pharmaceutique',
        slug: 'guide-concombres-mer-industrie-pharmaceutique',
        content: `
<h1>Guide Complet des Concombres de Mer dans l'Industrie Pharmaceutique</h1>
<p>Les concombres de mer, également connus sous le nom d'holothuries, représentent une ressource marine extraordinaire pour l'industrie pharmaceutique moderne. Ces échinodermes, présents dans tous les océans du globe, concentrent une diversité remarquable de composés bioactifs aux propriétés thérapeutiques exceptionnelles.</p>

<h2>Les Principales Espèces d'Intérêt Pharmaceutique</h2>

<h3>Holothuria Scabra - Le "Sandfish"</h3>
<p>L'Holothuria scabra, communément appelée "sandfish", est sans doute l'espèce la plus recherchée dans l'industrie pharmaceutique. Native de l'Indo-Pacifique, cette espèce se distingue par sa concentration exceptionnelle en saponines triterpéniques, des molécules aux propriétés anti-inflammatoires et immunomodulatrices remarquables.</p>

<h3>Stichopus Japonicus - L'Excellence Asiatique</h3>
<p>Traditionnellement valorisée en médecine chinoise, le Stichopus japonicus trouve aujourd'hui sa place dans la pharmacologie occidentale grâce à sa richesse en céramides et en gangliosides, composés essentiels pour les applications neuroprotectrices.</p>

<h2>Applications Pharmaceutiques Actuelles</h2>

<h3>Anti-cancer et Immunothérapie</h3>
<p>Les recherches récentes démontrent que certaines saponines extraites des concombres de mer présentent des propriétés antitumorales significatives. Ces composés agissent en modulant la réponse immunitaire et en induisant l'apoptose des cellules cancéreuses.</p>

<h3>Médecine Régénérative</h3>
<p>Les glycosaminoglycanes naturellement présents dans les holothuries, notamment la chondroïtine sulfate et l'acide hyaluronique, ouvrent des perspectives prometteuses en médecine régénérative, particulièrement pour le traitement des pathologies articulaires.</p>

<h2>Critères de Qualité Pharmaceutique</h2>

<h3>Origine et Traçabilité</h3>
<p>La qualité pharmaceutique commence par la traçabilité. Chaque lot doit être accompagné d'un certificat d'origine précisant la zone de récolte, les méthodes utilisées et les conditions de stockage.</p>

<h3>Processus de Traitement</h3>
<p>Le séchage et la conservation des concombres de mer destinés à un usage pharmaceutique nécessitent un contrôle strict des paramètres température, humidité et durée, afin de préserver l'intégrité des principes actifs.</p>

<h2>Réglementation et Certification</h2>

<h3>Standards Internationaux</h3>
<p>L'industrie pharmaceutique impose des standards stricts : certification GMP (Good Manufacturing Practices), conformité aux pharmacopées européenne et américaine, analyses microbiologiques et de métaux lourds.</p>

<h3>Durabilité et Éthique</h3>
<p>La surexploitation de certaines espèces impose une approche durable. Les fournisseurs responsables privilégient les méthodes de récolte respectueuses de l'environnement et soutiennent les communautés locales.</p>

<h2>Conclusion</h2>
<p>Les concombres de mer représentent un potentiel pharmaceutique considérable, à condition de respecter des critères de qualité rigoureux et une approche durable. Le choix du bon fournisseur constitue un élément clé du succès de vos projets de recherche et développement.</p>

        `,
        excerpt: 'Découvrez le potentiel pharmaceutique des concombres de mer : espèces clés, applications thérapeutiques, critères de qualité et réglementation.',
        metaTitle: 'Guide Complet Concombres de Mer Pharmaceutique - Applications & Qualité',
        metaDesc: 'Guide expert des concombres de mer pour l\'industrie pharmaceutique : espèces, applications, qualité, réglementation. Ressource complète 2024.',
        keywords: 'concombres mer pharmaceutique, holothuries médicales, saponines triterpéniques, industrie pharmaceutique marine',
        featuredImage: '/images/blog/guide-concombres-mer.jpg',
        published: true,
        publishedAt: new Date(),
        author: 'Dr. Marine Biotechnology'
      }
    }),
    prisma.blogPost.create({
      data: {
        title: 'Choisir son Fournisseur de Concombres de Mer : 10 Critères Essentiels',
        slug: 'choisir-fournisseur-concombres-mer-criteres-essentiels',
        content: `
<h1>Choisir son Fournisseur de Concombres de Mer : 10 Critères Essentiels</h1>
<p>Le choix d'un fournisseur de concombres de mer pour l'industrie pharmaceutique ne doit pas être laissé au hasard. La qualité de votre approvisionnement détermine directement le succès de vos développements thérapeutiques et la conformité réglementaire de vos produits.</p>

<h2>1. Certification et Conformité Réglementaire</h2>
<h3>Certifications Obligatoires</h3>
<p>Votre fournisseur doit disposer au minimum des certifications ISO 22000 (sécurité alimentaire) et GMP (Good Manufacturing Practices). Pour les applications pharmaceutiques, la certification selon les pharmacopées européenne ou américaine est indispensable.</p>

<h3>Traçabilité Documentée</h3>
<p>Exigez une documentation complète : certificats d'origine, analyses de lot, conditions de stockage et transport. La blockchain commence à être utilisée par les fournisseurs les plus avancés pour garantir une traçabilité inaltérable.</p>

<h2>2. Origine Géographique et Environnementale</h2>
<h3>Zones de Récolte Contrôlées</h3>
<p>Les meilleures qualités proviennent de zones marines préservées : Grande Barrière de Corail australienne, eaux profondes de l'Océan Indien, zones protégées du Pacifique Sud. Évitez les produits issus de zones polluées ou surexploitées.</p>

<h3>Méthodes de Récolte Durables</h3>
<p>Privilégiez les fournisseurs pratiquant la récolte manuelle ou utilisant des techniques non destructrices. L'aquaculture durable représente l'avenir de l'approvisionnement en concombres de mer.</p>

<h2>3. Expertise Technique et Scientifique</h2>
<h3>Capacité d'Analyse</h3>
<p>Votre fournisseur doit disposer d'un laboratoire interne ou de partenariats avec des laboratoires certifiés pour réaliser les analyses requises : teneur en principes actifs, microbiologie, métaux lourds, pesticides.</p>

<h3>Support Technique</h3>
<p>L'accompagnement technique fait la différence : conseils sur les conditions de stockage, assistance dans le développement de processus d'extraction, adaptation des formats aux besoins spécifiques.</p>

<h2>4. Capacité de Production et Flexibilité</h2>
<h3>Volumes et Régularité</h3>
<p>Évaluez la capacité de production annuelle et la régularité des approvisionnements. Les meilleurs fournisseurs maintiennent des stocks tampons pour assurer la continuité de livraison.</p>

<h3>Formats et Conditionnements</h3>
<p>La flexibilité dans les formats (poudre, granules, extraits concentrés) et les conditionnements (sachets sous vide, fûts inox, emballages pharmaceutiques) témoigne du professionnalisme du fournisseur.</p>

<h2>5. Contrôle Qualité et Analyses</h2>
<h3>Protocoles de Contrôle</h3>
<p>Exigez la documentation des protocoles de contrôle qualité : échantillonnage, méthodes d'analyse, critères d'acceptation, gestion des non-conformités.</p>

<h3>Analyses Systématiques</h3>
<p>Les analyses incontournables incluent : composition en principes actifs, humidité, cendres, métaux lourds (plomb, mercure, cadmium), microbiologie (salmonelles, E.coli, staphylocoques).</p>

<h2>6. Expérience et Références</h2>
<h3>Historique Pharmaceutique</h3>
<p>Privilégiez les fournisseurs ayant une expérience prouvée avec l'industrie pharmaceutique. Demandez des références clients et consultez les avis disponibles.</p>

<h3>Stabilité Financière</h3>
<p>La pérennité de votre approvisionnement dépend de la santé financière de votre fournisseur. N'hésitez pas à demander des garanties financières pour les commandes importantes.</p>

<h2>7. Innovation et Recherche</h2>
<h3>Investissement R&D</h3>
<p>Les fournisseurs innovants investissent dans la recherche : développement de nouveaux procédés d'extraction, amélioration de la biodisponibilité, standardisation des extraits.</p>

<h3>Partenariats Scientifiques</h3>
<p>La collaboration avec des instituts de recherche et des universités témoigne de l'engagement scientifique du fournisseur et de sa capacité d'innovation.</p>

<h2>8. Logistique et Service Client</h2>
<h3>Chaîne du Froid</h3>
<p>Pour certains produits, le maintien de la chaîne du froid est crucial. Vérifiez les capacités logistiques : stockage réfrigéré, transport température contrôlée, emballages isothermes.</p>

<h3>Réactivité</h3>
<p>Un service client réactif est essentiel : traitement rapide des commandes urgentes, gestion proactive des problèmes, communication transparente sur les délais.</p>

<h2>9. Responsabilité Sociale et Environnementale</h2>
<h3>Impact Environnemental</h3>
<p>Évaluez l'engagement environnemental : pratiques de pêche durable, certification MSC (Marine Stewardship Council), programmes de conservation marine.</p>

<h3>Équité Sociale</h3>
<p>Les meilleurs fournisseurs soutiennent les communautés locales : prix équitables aux pêcheurs, programmes de formation, développement économique local.</p>

<h2>10. Tarification et Conditions Commerciales</h2>
<h3>Transparence Tarifaire</h3>
<p>Méfiez-vous des prix anormalement bas qui cachent souvent des compromis sur la qualité. Demandez une grille tarifaire détaillée avec les critères de variation.</p>

<h3>Flexibilité Contractuelle</h3>
<p>Négociez des contrats adaptés : clauses de force majeure, révision des prix, conditions de paiement, garanties de qualité.</p>

<h2>Conclusion</h2>
<p>Le choix d'un fournisseur de concombres de mer nécessite une évaluation rigoureuse selon ces 10 critères. Prenez le temps de visiter les installations, rencontrez les équipes, testez les produits. Un bon partenariat fournisseur est un investissement à long terme pour le succès de vos projets pharmaceutiques.</p>
        `,
        excerpt: 'Les 10 critères essentiels pour choisir le bon fournisseur de concombres de mer : certification, qualité, traçabilité, durabilité.',
        metaTitle: 'Comment Choisir son Fournisseur de Concombres de Mer - Guide Expert',
        metaDesc: '10 critères essentiels pour choisir votre fournisseur de concombres de mer pharmaceutique. Guide expert avec conseils pratiques.',
        keywords: 'fournisseur concombres mer, choisir fournisseur holothuries, critères sélection, qualité pharmaceutique',
        featuredImage: '/images/blog/choisir-fournisseur.jpg',
        published: true,
        publishedAt: new Date(),
        author: 'Expert Approvisionnement'
      }
    }),
    prisma.blogPost.create({
      data: {
        title: 'Réglementation Européenne des Concombres de Mer Pharmaceutiques 2024',
        slug: 'reglementation-europeenne-concombres-mer-pharmaceutiques-2024',
        content: `
<article>
  <header>
    <h1>Réglementation Européenne des Concombres de Mer Pharmaceutiques 2024</h1>
    <p>
      La réglementation européenne concernant l'utilisation des concombres de mer dans l'industrie pharmaceutique a considérablement évolué en 2024. 
      Cette mise à jour complète vous présente les nouvelles exigences et leurs implications pratiques.
    </p>
  </header>

  <section>
    <h2>Nouveau Règlement EU 2024/156</h2>

    <h3>Champ d'Application</h3>
    <ul>
      <li>La fabrication de médicaments</li>
      <li>Les compléments alimentaires à visée thérapeutique</li>
      <li>Les dispositifs médicaux incorporant des substances marines</li>
      <li>La recherche pharmaceutique</li>
    </ul>

    <h3>Principales Innovations</h3>
    <ul>
      <li>Renforcement des exigences de traçabilité</li>
      <li>Nouveaux seuils pour les contaminants</li>
      <li>Certification obligatoire des fournisseurs non-EU</li>
      <li>Étiquetage renforcé</li>
    </ul>
  </section>

  <section>
    <h2>Exigences de Traçabilité Renforcées</h2>

    <h3>Documentation Obligatoire</h3>
    <ul>
      <li>Certificat d'origine géographique précise (coordonnées GPS)</li>
      <li>Méthode de récolte détaillée</li>
      <li>Chaîne de custody complète</li>
      <li>Analyses de résidus environnementaux</li>
    </ul>

    <h3>Système de Codification</h3>
    <ul>
      <li>Code espèce (3 lettres)</li>
      <li>Code origine (4 chiffres)</li>
      <li>Code lot fournisseur (6 caractères)</li>
      <li>Code date de récolte (6 chiffres)</li>
    </ul>
  </section>

  <section>
    <h2>Nouvelles Limites de Contaminants</h2>

    <h3>Métaux Lourds (mg/kg matière sèche)</h3>
    <ul>
      <li>Plomb : 2.0 (précédemment 3.0)</li>
      <li>Mercure : 0.5 (précédemment 1.0)</li>
      <li>Cadmium : 1.0 (inchangé)</li>
      <li>Chrome hexavalent : 0.1 (nouveau)</li>
    </ul>

    <h3>Contaminants Organiques</h3>
    <ul>
      <li>HAP (Hydrocarbures Aromatiques Polycycliques) : &lt; 0.01 mg/kg</li>
      <li>PCB (Polychlorobiphényles) : &lt; 0.005 mg/kg</li>
      <li>Dioxines : &lt; 0.001 mg/kg TEQ</li>
    </ul>

    <h3>Résidus de Pesticides</h3>
    <p>Nouvelle liste de 150 substances à contrôler, avec des LMR (Limites Maximales de Résidus) spécifiques aux produits marins.</p>
  </section>

  <section>
    <h2>Certification des Fournisseurs</h2>

    <h3>Fournisseurs UE</h3>
    <p>Enregistrement obligatoire auprès des autorités nationales avec audit initial puis audits de suivi bisannuels.</p>

    <h3>Fournisseurs Pays Tiers</h3>
    <ul>
      <li>Pré-approbation par l'EMA (European Medicines Agency)</li>
      <li>Accord de reconnaissance mutuelle ou certification équivalente</li>
      <li>Inspections sur site par des organismes accrédités EU</li>
    </ul>
  </section>

  <section>
    <h2>Bonnes Pratiques de Récolte (GPR)</h2>

    <h3>Nouvelles Exigences Environnementales</h3>
    <ul>
      <li>Zones de récolte certifiées "non polluées"</li>
      <li>Rotation des zones d'exploitation</li>
      <li>Quotas de prélèvement basés sur des études d'impact</li>
      <li>Monitoring de la biodiversité</li>
    </ul>

    <h3>Formation du Personnel</h3>
    <ul>
      <li>Identification des espèces</li>
      <li>Techniques de prélèvement durable</li>
      <li>Conditions d'hygiène</li>
      <li>Premiers secours</li>
    </ul>
  </section>

  <section>
    <h2>Étiquetage et Information</h2>

    <h3>Mentions Obligatoires</h3>
    <ul>
      <li>Nom scientifique de l'espèce</li>
      <li>Zone géographique de récolte</li>
      <li>Date de récolte</li>
      <li>Méthode de traitement</li>
      <li>Conditions de conservation</li>
      <li>Analyse garantie (principes actifs)</li>
    </ul>

    <h3>Allégations Autorisées</h3>
    <p>Liste restrictive d'allégations santé pré-approuvées par l'EFSA pour les différentes espèces d'holothuries.</p>
  </section>

  <section>
    <h2>Impact sur les Importations</h2>

    <h3>Pays Prioritaires</h3>
    <ul>
      <li>Australie (Grande Barrière de Corail)</li>
      <li>Nouvelle-Zélande</li>
      <li>Japon</li>
      <li>Canada (côte Pacifique)</li>
    </ul>

    <h3>Contrôles Renforcés</h3>
    <ul>
      <li>20% des lots contrôlés aux frontières (vs 5% précédemment)</li>
      <li>Analyses systématiques pour nouveaux fournisseurs</li>
      <li>Blocage automatique en cas de non-conformité</li>
    </ul>
  </section>

  <section>
    <h2>Sanctions et Mise en Conformité</h2>

    <h3>Échéances</h3>
    <ul>
      <li>Juin 2024 : Mise en conformité étiquetage</li>
      <li>Septembre 2024 : Nouvelles limites contaminants</li>
      <li>Janvier 2025 : Certification fournisseurs obligatoire</li>
    </ul>

    <h3>Sanctions</h3>
    <ul>
      <li>Amendes : 50,000 à 500,000 EUR selon la gravité</li>
      <li>Suspension d'agrément : 6 mois à 2 ans</li>
      <li>Inscription sur liste noire EU</li>
    </ul>
  </section>

  <section>
    <h2>Recommandations Pratiques</h2>

    <h3>Pour les Laboratoires Pharmaceutiques</h3>
    <ol>
      <li>Auditez vos fournisseurs actuels</li>
      <li>Mettez à jour vos cahiers des charges</li>
      <li>Renforcez vos contrôles réception</li>
      <li>Formez vos équipes qualité</li>
    </ol>

    <h3>Pour les Fournisseurs</h3>
    <ol>
      <li>Anticipez la certification</li>
      <li>Investissez dans les analyses</li>
      <li>Documentez rigoureusement</li>
      <li>Formez vos équipes</li>
    </ol>
  </section>

  <section>
    <h2>Ressources et Support</h2>

    <h3>Organismes de Référence</h3>
    <ul>
      <li>EMA : Guidelines techniques</li>
      <li>EFSA : Avis scientifiques</li>
      <li>Pharmacopée Européenne : Monographies</li>
    </ul>

    <h3>Formation et Conseil</h3>
    <p>
      Des organismes spécialisés proposent formations et accompagnement pour la mise en conformité.
    </p>
  </section>

  <footer>
    <p>
      La réglementation 2024 renforce considérablement le cadre juridique tout en offrant de meilleures garanties qualité pour l'industrie pharmaceutique.
    </p>
  </footer>
</article>

        `,
        excerpt: 'Nouvelle réglementation européenne 2024 pour les concombres de mer pharmaceutiques : exigences, traçabilité, limites contaminants.',
        metaTitle: 'Réglementation EU 2024 Concombres de Mer Pharmaceutiques - Guide Complet',
        metaDesc: 'Nouvelle réglementation européenne 2024 concombres mer pharmaceutiques. Exigences traçabilité, limites contaminants, certification.',
        keywords: 'réglementation concombres mer 2024, eu pharmaceutique, traçabilité holothuries, limites contaminants',
        featuredImage: '/images/blog/reglementation-2024.jpg',
        published: true,
        publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Il y a 1 semaine
        author: 'Expert Réglementaire'
      }
    })
  ]);

  console.log(`✅ ${blogPosts.length} articles de blog créés`);
//   5 creation des admin

  const admins = await Promise.all([
    prisma.admin.create({
      data: {
        name: 'admin1',
        email: 'admin1@cosmopharmal-industry.com',
        password: await bcrypt.hash('admin1', 10),
        role: 'admin'
      }
    }),
    prisma.admin.create({
      data: {
        name: 'admin2',
        email: 'admin2@cosmopharmal-industry.com',
        password: await bcrypt.hash('admin2', 10),
        role: 'admin'
      }
    })
  ]);
  console.log(`✅ ${admins.length} admin  créés`);

  console.log('🎉 Seeding terminé avec succès!');
  
  // Résumé des données créées
  console.log('\n📊 RÉSUMÉ DES DONNÉES CRÉÉES:');
  console.log(`- ${categories.length} catégories`);
  console.log(`- ${products.length} produits`);
  console.log(`- ${productCategoryLinks.length} associations produit-catégorie`);
  console.log(`- ${submissions.length} soumissions`);
  console.log(`- ${blogPosts.length} articles de blog`);
  console.log(`- ${admins.length} admin  créés`);

}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });