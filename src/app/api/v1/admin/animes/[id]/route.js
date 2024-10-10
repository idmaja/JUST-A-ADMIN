import prisma from "@/services/prisma";

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    await prisma.anime.delete({ where: { id } });
    return new Response(JSON.stringify({ status: 200, isDeleted: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ status: 500, isDeleted: false }), {
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(req) {
    const { anime_mal_id, anime_title, anime_image_url, anime_type, desc} = await req.json()
    const data = { anime_mal_id, anime_title, anime_image_url, anime_type, desc}

    try {
        const createAnime = await prisma.anime.create({ data })
        return new Response(JSON.stringify({ status: 200, isCreated: true }), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ status: 500, isCreated: false }), { status: 500 })
    }
}
  