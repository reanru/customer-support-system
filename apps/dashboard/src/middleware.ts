import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from 'next/headers'

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const cookieStore = await cookies();
    cookieStore.get('token');

    console.log('testing middleware ', cookieStore.get('tokens')?.value);

    const token = cookieStore.get('token')?.value;

    if(token){
        if(pathname === '/login') return NextResponse.redirect(new URL('/', request.url));
        else return NextResponse.next();
    }else{
        if(pathname === '/login') return NextResponse.next();
        else return NextResponse.redirect(new URL('/login', request.url));
    }

}

export const config = {
    matcher: ["/", "/user","/conversation" ,"/login"]
}