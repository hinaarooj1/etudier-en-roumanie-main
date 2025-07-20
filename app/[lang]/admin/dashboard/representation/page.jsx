"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";
import { fetcher } from "@/lib/utils/fetcher";
import useSWR, { mutate } from "swr";

// Define schema
const representationSchema = z.object({
  country: z.string().optional(),
  name: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  website: z.string().optional(),
  address: z.string().optional(),
  details: z.string().optional(),
});

export default function RepresentationForm() {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [representation, setRepresentation] = useState([]);

  const [deleteLoading, setDeleteLoading] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(representationSchema),
  });
  const onSubmit = async (data) => {
    setLoading(true);
    setServerError(null);
    try {
      const response = await axios.post("/api/representation", data);
  
      mutate("/api/representation");
      toast.success("Representation created successfully!");
      setLoading(false);
    } catch (error) {
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  // Function to delete a representation
  const handleDelete = async (id) => {
    setDeleteLoading(id); // Set the ID of the representation being deleted
    try {
      mutate(
        "/api/representation",
        (currentData) => ({
          ...currentData,
          data: currentData.data.filter((contact) => contact.id !== id),
        }),
        false // Skip revalidation for now
      );
      const response = await fetch(`/api/representation/?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        toast.success("Representation deleted successfully.");
        mutate("/api/representation"); // Revalidate the data
      } else {
        toast.error("Failed to delete representation.");
      }
    } catch (error) {
      toast.error("Error deleting representation.");
    } finally {
      setDeleteLoading(null); // Clear the delete loading state
    }
  };
  // Function to fetch representations

  const {
    data,
    error,
    isLoading: fetchLoading,
  } = useSWR("/api/representation", fetcher);
   
  return (
    <div className="container mx-auto p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="  p-6 bg-white shadow-md rounded-lg space-y-4"
      >
        <h1 className="text-2xl font-semibold text-gray-800">
          Create Representation
        </h1>

        {/* Country */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <input
            {...register("country")}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.country ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm`}
          />
          {errors.country && (
            <p className="mt-1 text-sm text-red-500">
              {errors.country.message}
            </p>
          )}
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            {...register("name")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            {...register("phone")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            {...register("email")}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Website */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Website
          </label>
          <input
            {...register("website")}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.website ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm`}
          />
          {errors.website && (
            <p className="mt-1 text-sm text-red-500">
              {errors.website.message}
            </p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <textarea
            {...register("address")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          ></textarea>
        </div>

        {/* Details */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Details
          </label>
          <textarea
            {...register("details")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          ></textarea>
        </div>

        {/* Submit Button */}

        <Button
          type="submit"
          className="w-full bg-[#147be2] font-oswald text-xl text-white hover:bg-transparent hover:text-[#147be2] hover:border"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>

        {/* Server Error */}
        {serverError && (
          <p className="mt-4 text-sm text-red-500">{serverError}</p>
        )}
      </form>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">View representations Details</h2>
        <div className="grid grid-cols-1 gap-4">
          {fetchLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error.message}</div>
          ) : data?.data.length === 0 ? (
            <p className="text-center col-span-full">
              No representations found.
            </p>
          ) : (
            <>
              {data?.data.map((rep) => (
                <Card key={rep.id} className="shadow-md">
                  <CardHeader>
                    <h3 className="text-lg font-semibold">
                      {rep.name || "Unnamed Representation"}
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p>
                      <strong>Country:</strong> {rep.country || "N/A"}
                    </p>
                    <p>
                      <strong>Email:</strong> {rep.email || "N/A"}
                    </p>
                    <p>
                      <strong>Phone:</strong> {rep.phone || "N/A"}
                    </p>
                    <p>
                      <strong>Address:</strong> {rep.address || "N/A"}
                    </p>
                    <p>
                      <strong>Website:</strong>{" "}
                      {rep.website ? (
                        <a
                          href={rep.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          {rep.website}
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </p>
                    <p>
                      <strong>Details:</strong> {rep.details || "N/A"}
                    </p>
                  </CardContent>
                  <div className="flex justify-end p-4">
                    <Button
                      variant="destructive"
                      disabled={deleteLoading === rep.id}
                      onClick={() => handleDelete(rep.id)}
                    >
                      {deleteLoading === rep.id ? "Deleting..." : "Delete"}
                    </Button>
                  </div>
                </Card>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
