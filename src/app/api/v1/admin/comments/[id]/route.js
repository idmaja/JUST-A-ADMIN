import prisma from "@/services/prisma";

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    await prisma.comment.delete({ where: { id } });
    return new Response(JSON.stringify({ status: 200, isDeleted: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ status: 500, isDeleted: false }), {
      headers: { "Content-Type": "application/json" },
    });
  }
}