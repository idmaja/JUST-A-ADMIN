import prisma from "@/services/prisma";

export async function GET(req, res) {
    try {
        const anime = await prisma.anime.findMany();
        return new Response(JSON.stringify(anime), { status: 200 });
    } catch (error) {
        
        return new Response(JSON.stringify({ error: "Failed to fetch anime" }), { status: 500 });
    }
}

export async function POST(req) {
    const { anime_mal_id, anime_title, anime_image_url, anime_type, desc } = await req.json();
    const data = { anime_mal_id, anime_title, anime_image_url, anime_type, desc };

    try {

        const existingAnime = await prisma.anime.findUnique({
            where: { anime_mal_id: anime_mal_id }
        });

        if (existingAnime) {

            return new Response(JSON.stringify({ 
                status: 409,
                message: 'Anime with this MAL ID already exists.' 
            }), { status: 409 });
        }


        const createAnime = await prisma.anime.create({ data });
        return new Response(JSON.stringify({ 
            status: 200, 
            isCreated: true 
        }), { status: 200 });
    } catch (error) {
        
        return new Response(JSON.stringify({ status: 500, isCreated: false }), { status: 500 });
    }
}

export async function PUT(req) {
    const { id, anime_mal_id, anime_title, anime_image_url, anime_type, desc } = await req.json();
    const data = { anime_mal_id, anime_title, anime_image_url, anime_type, desc };

    try {
        const updateAnime = await prisma.anime.update({
            where: { id },
            data
        });
        return new Response(JSON.stringify({ status: 200, isUpdated: true }), { status: 200 });
    } catch (error) {
        
        return new Response(JSON.stringify({ status: 500, isUpdated: false }), { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    const { id } = params;

    try {
        await prisma.anime.delete({ where: { id } });
        return new Response(JSON.stringify({ status: 200, isDeleted: true }), { status: 200 });
    } catch (error) {
        
        return new Response(JSON.stringify({ status: 500, isDeleted: false }), { status: 500 });
    }
}
