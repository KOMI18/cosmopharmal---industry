export type Submission = {
    id: string;
    supplier: string;
    email: string;
    phone?: string;
    company?: string;
    website?: string;
    productId: string;
    quantity: string;
    price?: string;
    quality?: string;
    origin: string;
    message: string;
    certifications?: string;
    acceptTerms: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
  