// app/api/submissions/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { submissionSchema } from '@/lib/validation';
import z from 'zod';
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validation des données
    const validatedData = submissionSchema.parse(body);
    
    // Vérifier que le produit existe
    const product = await prisma.product.findUnique({
      where: { id: validatedData.productId }
    });
    
    if (!product) {
      return NextResponse.json(
        { error: 'Produit non trouvé' },
        { status: 404 }
      );
    }
    
    // Créer la soumission
    const submission = await prisma.submission.create({
      data: {
        supplier: validatedData.supplier,
        email: validatedData.email,
        phone: validatedData.phone || null,
        company: validatedData.company || null,
        website: validatedData.website || null,
        productId: validatedData.productId,
        quantity: validatedData.quantity,
        price: validatedData.price || null,
        quality: validatedData.quality || null,
        origin: validatedData.origin,
        message: validatedData.message,
        certifications: validatedData.certifications || null,
        status: 'PENDING'
      },
      include: {
        product: {
          select: {
            name: true,
            slug: true
          }
        }
      }
    });
    
    // TODO: Envoyer email de notification aux admins
    // TODO: Envoyer email de confirmation au fournisseur
    
    return NextResponse.json({
      message: 'Soumission créée avec succès',
      submissionId: submission.id
    });
    
  } catch (error) {
    console.error('Erreur lors de la création de la soumission:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Données invalides',
          details: error 
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Erreur serveur interne' },
      { status: 500 }
    );
  }
}

// GET pour récupérer les soumissions (admin only)
export async function GET(request: NextRequest) {
  try {
    // TODO: Ajouter authentification admin
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    
    const where = status ? { status: status as any } : {};
    
    const [submissions, total] = await Promise.all([
      prisma.submission.findMany({
        where,
        include: {
          product: {
            select: {
              name: true,
              slug: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      prisma.submission.count({ where })
    ]);
    
    return NextResponse.json({
      submissions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
    
  } catch (error) {
    console.error('Erreur lors de la récupération des soumissions:', error);
    
    return NextResponse.json(
      { error: 'Erreur serveur interne' },
      { status: 500 }
    );
  }
}