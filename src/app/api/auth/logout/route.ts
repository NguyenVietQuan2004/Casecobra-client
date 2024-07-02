export async function POST(request: Request) {
  return Response.json("logout thanh cong", {
    status: 200,
    headers: {
      "Set-Cookie": `SessionToken=; Path=/; HttpOnly; Max-Age=0`,
      "Content-Type": "application/json",
    },
  });
}
