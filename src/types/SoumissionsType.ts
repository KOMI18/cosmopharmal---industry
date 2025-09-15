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
    images?:string;
    message: string;
    certifications?: string;
    createdAt: Date;
    updatedAt: Date;
  };
  