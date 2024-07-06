import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookie = cookies();
  const accessToken = cookie.get("SessionToken");

  if (accessToken) {
    // Response.json({ hasAccessToken: true }, { status: 200 });
    return new Response(JSON.stringify({ hasAccessToken: true }), { status: 200 });
  } else {
    // Response.json({ hasAccessToken: false }, { status: 400 });
    return new Response(JSON.stringify({ hasAccessToken: false }), { status: 200 });
  }
}
