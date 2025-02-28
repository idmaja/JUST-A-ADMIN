import CollectionList from "@/components/Dashboard/Collection/CollectionList";
import prisma from "@/services/prisma";

const Page = async () => {
  const collection = await prisma.collection.findMany();  

  return (
    <section className="w-full px-4 mt-4">
      <h1 className="text-2xl font-bold text-color-secondary">Admin Dashboard - Manage Collection</h1>
      <CollectionList collection={collection} />
    </section>
  );
};

export default Page;
