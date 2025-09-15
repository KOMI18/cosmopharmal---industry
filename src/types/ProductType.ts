import { Submission } from "./SoumissionsType";
export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  shortDesc?: string | null;
  specs?: string | null;

  metaTitle?: string | null;
  metaDesc?: string | null;
  keywords?: string | null;

  image?: string | null;
  gallery?: string | null;

  minQuantity?: number | null;
  maxQuantity?: number | null;
  priceRange?: string | null;
  quality?: string | null;
  origin?: string | null;

  isActive: boolean;
  featured: boolean;

  createdAt: Date;
  updatedAt: Date;

  submissions?: Submission[];
  categories?: ProductCategory[];
}




export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;

  // SEO
  metaTitle?: string;
  metaDesc?: string;

  createdAt: Date;

  // Relations
  products?: ProductCategory[];
}

export interface ProductCategory {
  productId: number;
  categoryId: number;

  // Relations (facultatif, selon besoin)
  product?: Product;
  category?: Category;
}
