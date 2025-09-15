import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';
import { ApiResponse } from '@/types/api';
import { Admin } from '@/types/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json<ApiResponse<null>>(
        { message: 'Email and password are required', success: false },
        { status: 400 }
      );
    }

    const admin = await prisma.admin.findFirst({ where: { email } });

    if (!admin) {
      return NextResponse.json<ApiResponse<null>>(
        { message: 'Invalid credentials', success: false },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return NextResponse.json<ApiResponse<null>>(
        { message: 'Invalid credentials', success: false },
        { status: 401 }
      );
    }

    const { password: _, ...adminWithoutPassword } = admin;

    return NextResponse.json<ApiResponse<Admin>>(
      { message: 'Logged in successfully', success: true, data: adminWithoutPassword },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json<ApiResponse<null>>(
      { message: 'Internal server error', success: false },
      { status: 500 }
    );
  }
}
