export async function POST(request: Request) {
  const res = await request.json();
  const { accessToken } = res;
  const oneYearFromNow = new Date();
  oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
  return Response.json(
    { ...res },
    {
      status: 200,
      headers: {
        "Set-Cookie": `SessionToken=${accessToken}; Path=/; HttpOnly; Expires=${oneYearFromNow.toUTCString()} Secure; Partitioned;SameSite=None`,
        "Content-Type": "application/json",
      },
    }
  );
}
