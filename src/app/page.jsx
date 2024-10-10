import Image from "next/image";
import prisma from "@/services/prisma";
import UserListHome from "@/components/Dashboard/User/UserListHome";
import CollectionListHome from "@/components/Dashboard/Collection/CollectionListHome";
import CommentsListHome from "@/components/Dashboard/Comment/CommentsListHome";
import Header from "@/components/Dashboard/Header";
import { getSession } from "@/services/auth-service";

const Page = async () => {

  const session = await getSession();
  const usernameLoggedIn = session?.user?.name;

  console.log('data:', usernameLoggedIn)

  const users = await prisma.user.findMany();
  const collection = await prisma.collection.findMany();
  const comments = await prisma.comment.findMany();
  const anime = await prisma.anime.findMany();
  // console.log(anime)

  return (
    <main className="pt-8 pl-4 pr-6 -ml-0">
      <section className="mb-8 text-color-primary">
        <Image src="./just-a-logo.svg" alt="..." width={200} height={200} className="w-20 h-20 mb-3 rounded-full" />
        <h1 className="mb-2 text-2xl font-bold text-color-secondary animate-fadeIn">
          Welcome to Admin Dashboard, <span className="uppercase">{usernameLoggedIn}</span>
        </h1>
        <p className="mb-8 text-color-primary animate-fadeIn">Please select a section from the menu.</p>

        {/* Section 1: Users */}
        <Header title="Users" linkTitle="See more" linkHref="/admin/dashboard/users"/>
        <UserListHome users={users} />

        {/* Section 2: Collections */}
        <Header title="Collections" linkTitle="See more" linkHref="/admin/dashboard/collection"/>
        <CollectionListHome collections={collection} />

        {/* Section 3: Comments */}
        <Header title="Comments" linkTitle="See more" linkHref="/admin/dashboard/comments"/>
        <CommentsListHome comments={comments} />
      </section>
    </main>
  );
}

export default Page;