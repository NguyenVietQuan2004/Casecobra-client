export async function POST(request: Request) {
  const res = await request.json();
  const { accessToken } = res;
  return Response.json(
    { ...res },
    {
      status: 200,
      headers: {
        "Set-Cookie": `SessionToken=${accessToken}; Path=/; HttpOnly; `,
        "Content-Type": "application/json",
      },
    }
  );
}
