import { z } from 'zod';

// Schema de validation
export const submissionSchema = z.object({
  // Informations fournisseur
  supplier: z.string().min(2, 'Le nom est requis'),
  email: z.string().email('Email invalide'),
  phone: z.string().optional(),
  company: z.string().optional(),
  website: z.string().url('URL invalide').optional().or(z.literal('')),
  
  // Produit
  productId: z.string().min(1, 'Veuillez sélectionner un produit'),
  quantity: z.string().min(1, 'La quantité est requise'),
  price: z.string().optional(),
  quality: z.string().optional(),
  origin: z.string().min(1, 'L\'origine est requise'),
  
  // Détails
  message: z.string().min(10, 'Veuillez fournir plus de détails (min. 10 caractères)'),
  certifications: z.string().optional(),
  
  // Conditions
  acceptTerms: z.boolean().refine(val => val === true, 'Vous devez accepter les conditions')
});
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "L'email est requis")
    .email("Format d'email invalide"),
  password: z
    .string()
    .min(1, "Le mot de passe est requis")
    .min(6, "Le mot de passe doit contenir au moins 6 caractères")
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type SubmissionFormData = z.infer<typeof submissionSchema>;