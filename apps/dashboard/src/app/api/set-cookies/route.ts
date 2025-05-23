// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextRequest , NextResponse } from "next/server";
import { cookies } from 'next/headers'

export async function POST(req: Request) {
  const body = await req.json();
  const cookieStore = await cookies();

  cookieStore.set('token', body.token, { maxAge: 3600 });
  console.log('testing login ', body.token);

  return new Response('Successfully saved token', {
    status: 200,
  })
}

export async function GET() {
  const cookieStore = await cookies();
  // const token = cookies().get('token')?.value;

  const cookie = cookieStore.get('token');

  return Response.json({ token: cookie?.value });
}

export async function DELETE() {
  const cookieStore = await cookies();
  // const token = cookies().get('token')?.value;

  const cookie = cookieStore.delete('token');

  return new Response('Successfully delete cookies', {
    status: 200,
  })
}