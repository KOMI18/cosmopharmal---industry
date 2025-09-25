// app/soumission/page.tsx
import { generateSEO } from '@/lib/seo';
import prisma from '@/lib/prisma';
import SubmissionForm from '@/components/forms/SubmissionForm';
import { Shield, Users, Globe, CheckCircle, ArrowRight, FileText } from 'lucide-react';

export const metadata = generateSEO({
  title: 'Devenir Fournisseur - Soumettre une Offre de Concombres de Mer',
  description: 'Rejoignez notre réseau de fournisseurs certifiés. Soumettez votre offre de concombres de mer pharmaceutiques et connectez-vous avec des laboratoires mondiaux.',
  keywords: ['devenir fournisseur concombre mer', 'soumettre offre holothurie', 'fournisseur pharmaceutique marin', 'réseau fournisseurs certifiés'],
  url: '/site/soumission'
});

async function getProducts() {
  return await prisma.product.findMany({
    where: { isActive: true },
    // select: {
    //   id: true,
    //   name: true,
    //   slug: true,
    //   shortDesc: true,
    //   priceRange: true
    // },
    orderBy: { name: 'asc' }
  });
}

export default async function SubmissionPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#43b495] via-[#43b495] to-[#358971] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
              <Users className="w-4 h-4" />
              Réseau de Fournisseurs Premium
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Rejoignez Notre
              <span className="block text-white/90">Réseau d&apos;Excellence</span>
            </h1>
            
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
              Connectez-vous avec les plus grands laboratoires pharmaceutiques mondiaux. 
              Soumettez vos offres de concombres de mer et développez votre activité internationale.
            </p>
            
            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {[
                { icon: Globe, title: "Portée Mondiale", desc: "Accès à 50+ pays" },
                { icon: Shield, title: "Certification Garantie", desc: "Standards pharmaceutiques" },
                { icon: Users, title: "Support Dédié", desc: "Accompagnement expert" }
              ].map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <benefit.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold mb-1">{benefit.title}</h3>
                  <p className="text-white/80 text-sm">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-2xl p-8">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Formulaire de <span className="text-[#43b495]">Soumission</span>
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Remplissez ce formulaire pour soumettre votre offre. Nos experts examineront 
                    votre proposition et vous contacteront dans les 48h.
                  </p>
                </div>
                
                <SubmissionForm products={products} />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Why Join Us */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#43b495]" />
                  Pourquoi Nous Rejoindre ?
                </h3>
                <ul className="space-y-3">
                  {[
                    "Accès direct aux laboratoires pharmaceutiques",
                    "Commandes régulières et volumes importants",
                    "Paiements sécurisés et ponctuels",
                    "Support technique et réglementaire",
                    "Certification et formation gratuites",
                    "Réseau international de partenaires"
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#43b495] mt-0.5 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Process Steps */}
              <div className="bg-gradient-to-br from-[#43b495]/5 to-[#43b495]/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#43b495]" />
                  Processus de Validation
                </h3>
                <div className="space-y-4">
                  {[
                    { step: "1", title: "Soumission", desc: "Envoi du formulaire complet" },
                    { step: "2", title: "Évaluation", desc: "Examen par nos experts (48h)" },
                    { step: "3", title: "Validation", desc: "Vérification des certifications" },
                    { step: "4", title: "Intégration", desc: "Accès à la plateforme" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-[#43b495] text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{item.title}</h4>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Besoin d&apos;Aide ?
                </h3>
                <p className="text-gray-600 mb-4">
                  Notre équipe est disponible pour vous accompagner dans votre démarche.
                </p>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium text-gray-900">Email :</span>
                    <a href="mailto:fournisseurs@concombrespharm.com" className="text-[#43b495] hover:underline ml-2">
                      cosmopharmaindustry@gmail.co
                    </a>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Téléphone :</span>
                    <a href="tel:+33123456789" className="text-[#43b495] hover:underline ml-2">
                    +1 (504) 384 609
                    </a>
                  </div>
                </div>
                
                  
                <a
                href={`https://wa.me/+15043846092?text=Bonjour%2C+je+vous+contacte+depuis+votre+site+web+car.+Je+poss%C3%A8de+un+stock+de+concombres+de+mer+%C3%A0+vendre.+%0A%0AJe+suis+int%C3%A9ress%C3%A9+par+une+collaboration.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mt-4 bg-[#43b495] text-white px-4 py-3 rounded-xl font-medium hover:bg-[#358971] transition-colors flex items-center justify-center gap-2"
                >
                   Nous Contacter
                   <ArrowRight className="w-4 h-4" />
                </a>
              </div>

             
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}