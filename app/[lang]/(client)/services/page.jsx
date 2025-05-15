// const ServiceItem = ({ text }) => (
//   <div className="flex items-start">
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       className="flex-shrink-0 w-16 h-16 text-fuchsia-600"
//     >
//       <path d="M12 7v14" />
//       <path d="M16 12h2" />
//       <path d="M16 8h2" />
//       <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
//       <path d="M6 12h2" />
//       <path d="M6 8h2" />
//     </svg>
//     <div className="ml-5">
//       <p className="text-base">{text}</p>
//     </div>
//   </div>
// );

// export default function Page() {
//   const services = [
//     "Information sur les Eudes en Roumanie et orientation (conseil) sur le choix d’université et de programmes selon les études déjà faites et la formation que le candidat souhaite suivre ;",
//     "Guide pour la préparation du dossier d’application spécifique aux études à faire et à l'universite à fréquenter en Roumanie, et du dossier de demande de visa d’études en Roumanie (si c'est le cas) ;",
//     "Réception de votre dossier et faire la procédure pour l’obtention de la lettre d’inscription ou certificat (attestation) des études déjà faites auprès des universités et du Ministère de l'Éducation ;",
//     "Envois de votre lettre d’acceptation par un moyen sur (lettre recommandée, DHL, EMS etc.) selon l’urgence) ;",
//     "Accueil et assistance lors de l’arrivée en Roumanie : hôtel, logement (privé ou campus universitaire), procédure d’inscription finale à l’Université, ouverture de compte bancaire, procédure de demande de permis de séjours, introduction dans la communauté des étudiants (anciens et nouveaux), etc.",
//     "Rester en contact avec les étudiants pendant leurs séjours d'études en Roumanie (au cas de besoin de soutien ou de conseil) et avec les parents, à leur demande.",
//   ];

//   return (
//     <div className="font-[sans-serif] mt-20 mb-20">
//       <div className="max-w-6xl mx-auto">
//         <div className="max-w-3xl mx-auto text-center">
//           <h2 className="mt-12 text-5xl font-extrabold font-oswald text-secondary text-center leading-tight">
//             Services du guide pour étudier en Roumanie
//           </h2>
//           <p className="text-sm mt-6 leading-relaxed">
//             La mission principale du guide pour études en Roumanie étant de
//             promouvoir les offres universitaires de roumaines et d’assister les
//             étudiants internationaux qui le souhaitent, dans toutes les
//             formalités pour étudier en Roumanie, nos services se résument à
//             informer, orienter, assister les étudiants pour l’obtention
//             d’inscription, de visa, leur accueil et guide pour leur installation
//             en Roumanie.
//           </p>
//         </div>
//         <section className="dark:bg-black">
//           <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//             <div className="px-5 py-8 mt-5 lg:mt-20 lg:p-16">
//               <div className="grid grid-cols-1 gap-12 lg:gap-16 sm:grid-cols-2">
//                 {services.map((service, index) => (
//                   <ServiceItem key={index} text={service} />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </section>
//         <p className="text-sm mt-1 leading-relaxed text-justify">
//           Après l’obtention de la lettre d’inscription pour étudier en Roumanie,
//           les étudiants des pays non-membre d’UE/CEE doivent obtenir le visa
//           d’études avant de venir en Roumanie. Il en est de même pour ceux
//           prévenant des pays n’ayant pas besoin de visa pour une visite
//           touristique en Roumanie. L’application pour le visa d’études en
//           Roumanie se fait dans des représentations diplomatiques de la Roumanie
//           en étranger et pas en Roumanie. Il y’a les étudiants qui décident de
//           faire tout eux même en déposant personnellement et physiquement les
//           dossiers d’inscriptions dans le maximum d’universités possible.
//           Ceux-ci coutent beaucoup de temps et d’argent. Nous conseillons les
//           étudiants de visiter la Roumanie après leur admission puisqu’à ce
//           moment ils savent exactement l’université qui les a accepté et peuvent
//           faire la reconnaissance de la ville et prendre le logement en avance.
//         </p>
//       </div>
//     </div>
//   );
// }

import React from "react";

const ServiceItem = ({ text, index }) => (
  <div className="flex items-start group">
    {/* Animated Icon Container */}
    <div className="flex-shrink-0 w-12 h-12 bg-[#147be2] text-white rounded-full flex items-center justify-center group-hover:bg-fuchsia-600 group-hover:text-white transition duration-300">
      <span className="font-semibold text-lg">{index + 1}</span>
    </div>
    {/* Service Text */}
    <div className="ml-5">
      <p className="text-base leading-relaxed  group-hover:text-[#147be2] transition duration-300">
        {text}
      </p>
    </div>
  </div>
);

export default function Page() {
  const services = [
    "Information sur les Eudes en Roumanie et orientation (conseil) sur le choix d’université et de programmes selon les études déjà faites et la formation que le candidat souhaite suivre.",
    "Guide pour la préparation du dossier d’application spécifique aux études à faire et à l'universite à fréquenter en Roumanie, et du dossier de demande de visa d’études en Roumanie (si c'est le cas).",
    "Réception de votre dossier et faire la procédure pour l’obtention de la lettre d’inscription ou certificat (attestation) des études déjà faites auprès des universités et du Ministère de l'Éducation.",
    "Envois de votre lettre d’acceptation par un moyen sur (lettre recommandée, DHL, EMS etc.) selon l’urgence.",
    "Accueil et assistance lors de l’arrivée en Roumanie : hôtel, logement (privé ou campus universitaire), procédure d’inscription finale à l’Université, ouverture de compte bancaire, procédure de demande de permis de séjours, introduction dans la communauté des étudiants (anciens et nouveaux), etc.",
    "Rester en contact avec les étudiants pendant leurs séjours d'études en Roumanie (au cas de besoin de soutien ou de conseil) et avec les parents, à leur demande.",
  ];

  return (
    <div className="font-sans mt-20 mb-20">
      {/* Container */}
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="mt-12 text-5xl text-[#147be2] font-extrabold font-oswald text-secondary text-center leading-tight">
            Services du guide pour étudier en Roumanie
          </h2>
          <p className=" font-oswald font-oswaldmt-4 leading-relaxed">
            Nous offrons des services pour informer, orienter et assister les
            étudiants internationaux tout au long de leur parcours pour étudier
            en Roumanie.
          </p>
        </div>

        {/* Services Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {services.map((service, index) => (
            <ServiceItem key={index} text={service} index={index} />
          ))}
        </div>

        {/* Bottom Paragraph */}
        <div className="mt-12 leading-relaxed text-justify">
          <p>
            Après l’obtention de la lettre d’inscription pour étudier en
            Roumanie, les étudiants des pays non-membre d’UE/CEE doivent obtenir
            le visa d’études avant de venir en Roumanie. L’application pour le
            visa se fait dans des représentations diplomatiques de la Roumanie à
            l'étranger. Nous conseillons aux étudiants de visiter la Roumanie
            après leur admission pour prendre un logement en avance.
          </p>
        </div>
      </div>
    </div>
  );
}
