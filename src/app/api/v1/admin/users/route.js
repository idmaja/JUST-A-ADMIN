import prisma from "@/services/prisma";

export async function POST(req) {
  try {
    const { username, email, password, role } = await req.json();


    if (!username || !email || !password || !role) {
      return new Response(
        JSON.stringify({ status: 400, message: "All fields are required" }),
        { headers: { "Content-Type": "application/json" } }
      );
    }


    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return new Response(
        JSON.stringify({ status: 409, message: "User with this email already exists" }),
        { headers: { "Content-Type": "application/json" } }
      );
    }


    const newUser = await prisma.user.create({
      data: { username, email, password, role }
    });

    return new Response(
      JSON.stringify({ status: 201, isCreated: true, user: newUser }),
      { headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    
    return new Response(
      JSON.stringify({ status: 500, isCreated: false, error: error.message }),
      { headers: { "Content-Type": "application/json" } }
    );
  }
}
