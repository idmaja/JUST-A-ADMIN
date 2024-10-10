import CommentList from "@/components/Dashboard/Comment/CommentList";
import prisma from "@/services/prisma";

const Page = async () => {
  const comment = await prisma.comment.findMany();  // Fetch all users from the database

  return (
    <section className="w-full px-4 mt-4">
      <h1 className="text-2xl font-bold text-color-secondary">Admin Dashboard - Manage Comments</h1>
      <CommentList comment={comment} />
    </section>
  );
};

export default Page;
