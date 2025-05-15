"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion, useInView } from "framer-motion";
import { fetcher } from "@/lib/utils/fetcher";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values) {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Contact submitted successfully! ", {
          description: "We will get back to you soon.",
        });
        form.reset();
      } else {
        toast.error(result.error || "Failed to submit form. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const { data, error, isLoading } = useSWR("/api/contactDetails", fetcher);
   // console.log(data?.data);;

  return (
    <div>
      <h2 className="mt-12 text-5xl text-[#147be2] font-extrabold  font-oswald text-secondary text-center">
        Contactez-nous
      </h2>
      <div className="flex flex-col md:flex-row gap-8 p-6  dark:bg-black mt-12">
        <Card className="w-full md:w-1/2">
          <CardHeader>
            <CardTitle className="text-2xl text-[#147be2] font-bold">
              Contactez-nous
            </CardTitle>
            <CardDescription>
              Veuillez remplir le formulaire ci-dessous, et nous vous
              contacterons bientôt.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                className="space-y-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Votre email</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Votre adresse e-mail</FormLabel>
                      <FormControl>
                        <Input placeholder="johndoe@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Objet</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Demande de renseignements sur les services"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Votre message (optionnel)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tapez votre message ici..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 17,
                  }}
                >
                  {/* mt-4 p-2 bg-[#147be2] rounded-md text-white w-full hover:bg-transparent hover:border transition-colors flex items-center justify-center gap-2 */}
                  <Button
                    className="w-full bg-[#147be2] font-oswald text-xl text-white hover:bg-transparent hover:text-[#147be2] hover:border"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    {isSubmitting ? "Envoi..." : "Envoyer le message"}
                  </Button>
                </motion.div>
              </form>
            </Form>
          </CardContent>
        </Card>
        <Card className="w-full md:w-1/2">
          <CardHeader>
            <CardTitle className="  text-xl font-semibold">
              <h3 className="text-xl font-semibold text-[#147be2]">
                Contactez-nous
              </h3>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Veuillez remplir le formulaire ci-dessous et préciser les études
              que vous souhaitez faire, votre nationalité et votre parcours
              scolaire pour que nous puissions mieux vous guider.
            </p>

            <h3 className="text-xl font-semibold text-[#147be2]">
              Bureau Principal
            </h3>
            {isLoading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>Error: {error.message}</div>
            ) : (
              <div>
                {data?.data.map((item) => (
                  <div key={item.id}>
                    <p>
                      {item.companyName}
                      {item.address} Code postal : {item.postalCode} Numéro
                      Fiscal: {item.fiscalCode}
                      Numéro d’enregistrement : {item.registrationNumber}
                    </p>
                    <p>Téléphone: {item.phone}</p>
                    <p> Tél. mobile: {item.mobilePhone}</p>
                    <p>Email: {item.email}</p>
                    <p> {item.website}</p>
                    <h3 className="text-xl font-semibold text-[#147be2]">
                      Business Hours
                    </h3>
                    <p>Lundi - Vendredi :{item.businessHours} </p>
                    <p>Samedi - Dimanche : Fermé</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
