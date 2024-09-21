import { NextResponse } from 'next/server';
import { getPaintingsFull } from '@/app/api/peinture/getPaintings';

export async function GET() {
  const res = await getPaintingsFull();

  return NextResponse.json({ res });
}
