import { NextResponse } from 'next/server';
import { getSculpturesFull } from '@/app/api/sculpture/getSculptures';

export async function GET() {
  const res = await getSculpturesFull();
  return NextResponse.json({ res });
}
