"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { z } from "zod";
import useSWR, { mutate } from "swr";
import { fetcher } from "@/lib/utils/fetcher";

// Define Zod schema for validation
const contactSchema = z.object({
  companyName: z.string().min(1, "Company Name is required"),
  address: z.string().optional(),
  postalCode: z.string().optional(),
  fiscalCode: z.string().optional(),
  registrationNumber: z.string().optional(),
  phone: z.string().min(1, "Phone number is required"),
  mobilePhone: z.string().optional(),
  email: z.string().email("Invalid email address"),
  website: z.string().url("Invalid website URL").optional(),
  businessHours: z.string().optional(),
});

export default function ContactPage() {
  const [contactDetails, setContactDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    companyName: "",
    address: "",
    postalCode: "",
    fiscalCode: "",
    registrationNumber: "",
    phone: "",
    mobilePhone: "",
    email: "",
    website: "",
    businessHours: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    try {
      contactSchema.parse(form); // Validate form data
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
      toast("Please fix the errors.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call to submit the form
      const response = await fetch("/api/contactDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      console.log(data);
      // Reset the form fields
      setForm({
        companyName: "",
        address: "",
        postalCode: "",
        fiscalCode: "",
        registrationNumber: "",
        phone: "",
        mobilePhone: "",
        email: "",
        website: "",
        businessHours: "",
      });
      toast("Contact added successfully.");
      mutate("/api/contactDetails");
    } catch (error) {
      console.error("Error submitting form:", error);

      toast("Could not add contact.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      mutate(
        "/api/contactDetails",
        (currentData) => ({
          ...currentData,
          data: currentData.data.filter((contact) => contact.id !== id),
        }),
        false // Skip revalidation for now
      );
      const response = await fetch(`/api/contactDetails/?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // Include any authentication headers, if necessary
        },
      });
      if (response.ok) {
        toast.success("Contact deleted successfully.");
        mutate("/api/contactDetails"); // Revalidate the data
      } else {
        toast.error("Soothing went wrong");
      }
    } catch (error) {
      toast.error("Error");
    }
  };

  const { data, error, isLoading } = useSWR("/api/contactDetails", fetcher);
  // console.log(data?.data);;

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Insert Contact Details</h2>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            {[
              { name: "companyName", label: "Company Name" },
              { name: "address", label: "Address" },
              { name: "postalCode", label: "Postal Code" },
              { name: "fiscalCode", label: "Fiscal Code" },
              { name: "registrationNumber", label: "Registration Number" },
              { name: "phone", label: "Phone" },
              { name: "mobilePhone", label: "Mobile Phone" },
              { name: "email", label: "Email" },
              { name: "website", label: "Website" },
              { name: "businessHours", label: "Business Hours" },
            ].map(({ name, label }) => (
              <div key={name}>
                <label htmlFor={name} className="block text-sm font-medium">
                  {label}
                </label>
                <Input
                  id={name}
                  type="text"
                  value={form[name]}
                  onChange={(e) => setForm({ ...form, [name]: e.target.value })}
                  required={
                    name === "companyName" ||
                    name === "email" ||
                    name === "phone"
                  }
                />
                {errors[name] && (
                  <p className="text-red-500 text-sm">{errors[name]}</p>
                )}
              </div>
            ))}

            <div className="col-span-full">
              <Button
                type="submit"
                className="w-full bg-[#147be2] font-oswald text-xl text-white hover:bg-transparent hover:text-[#147be2] hover:border"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">View Contact Details</h2>
        <div className="grid grid-cols-1 gap-4">
          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error.message}</div>
          ) : data?.data.length === 0 ? (
            <p className="text-center col-span-full">No contacts found.</p>
          ) : (
            <>
              {data?.data.map((contact, index) => (
                <Card key={index} className="shadow-md">
                  <CardHeader>
                    <h3 className="text-lg font-semibold">
                      {contact.companyName}
                    </h3>
                    <h6 className="text-lg font-semibold">{contact.address}</h6>
                  </CardHeader>
                  <CardContent>
                    <p>
                      <strong>Postal Code:</strong> {contact.postalCode}
                    </p>
                    <p>
                      <strong>fiscal Code:</strong> {contact.fiscalCode}
                    </p>

                    <p>
                      <strong>Email:</strong> {contact.email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {contact.phone}
                    </p>
                    <p>
                      <strong>MobilePhone:</strong> {contact.mobilePhone}
                    </p>
                    <p>
                      <strong>Address:</strong> {contact.address || "N/A"}
                    </p>
                    <p>
                      <strong>Website:</strong> {contact.website || "N/A"}
                    </p>
                    <p>
                      <strong>Business Hours:</strong>{" "}
                      {contact.businessHours || "N/A"}
                    </p>
                  </CardContent>
                  <div className="flex justify-end p-4">
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(contact.id)}
                    >
                      Delete
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
