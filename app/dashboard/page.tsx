"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, Loader2, UserPlus, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

// Define TypeScript interfaces
interface Address {
  city: string;
  [key: string]: any;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address?: Address;
}

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.status}`);
        }

        const data: User[] = await response.json();
        setUsers(data);
        setFilteredUsers(data);
        setIsLoading(false);
      } catch (error: any) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

useEffect(() => {
  const normalizedQuery = searchQuery.toLowerCase().replace(/\s+/g, "");

  if (normalizedQuery === "") {
    setFilteredUsers(users);
    return;
  }

  const filtered = users.filter((user) => {
    const normalizedName = user.name.toLowerCase().replace(/\s+/g, "");
    const normalizedCity = user.address?.city?.toLowerCase().replace(/\s+/g, "") || "";
    const normalizedEmail = user.email.toLowerCase().replace(/\s+/g, "");
    const normalizedPhone = user.phone.replace(/\s+/g, "");

    return (
      normalizedName.includes(normalizedQuery) ||
      normalizedCity.includes(normalizedQuery) ||
      normalizedEmail.includes(normalizedQuery) ||
      normalizedPhone.includes(normalizedQuery)
    );
  });

  setFilteredUsers(filtered);
}, [searchQuery, users]);

const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
  setSearchQuery(e.target.value);
};


  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <h2 className="text-xl font-semibold">Loading users...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 max-w-md">
          <p className="font-bold">Error</p>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div className="w-full md:w-auto flex flex-col gap-2">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <ArrowLeft size={18} />
            Back
          </button>
          <h1 className="text-3xl font-bold">User Dashboard</h1>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:flex-grow-0 md:w-64">
       <input
  type="text"
  placeholder="Search by name or city..."
  value={searchQuery}
  onChange={handleSearchChange}
  className="
    w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 
    rounded-lg focus:outline-none focus:ring-2 focus:ring-primary
    text-black dark:text-white
  "
/>

            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>

      <Link
  href="/dashboard/add"
  className="
    flex items-center gap-2 px-4 py-2 
    bg-blue-600 text-white rounded-lg 
    hover:bg-blue-700 
    transition-colors
    dark:bg-blue-500 dark:hover:bg-blue-600
  "
>
  <UserPlus size={18} />
  <span>Add User</span>
</Link>

        </div>
      </div>

      {filteredUsers.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">No users found matching your search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
                <div className="space-y-2 text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <span className="font-medium text-foreground">Email:</span> {user.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-medium text-foreground">Phone:</span> {user.phone}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-medium text-foreground">City:</span> {user.address?.city || "N/A"}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
