export async function POST(request: Request) {
  return Response.json("logout thanh cong", {
    status: 200,
    headers: {
      "Set-Cookie": `SessionToken=; Path=/; HttpOnly ;Secure; Partitioned;SameSite=None`,
      "Content-Type": "application/json",
    },
  });
}
