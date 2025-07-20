"use client";
import img_1 from "../../../public/complete/1.jpg";
import img_2 from "../../../public/complete/2.jpg";
import img_3 from "../../../public/complete/3.jpg";
import img_4 from "../../../public/complete/4.jpg";
import img_5 from "../../../public/complete/5.jpg";
import img_6 from "../../../public/complete/6.jpg";
import img_7 from "../../../public/complete/7.jpg";
import img_8 from "../../../public/complete/8.jpg";
import img_9 from "../../../public/complete/9.jpg";
import img_10 from "../../../public/complete/10.jpg";
import img_11 from "../../../public/complete/11.jpg";
import img_13 from "../../../public/complete2/13.jpg";
import img_14 from "../../../public/complete2/14.jpg";
import img_15 from "../../../public/complete2/15.jpg";
import img_16 from "../../../public/complete2/16.jpg";
import img_17 from "../../../public/complete2/17.jpg";
import img_18 from "../../../public/complete2/18.jpg";
import img_19 from "../../../public/complete2/19.jpg";
import img_20 from "../../../public/complete2/20.jpg";
import img_21 from "../../../public/complete2/21.jpg";
import img_22 from "../../../public/complete2/22.jpg";
import img_23 from "../../../public/complete2/23.jpg";
import img_24 from "../../../public/complete2/24.jpg";
import img_25 from "../../../public/complete2/25.jpg";
import img_26 from "../../../public/complete2/26.jpg";
import img_27 from "../../../public/complete2/27.jpg";
import img_28 from "../../../public/complete2/28.jpg";
import img_29 from "../../../public/complete2/29.jpg";
import img_30 from "../../../public/complete2/30.jpg";
import img_32 from "../../../public/complete2/32.jpg";
import img_33 from "../../../public/complete2/33.jpg";
import img_34 from "../../../public/complete2/34.jpg";
import img_35 from "../../../public/complete2/35.jpg";

const images = [
  img_1,
  img_2,
  img_3,
  img_4,
  img_5,
  img_6,
  img_7,
  img_8,
  img_9,
  img_10,
  img_11,
  img_13,
  img_14,
  img_15,
  img_16,
  img_17,
  img_18,
  img_19,
  img_20,
  img_21,
  img_22,
  img_23,
  img_24,
  img_25,
  img_26,
  img_27,
  img_28,
  img_29,
  img_30,
  img_32,
  img_33,
  img_34,
  img_35,
  // Add more images here
];
// const cards = [
//   {
//     title: "Etudier en Roumanie",
//     src: img_1,
//   },
//   {
//     title: "Système d'éducation",
//     src: img_2,
//   },
//   {
//     title: "Universités en Roumanie",
//     src: img_3,
//   },
//   {
//     title: "Étudiants internationaux",
//     src: "https://images.unsplash.com/photo-1486915309851-b0cc1f8a0084?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     title: "Inscription en Roumanie",
//     src: "https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     title: "Inscription universitaire en Roumanie",
//     src: "https://images.unsplash.com/photo-1600271772470-bd22a42787b3?q=80&w=3072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     title: "Conditions d'inscription",
//     src: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=3070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     title: "Aide financière",
//     src: "https://images.unsplash.com/photo-1486915309851-b0cc1f8a0084?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     title: "Délai de dépôt du dossier",
//     src: "https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     title: "Visa d'études",
//     src: "https://images.unsplash.com/photo-1600271772470-bd22a42787b3?q=80&w=3072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     title: "Logements et coût de vie",
//     src: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=3070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     title: "Frais de scolarité",
//     src: "https://images.unsplash.com/photo-1486915309851-b0cc1f8a0084?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     title: "Étaper pour étudier en Roumanie",
//     src: "https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     title: "Calendrier des inscriptions",
//     src: "https://images.unsplash.com/photo-1600271772470-bd22a42787b3?q=80&w=3072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     title: "Classement des Universités",
//     src: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=3070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
// ];
const cards = [
  {
    title: "Etudier en Roumanie",
    src: images[0],
  },
  {
    title: "Système d'éducation",
    src: images[1],
  },
  {
    title: "Universités en Roumanie",
    src: images[2],
  },
  {
    title: "Étudiants internationaux",
    src: images[3],
  },
  {
    title: "Inscription en Roumanie",
    src: images[4],
  },
  {
    title: "Inscription universitaire en Roumanie",
    src: images[5],
  },
  {
    title: "Conditions d'inscription",
    src: images[6],
  },
  {
    title: "Aide financière",
    src: images[7],
  },
  {
    title: "Délai de dépôt du dossier",
    src: images[8],
  },
  {
    title: "Visa d'études",
    src: images[9],
  },
  {
    title: "Logements et coût de vie",
    src: images[10],
  },
  {
    title: "Frais de scolarité",
    src: images[0],
  },
  {
    title: "Étaper pour étudier en Roumanie",
    src: images[1],
  },
  {
    title: "Calendrier des inscriptions",
    src: images[2],
  },
  {
    title: "Classement des Universités",
    src: images[3],
  },
];
const cards1 = [
  {
    title: "Etudes universitaires en Europe",
    src: images[12],
  },
  {
    title: "Universités en langues étrangères",
    src: images[13],
  },
  {
    title: "Langue Roumaine",
    src: images[14],
  },
  {
    title: "Academie d' études économiques",
    src: images[15],
  },
  {
    title: "Spécialisations dans des Universités",
    src: images[16],
  },
  {
    title: "Reconnaissance des diplômes",
    src: images[17],
  },
  {
    title: "Médecine en Roumanie",
    src: images[18],
  },
  {
    title: "Etudier la médecine",
    src: images[19],
  },
  {
    title: "Faculté de médecine",
    src: images[20],
  },
  {
    title: "Inscription en médecine",
    src: images[21],
  },
  {
    title: "Pharmacie en Roumanie",
    src: images[22],
  },
  {
    title: "Faculté de pharmacie en Roumanie",
    src: images[23],
  },
  {
    title: "Formation en kinésithérapie",
    src: images[24],
  },
  {
    title: "Spécialisations en médecine",
    src: images[25],
  },
  {
    title: "Etudes de médecine en Roumanie",
    src: images[26],
  },
  {
    title: "Médecine Cluj Napoca",
    src: images[27],
  },
  {
    title: "Médecine Iasi",
    src: images[28],
  },
  {
    title: "Faculté de Médecine d'Iasi",
    src: images[29],
  },
  {
    title: "Médecine dentaire en Roumanie",
    src: images[30],
  },
  {
    title: "Kinésithérapie en Roumanie",
    src: images[31],
  },
  {
    title: "Licence, Master ou Doctorat",
    src: images[32],
  },
  {
    title: "Transfert des études médicales",
    src: images[33],
  },
  {
    title: "Université de Médecine deTimisoara",
    src: images[34],
  },
  {
    title: "Université d' Arad",
    src: images[0],
  },
  {
    title: "Étudiants Français en Médecine à l'étranger",
    src: images[1],
  },
  {
    title: "Etudes médicales en Roumanie",
    src: images[2],
  },
  {
    title: "Etudier la médecine en Roumanie",
    src: images[3],
  },
  {
    title: "Médecine dentaire en Europe",
    src: images[4],
  },
  {
    title: "Spécialisations médicales en Europe",
    src: images[5],
  },
  {
    title: "Études de médecine dentaire en Europe",
    src: images[6],
  },
  {
    title: "Année préparatoire en Europe",
    src: images[0],
  },
];

const cards2 = [
  {
    title: "Génie civil en Roumanie",
    src: images[22],
  },
  {
    title: "Universités polytechniques",
    src: images[24],
  },
  {
    title: "Université Politehnica de Bucharest",
    src: images[25],
  },
];
const cards3 = [
  {
    title: "Études de Médecine vétérinaire en Roumanie",
    src: images[32],
  },
  {
    title: "Admission aux études de médecine vétérinaires en Roumanie",
    src: images[0],
  },
];
const cards4 = [
  {
    title: "Profession santé",
    src: images[2],
  },
  {
    title: "Médecins Roumains",
    src: images[4],
  },
];

const cards5 = [
  {
    title: "Médecine en Belgique",
    src: images[29],
  },
];
const tabs = [
  "ETUDES EN ROUMANIE",
  "LICENCE-MASTER-SPÉCIALISATION",
  "Etudes techniques",
  "Medecine Veterinaire",
  "Professionnels de santé",
  "Médecine en Belgique",
];

import { ArrowLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { pageContent } from "@/data/content";
import FocusCards from "@/components/ui/focus-cards";
import {
  containerVariants,
  fadeIn,
  itemVariants,
  pageTransition,
  staggerContainer,
} from "@/lib/motionVarients";
import { motion } from "framer-motion";

export default function HomeContent() {
  const [showTabs, setShowTabs] = useState(true);
  const [group] = useState(pageContent);
  const [activeService, setActiveService] = useState("");
  const [activeContent, setActiveContent] = useState(null);

  const handleCardClick = (title) => {
    const content = group.find((item) => item.title === title);
    setActiveContent(content);
  };

  // Remove href attributes from content
  group.forEach((item) => {
    item.content = item.content.replace(/href="[^"]*"/g, "");
  });

  const getCardsForService = (service) => {
    switch (service) {
      case "ETUDES EN ROUMANIE":
        return cards;
      case "LICENCE-MASTER-SPÉCIALISATION":
        return cards1;
      case "Etudes techniques":
        return cards2;
      case "Medecine Veterinaire":
        return cards3;
      case "Professionnels de santé":
        return cards4;
      case "Médecine en Belgique":
        return cards5;
      default:
        return cards; // Default to first set of cards
    }
  };

  const renderContent = () => {
    if (activeContent) {
      return (
        <motion.div
          variants={pageTransition}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <div>
            <Button
              onClick={() => setActiveContent(null)}
              className="flex items-center space-x-2 text-red-600 font-bold"
            >
              <ArrowLeft size={16} />
              <span>Retour aux cartes</span>
            </Button>
            <h2 className="text-2xl bold text-[#147be2]">
              {activeContent?.title}
            </h2>
            <motion.div
              variants={pageTransition}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.1, duration: 0.2 }}
            >
              <div
                dangerouslySetInnerHTML={{ __html: activeContent?.content }}
              />
            </motion.div>

            <Button
              onClick={() => setActiveContent(null)}
              className="flex items-center space-x-2 text-red-600 font-bold"
            >
              <ArrowLeft size={16} />
              <span>Retour aux cartes</span>
            </Button>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <h1 className="text-2xl ml-5 font-bold text-[#147be2]">
          {activeService}
        </h1>
        <div className="mt-6 h-[100vh]">
          <Button
            onClick={() => {
              setActiveService(null);
              setShowTabs(true);
            }}
            className="flex items-center space-x-2 text-red-600 font-bold"
          >
            <ArrowLeft size={16} />
            <span>Retour </span>
          </Button>
          <FocusCards
            data={getCardsForService(activeService)}
            onCardClick={handleCardClick}
          />
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      className="min-h-screen container"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Small Screen View */}
      <div className="md:hidden">
        {showTabs ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="p-4">
              <motion.h4
                variants={fadeIn("up")}
                className="mb-4 bold text-[#147be2]"
              >
                ETUDES EN ROUMANIE
              </motion.h4>
              <div className="flex flex-col gap-4">
                {tabs.map((service, index) => (
                  <motion.div
                    key={service}
                    variants={itemVariants}
                    custom={index}
                  >
                    <Button
                      className={`w-full justify-between text-left whitespace-normal break-words text-wrap  ${
                        activeService === service
                          ? "bg-[#147be2] text-gray-900"
                          : "text-gray-700 hover:bg-gray-200"
                      }`}
                      variant="ghost"
                      onClick={() => {
                        setActiveService(service);
                        setShowTabs(false);
                      }}
                    >
                      <span className="text-[#147be2]">{service}</span>
                      <ChevronRight className="h-5 w-5 flex-shrink-0 text-[#147be2]" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <div
            className="h-[100vh] overflow-scroll custom-scrollbar"
            style={{
              scrollbarWidth: "2px",
              scrollbarColor: "#147be2 #ffff",
            }}
          >
            {/* Keep the existing style block */}
            {renderContent()}
          </div>
        )}
      </div>

      {/* Desktop View */}
      <div className="hidden md:grid grid-cols-[250px_1fr] gap-4">
        <motion.div
          className="sticky top-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h4
            variants={fadeIn("up")}
            className="mb-4 bold text-[#147be2]"
          >
            ETUDES EN ROUMANIE
          </motion.h4>
          <div className="flex flex-col gap-4">
            {tabs.map((service, index) => (
              <motion.div key={service} variants={itemVariants} custom={index}>
                <Button
                  className={`w-full justify-between text-left whitespace-normal break-words text-wrap ${
                    activeService === service
                      ? "bg-[#147be2] text-white"
                      : "hover:bg-gray-300"
                  }`}
                  variant="ghost"
                  onClick={() => {
                    setActiveService(service);
                    setShowTabs(false);
                  }}
                >
                  <span>{service}</span>
                  <ChevronRight size={22} className="h-5 w-5 flex-shrink-0" />
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <div
          className="h-[100vh] overflow-scroll custom-scrollbar"
          style={{
            scrollbarWidth: "2px",
            scrollbarColor: "#147be2 #ffff",
          }}
        >
          {/* Keep the existing style block */}
          {renderContent()}
        </div>
      </div>
    </motion.div>
  );
}
