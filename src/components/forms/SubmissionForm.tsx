// components/forms/SubmissionForm.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmissionFormData , submissionSchema  } from '@/lib/validation';
import { Product } from '@/types/ProductType';
import { 
  Building2, 
  Mail, 
  Phone, 
  Globe, 
  Package, 
  Scale, 
  DollarSign, 
  Award,
  MapPin,
  FileText,
  Upload,
  CheckCircle,
  AlertCircle,
  Send
} from 'lucide-react';


interface SubmissionFormProps {
  products: Product[];
}

export default function SubmissionForm({ products }: SubmissionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<SubmissionFormData>({
    resolver: zodResolver(submissionSchema)
  });

  const selectedProduct = products.find(p => p.id.toString() === selectedProductId);

  const onSubmit = async (data: SubmissionFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/soumissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...data,
          productId: parseInt(data.productId)
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        reset();
        setSelectedProductId('');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Soumission Envoyée avec Succès !
        </h3>
        <p className="text-gray-600 mb-6">
          Merci pour votre soumission. Nos experts examineront votre offre et vous contacteront 
          dans les 48 heures.
        </p>
        <button
          onClick={() => setSubmitStatus('idle')}
          className="bg-[#43b495] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#358971] transition-colors"
        >
          Nouvelle Soumission
        </button>
        <a
          href={`https://wa.me/+33652511551?text=Bonjour%2C+je+vous+contacte+depuis+votre+site+web+car.+Je+poss%C3%A8de+un+stock+de+concombres+de+mer+%C3%A0+vendre.+%0A%0AJe+suis+int%C3%A9ress%C3%A9+par+une+collaboration.+%0A%0AProduit+de+votre+int%C3%A9r%C3%AAt%3A+${selectedProduct?.name}%0A`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25d366] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#1e8449] transition-colors"
        >
          Contacter directement
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Informations Fournisseur */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-[#43b495]" />
          Informations Fournisseur
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="supplier" className="block text-sm font-medium text-gray-700 mb-2">
              Nom du Contact *
            </label>
            <input
              type="text"
              id="supplier"
              {...register('supplier')}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#43b495]/50 focus:border-[#43b495] outline-none transition-colors ${
                errors.supplier ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Votre nom complet"
            />
            {errors.supplier && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.supplier.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Professionnel *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                id="email"
                {...register('email')}
                className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#43b495]/50 focus:border-[#43b495] outline-none transition-colors ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="contact@votreentreprise.com"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Téléphone
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                id="phone"
                {...register('phone')}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#43b495]/50 focus:border-[#43b495] outline-none transition-colors"
                placeholder="+33 1 23 45 67 89"
              />
            </div>
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
              Nom de l'Entreprise
            </label>
            <input
              type="text"
              id="company"
              {...register('company')}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#43b495]/50 focus:border-[#43b495] outline-none transition-colors"
              placeholder="Votre entreprise"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
              Site Web
            </label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="url"
                id="website"
                {...register('website')}
                className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#43b495]/50 focus:border-[#43b495] outline-none transition-colors ${
                  errors.website ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="https://votresite.com"
              />
            </div>
            {errors.website && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.website.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Informations Produit */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <Package className="w-5 h-5 text-[#43b495]" />
          Détails du Produit
        </h3>
        
        <div>
          <label htmlFor="productId" className="block text-sm font-medium text-gray-700 mb-2">
            Produit Proposé *
          </label>
          <select
            id="productId"
            {...register('productId')}
            onChange={(e) => setSelectedProductId(e.target.value)}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#43b495]/50 focus:border-[#43b495] outline-none transition-colors ${
              errors.productId ? 'border-red-300' : 'border-gray-300'
            }`}
          >
            <option value="">Sélectionnez un produit</option>
            {products.map((product) => (
              <option key={product.id} value={product.id.toString()}>
                {product.name}
              </option>
            ))}
          </select>
          {errors.productId && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.productId.message}
            </p>
          )}
          
          {selectedProduct && (
            <div className="mt-3 p-4 bg-[#43b495]/5 rounded-xl">
              <h4 className="font-medium text-gray-900 mb-1">{selectedProduct.name}</h4>
              <p className="text-sm text-gray-600 mb-2">{selectedProduct.shortDesc}</p>
              {selectedProduct.priceRange && (
                <p className="text-sm text-[#43b495] font-medium">
                  Prix marché: {selectedProduct.priceRange}
                </p>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
              Quantité Disponible *
            </label>
            <div className="relative">
              <Scale className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                id="quantity"
                {...register('quantity')}
                className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#43b495]/50 focus:border-[#43b495] outline-none transition-colors ${
                  errors.quantity ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Ex: 500kg, 1 tonne"
              />
            </div>
            {errors.quantity && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.quantity.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
              Prix Proposé
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                id="price"
                {...register('price')}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#43b495]/50 focus:border-[#43b495] outline-none transition-colors"
                placeholder="Ex: 950 EUR/kg"
              />
            </div>
          </div>

          <div>
            <label htmlFor="quality" className="block text-sm font-medium text-gray-700 mb-2">
              Grade/Qualité
            </label>
            <div className="relative">
              <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                id="quality"
                {...register('quality')}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#43b495]/50 focus:border-[#43b495] outline-none transition-colors"
                placeholder="Ex: Grade A, Premium"
              />
            </div>
          </div>

          <div>
            <label htmlFor="origin" className="block text-sm font-medium text-gray-700 mb-2">
              Origine/Provenance *
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                id="origin"
                {...register('origin')}
                className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#43b495]/50 focus:border-[#43b495] outline-none transition-colors ${
                  errors.origin ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Ex: Océan Pacifique - Australie"
              />
            </div>
            {errors.origin && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.origin.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="certifications" className="block text-sm font-medium text-gray-700 mb-2">
            Certifications Disponibles
          </label>
          <input
            type="text"
            id="certifications"
            {...register('certifications')}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#43b495]/50 focus:border-[#43b495] outline-none transition-colors"
            placeholder="Ex: ISO 22000, GMP, HACCP, MSC"
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Message et Informations Complémentaires *
        </label>
        <textarea
          id="message"
          rows={6}
          {...register('message')}
          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#43b495]/50 focus:border-[#43b495] outline-none transition-colors resize-none ${
            errors.message ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder="Décrivez votre produit, vos capacités de production, expérience, références clients, conditions de livraison, etc."
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Documents */}
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-4" />
        <h4 className="text-lg font-medium text-gray-900 mb-2">Documents Complémentaires</h4>
        <p className="text-gray-600 mb-4">
          Ajoutez vos certificats, analyses, photos de produits (optionnel)
        </p>
        <button
          type="button"
          className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
        >
          <FileText className="w-4 h-4" />
          Sélectionner des fichiers
        </button>
        <p className="text-xs text-gray-500 mt-2">
          Formats acceptés: PDF, JPG, PNG - Max 5MB par fichier
        </p>
      </div>

      {/* Terms */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="acceptTerms"
          {...register('acceptTerms')}
          className="mt-1 w-4 h-4 text-[#43b495] border-gray-300 rounded focus:ring-[#43b495]/50"
        />
        <label htmlFor="acceptTerms" className="text-sm text-gray-600">
          J'accepte les{' '}
          <a href="/conditions" className="text-[#43b495] hover:underline">
            conditions d'utilisation
          </a>{' '}
          et la{' '}
          <a href="/confidentialite" className="text-[#43b495] hover:underline">
            politique de confidentialité
          </a>. Je consens au traitement de mes données personnelles pour l'évaluation de ma candidature.
        </label>
      </div>
      {errors.acceptTerms && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {errors.acceptTerms.message}
        </p>
      )}

      {/* Submit */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`flex-1 inline-flex items-center justify-center gap-3 bg-[#43b495] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
            isSubmitting 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:bg-[#358971] hover:scale-105 shadow-lg hover:shadow-xl'
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Envoi en cours...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Envoyer ma Soumission
            </>
          )}
        </button>
        
        <button
          type="button"
          onClick={() => reset()}
          className="px-6 py-4 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
        >
          Réinitialiser
        </button>
      </div>

      {submitStatus === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-red-700 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Une erreur est survenue lors de l'envoi. Veuillez réessayer ou nous contacter directement.
          </p>
        </div>
      )}
    </form>
  );
}