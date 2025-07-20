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
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaGlobe } from "react-icons/fa";

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
        toast.success("Message envoyé avec succès!", {
          description: "Nous vous contacterons bientôt.",
        });
        form.reset();
      } else {
        toast.error(result.error || "Échec de l'envoi. Veuillez réessayer.");
      }
    } catch (error) {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const { data, error, isLoading } = useSWR("/api/contactDetails", fetcher);
  const contactInfo = data?.data?.[0] || null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="mt-12 text-5xl text-[#147be2] font-extrabold font-oswald text-center">
        Contactez-nous
      </h2>
      <div className="flex flex-col md:flex-row gap-8 p-6 dark:bg-black mt-12">
        {/* Contact Form Card */}
        <Card className="w-full md:w-1/2">
          <CardHeader>
            <CardTitle className="text-2xl text-[#147be2] font-bold">
              Envoyez-nous un message
            </CardTitle>
            <CardDescription>
              Remplissez ce formulaire et nous vous répondrons dans les plus brefs délais.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom complet</FormLabel>
                      <FormControl>
                        <Input placeholder="Votre nom" {...field} />
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
                      <FormLabel>Adresse email</FormLabel>
                      <FormControl>
                        <Input placeholder="votre@email.com" {...field} />
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
                      <FormLabel>Sujet</FormLabel>
                      <FormControl>
                        <Input placeholder="Objet de votre message" {...field} />
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
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Décrivez votre demande en détail..."
                          rows={5}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    className="w-full bg-[#147be2] font-oswald text-xl text-white hover:bg-[#0d6bcf]"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    {isSubmitting ? "Envoi en cours..." : "Envoyer"}
                  </Button>
                </motion.div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Contact Information Card */}
        <Card className="w-full md:w-1/2">
          <CardHeader>
            <CardTitle className="text-2xl text-[#147be2] font-bold">
              Nos coordonnées
            </CardTitle>
            <CardDescription>
              Vous pouvez également nous contacter directement via ces informations.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#147be2]"></div>
              </div>
            ) : error ? (
              <div className="text-red-500">Erreur: {error.message}</div>
            ) : contactInfo ? (
              <>
                {/* Company Info */}
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-[#147be2]">
                    {contactInfo.companyName || "Notre entreprise"}
                  </h3>
                  {contactInfo.address && (
                    <div className="flex items-start gap-3">
                      <FaMapMarkerAlt className="text-[#147be2] mt-1 flex-shrink-0" />
                      <div>
                        <p>{contactInfo.address}</p>
                        {contactInfo.postalCode && (
                          <p>Code postal: {contactInfo.postalCode}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Contact Details */}
                <div className="space-y-4">
                  {contactInfo.phone || contactInfo.mobilePhone
                    ?

                    <div className="flex items-center gap-3">
                      <FaPhone className="text-[#147be2]" />
                      <div>
                        {contactInfo.phone && (
                          <p>Téléphone: {contactInfo.phone}</p>
                        )}
                        {contactInfo.mobilePhone && (
                          <p>Mobile: {contactInfo.mobilePhone}</p>
                        )}
                      </div>
                    </div> : ""
                  }

                  {contactInfo.email && (
                    <div className="flex items-center gap-3">
                      <FaEnvelope className="text-[#147be2]" />
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="hover:underline"
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                  )}

                  {contactInfo.website && (
                    <div className="flex items-center gap-3">
                      <FaGlobe className="text-[#147be2]" />
                      <a
                        href={contactInfo.website.startsWith('http') ? contactInfo.website : `https://${contactInfo.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {contactInfo.website}
                      </a>
                    </div>
                  )}
                </div>

                {/* Business Hours */}
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-[#147be2] flex items-center gap-2">
                    <FaClock /> Horaires d'ouverture
                  </h3>
                  <div className="space-y-1">
                    <p className="flex justify-between">
                      <span>Lundi - Vendredi:</span>
                      <span>{contactInfo.businessHours || "9:00 - 17:00"}</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Samedi:</span>
                      <span>Fermé</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Dimanche:</span>
                      <span>Fermé</span>
                    </p>
                  </div>
                </div>

                {/* Legal Info */}
                {(contactInfo.fiscalCode || contactInfo.registrationNumber) && (
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="font-medium text-[#147be2]">Informations légales</h4>
                    {contactInfo.fiscalCode && (
                      <p>Numéro Fiscal: {contactInfo.fiscalCode}</p>
                    )}
                    {contactInfo.registrationNumber && (
                      <p>Numéro d'enregistrement: {contactInfo.registrationNumber}</p>
                    )}
                  </div>
                )}
              </>
            ) : (
              <p className="text-gray-500">Aucune information de contact disponible</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}