import UserList from "@/components/Dashboard/UserList";
import prisma from "@/services/prisma";

const Page = async () => {

  const users = await prisma.user.findMany();  // Fetch all users from the database

  return (
    <section className="w-full px-4 mt-4">
      <h1 className="text-2xl font-bold text-color-secondary">Admin Dashboard - Manage Users</h1>
      <UserList users={users} />
    </section>
  );
};

export default Page;
