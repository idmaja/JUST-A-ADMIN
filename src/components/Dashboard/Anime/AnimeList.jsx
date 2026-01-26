import prisma from "@/services/prisma";
import { Star } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

const AnimeList = ({ api, titleValue, setSelectedAnime }) => {
  return (
    <div className="grid grid-cols-2 gap-4 px-0 mb-10 md:grid-cols-8 sm:grid-cols-3">
      {api.data?.map((anime, index) => {
        return (
          <div
            onClick={() => setSelectedAnime(anime)}
            className="transition-all cursor-pointer text-color-primary hover:text-color-secondary"
            key={index}
          >
            <Image
              src={anime.images.webp.large_image_url}
              alt={anime.title}
              width={500}
              height={500}
              className="object-cover w-full h-64 rounded"
            />
            {titleValue && (
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center">
                  <Star size={10} weight="light" className="mr-2" />
                  {anime.score}
                </div>
                {anime.type}
              </div>
            )}
            <h3 className="pt-1 font-bold md:text-xl text-md">{anime.title}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default AnimeList;

