"use client";

import { useEffect, useState } from "react";
import AdminPageHeader from "@/components/admin/admin-page-header";
import { approveAdminUser, deleteAdminUser, fetchAdminUsers } from "@/lib/api";
import { useAuthStore } from "@/store/auth-store";

export default function AdminUsersPage() {
  const token = useAuthStore((s) => s.token);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    if (!token) return;

    try {
      const data = await fetchAdminUsers(token);
      setUsers(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [token]);

  const handleApprove = async (userId: number) => {
    if (!token) return;

    try {
      await approveAdminUser(token, userId);
      await loadUsers();
    } catch (error) {
      console.error(error);
      alert("Failed to approve user");
    }
  };

  const handleDelete = async (userId: number) => {
    if (!token) return;

    const confirmed = window.confirm("Delete this user?");
    if (!confirmed) return;

    try {
      await deleteAdminUser(token, userId);
      await loadUsers();
    } catch (error) {
      console.error(error);
      alert("Failed to delete user");
    }
  };

  return (
    <section>
      <AdminPageHeader
        title="Users"
        description="Approve new users and manage registered accounts."
      />

      {loading ? (
        <div className="text-zinc-400">Loading users...</div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
          <table className="min-w-full text-sm">
            <thead className="border-b border-white/10 bg-white/5 text-left text-zinc-400">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-white/5">
                  <td className="px-4 py-4 font-medium text-white">{user.name}</td>
                  <td className="px-4 py-4 text-zinc-300">{user.email}</td>
                  <td className="px-4 py-4 capitalize text-zinc-300">{user.role}</td>
                  <td className="px-4 py-4">
                    {user.is_approved ? (
                      <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs text-emerald-300">
                        Approved
                      </span>
                    ) : (
                      <span className="rounded-full bg-yellow-500/15 px-3 py-1 text-xs text-yellow-300">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      {!user.is_approved && user.role !== "admin" && (
                        <button
                          onClick={() => handleApprove(user.id)}
                          className="rounded-lg border border-emerald-400/20 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-300"
                        >
                          Approve
                        </button>
                      )}

                      {user.role !== "admin" && (
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="rounded-lg border border-red-400/20 bg-red-500/10 px-3 py-2 text-xs text-red-300"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-zinc-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
