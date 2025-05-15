"use client";
import { Card } from "@/components/ui/card";
import React from "react";
import { motion, useInView } from "framer-motion";
import { pageTransition } from "@/lib/motionVarients";

export default function AccueilEtudiant() {
  const steps = [
    {
      title: "Recherche de logements",
      description:
        "Recherche de quelques logements à proximité de l'université selon vos critères de coût et de confort et les offres de la ville.",
    },
    {
      title: "Transfert depuis l’aéroport",
      description:
        "Accueil à l'aéroport et transport à l'hôtel. Possibilité de vous réserver un hôtel à votre goût et possibilité.",
    },
    {
      title: "Visite et signature du bail",
      description:
        "Visite de logement et assistance pour la signature du bail, la négociation du loyer et des charges.",
    },
    {
      title: "Assistance pour les démarches",
      description:
        "Assistance dans vos premières démarches : téléphone, électricité, internet.",
    },
    {
      title: "Formalités administratives",
      description:
        "Inscription finale à la faculté, traduction des documents et conseils administratifs.",
    },
    {
      title: "Découverte de l'environnement",
      description:
        "Découverte de votre nouvel environnement étudiant : culturel, religieux, et tour de la ville.",
    },
  ];

  return (
    <motion.div
      className="min-h-screen container"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <section className="py-10  font-sans">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}

          <div className="text-center mb-12">
            <h2 className="mt-10 text-5xl text-[#147be2] font-extrabold font-oswald text-secondary text-center leading-tight">
              Accueil étudiant en Roumanie
            </h2>
            <p className="font-oswald leading-relaxed max-w-2xl mx-auto">
              Commencez vos études en Roumanie en douceur avec l'assistance de
              nos collaborateurs : accueil, logement, installation et démarches
              administratives.
            </p>
          </div>

          {/* Assistance Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)",
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.2 }}
              >
                <Card className="h-60 shadow-md cursor-pointer rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-purple-100 text-purple-600 flex items-center justify-center rounded-full">
                      {/* Placeholder Icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-6 h-6"
                      >
                        <path d="M12 7v14" />
                        <path d="M16 12h2" />
                        <path d="M16 8h2" />
                        <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
                        <path d="M6 12h2" />
                        <path d="M6 8h2" />
                      </svg>
                    </div>
                    <h3 className="ml-4 text-lg font-semibold text-[#147be2] ">
                      {step.title}
                    </h3>
                  </div>
                  <p className=" leading-relaxed">{step.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
          {/* </motion.div> */}

          <motion.div
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)",
            }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.2 }}
          >
            <Card className="mt-16  rounded-lg shadow-lg p-6 dark:bg-black">
              <h3 className="text-2xl font-semibold text-[#147be2] mb-4">
                Logement étudiant : Aide à l’installation
              </h3>
              <ul className="list-disc list-inside  leading-relaxed space-y-2">
                <li>
                  La majorité des étudiants habitent dans des appartements
                  privés, les chambres universitaires étant réservées aux
                  étudiants boursiers.
                </li>
                <li>
                  Les agences immobilières demandent généralement 50% de
                  commission.
                </li>
                <li>
                  Les propriétaires demandent souvent au moins un mois d'avance.
                </li>
                <li>
                  Plus facile de trouver un logement en août et septembre.
                </li>
                <li>En Roumanie, souvent les charges sont payées à part.</li>
              </ul>
            </Card>
          </motion.div>
          {/* Student Housing Info */}
        </div>
      </section>
    </motion.div>
  );
}
