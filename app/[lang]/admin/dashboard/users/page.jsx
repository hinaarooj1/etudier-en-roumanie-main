"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { z } from "zod";
import useSWR, { mutate } from "swr";
import { fetcher } from "@/lib/utils/fetcher";
import { format } from "date-fns";

// Define Zod schema for validation
const userSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  placeOfResidence: z.string().min(1, "Place of residence is required"),
  passportNumber: z.string().min(1, "Passport number is required"),
  phone: z.string().min(1, "Phone number is required"),
});

export default function UserManagementPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    placeOfResidence: "",
    passportNumber: "",
    phone: "",
    isAdmin: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data, error, isLoading } = useSWR("/api/users", fetcher);

  const validateForm = () => {
    try {
      userSchema.parse(form);
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors = {};
        err.errors.forEach(({ path, message }) => {
          fieldErrors[path[0]] = message;
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Failed to create user");

      const data = await response.json();
      toast.success("User created successfully");
      setForm({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        placeOfResidence: "",
        passportNumber: "",
        phone: "",
        isAdmin: false,
      });
      mutate("/api/users");
    } catch (error) {
      toast.error(error.message || "Could not create user");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await fetch(`/api/users?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete user");

      toast.success("User deleted successfully");
      mutate("/api/users");
    } catch (error) {
      toast.error(error.message || "Could not delete user");
    }
  };

  const toggleAdminStatus = async (id, currentStatus) => {
    try {
      const response = await fetch("/api/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          id, 
          isAdmin: !currentStatus 
        }),
      });

      if (!response.ok) throw new Error("Failed to update user");

      toast.success("User updated successfully");
      mutate("/api/users");
    } catch (error) {
      toast.error(error.message || "Could not update user");
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New User</CardTitle>
          <CardDescription>Add a new user to the system</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>

              <div>
                <label htmlFor="firstName" className="block text-sm font-medium">
                  First Name
                </label>
                <Input
                  id="firstName"
                  type="text"
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  required
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium">
                  Last Name
                </label>
                <Input
                  id="lastName"
                  type="text"
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  required
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">{errors.lastName}</p>
                )}
              </div>

              <div>
                <label htmlFor="dateOfBirth" className="block text-sm font-medium">
                  Date of Birth
                </label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={form.dateOfBirth}
                  onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })}
                  required
                />
                {errors.dateOfBirth && (
                  <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>
                )}
              </div>

              <div>
                <label htmlFor="placeOfResidence" className="block text-sm font-medium">
                  Place of Residence
                </label>
                <Input
                  id="placeOfResidence"
                  type="text"
                  value={form.placeOfResidence}
                  onChange={(e) => setForm({ ...form, placeOfResidence: e.target.value })}
                  required
                />
                {errors.placeOfResidence && (
                  <p className="text-red-500 text-sm">{errors.placeOfResidence}</p>
                )}
              </div>

              <div>
                <label htmlFor="passportNumber" className="block text-sm font-medium">
                  Passport Number
                </label>
                <Input
                  id="passportNumber"
                  type="text"
                  value={form.passportNumber}
                  onChange={(e) => setForm({ ...form, passportNumber: e.target.value })}
                  required
                />
                {errors.passportNumber && (
                  <p className="text-red-500 text-sm">{errors.passportNumber}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone}</p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create User"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>User List</CardTitle>
          <CardDescription>Manage existing users</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-4">Loading users...</div>
          ) : error ? (
            <div className="text-center py-4 text-red-500">
              Error loading users: {error.message}
            </div>
          ) : data?.data?.length === 0 ? (
            <div className="text-center py-4">No users found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date of Birth
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Place of Residence
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Passport
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Verification
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data?.data?.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.firstName} {user.lastName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {format(new Date(user.dateOfBirth), "MM/dd/yyyy")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                       {user.placeOfResidence}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.passportNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {user.isVerified ? 'Verified' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => toggleAdminStatus(user.id, user.isAdmin)}
                          className={`px-2 py-1 rounded text-xs ${user.isAdmin ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
                        >
                          {user.isAdmin ? 'Admin' : 'User'}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}