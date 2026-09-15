import { prisma } from "../lib/prisma";

export default async function TestPage() {
  // Create a test user every time this page loads
  const newUser = await prisma.user.create({
    data: {
      phone: `07${Math.floor(Math.random() * 100000000)}`,
      name: "Test User",
    },
  });

  // Fetch all users from the database
  const allUsers = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>Test Page — Users in Database</h1>
      <p>Just created: {newUser.name} ({newUser.phone})</p>
      <hr />
      <h2>All Users:</h2>
      <ul>
        {allUsers.map((user) => (
          <li key={user.id}>
            {user.name} — {user.phone} — {user.createdAt.toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}