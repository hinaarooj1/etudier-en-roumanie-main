"use client";
import { fetcher } from "@/lib/utils/fetcher";
import React from "react";
import useSWR from "swr";

export default function page() {
  const { data, error, isLoading } = useSWR("/api/representation", fetcher);
  // console.log(data?.data);;
  return (
    <div className="mt-4 mb-10 p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-[#147be2] text-5xl font-extrabold  font-oswald text-secondary text-center">
          Représentations à l'étranger
        </h2>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : data?.data.length === 0 ? (
          <p className="text-center col-span-full">No representations found.</p>
        ) : (
          <>
            {data?.data.map((rep) => (
              <div key={rep.id} className="mt-10">
                <h2 className=" text-xl font-semibold text-blue-600 mb-2">
                  GO INTERNATIONAL
                </h2>

                <h2 className="text-xl font-semibold text-blue-600 mb-2">
                  {rep.country}
                </h2>

                <h3 className="text-xl font-semibold text-blue-600 ">
                  Mali: <span>{rep.email}</span>
                </h3>
                <h3 className="text-xl font-semibold text-blue-600 ">
                  Phone: <span>{rep.phone}</span>
                </h3>
                <a
                  href={`${rep.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {rep.website}
                </a>
                <h3 className="text-xl font-semibold text-blue-600 ">
                  Adresse: <span>{rep.Adresse}</span>
                </h3>
                <h3 className="text-xl font-semibold text-blue-600 ">
                  <span>{rep?.details}</span>
                </h3>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
