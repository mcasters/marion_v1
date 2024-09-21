import { NextResponse } from 'next/server';
import { getPostsFull } from '@/app/api/post/getPosts';

export async function GET() {
  const res = await getPostsFull();

  return NextResponse.json({ res });
}
