import React from "react";

export default function Page() {
  return (
    <div className="font-sans mt-10 mb-20   dark:bg-gray-900 transition-colors duration-300">
      {/* Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-5xl text-[#147be2] dark:text-blue-400 font-extrabold font-oswald leading-tight mb-6">
            Étudier à l'étranger
          </h2>
          <div className="w-24 h-2 bg-[#147be2] dark:bg-blue-400 mx-auto mb-8"></div>
        </div>

        {/* Content Section */}
        <div className="prose prose-lg max-w-4xl mx-auto dark:prose-invert">
          <div className="mb-12 p-6 bg-blue-50 dark:bg-gray-800 rounded-xl border-l-4 border-[#147be2] dark:border-blue-400 transition-colors duration-300">
            <h3 className="text-2xl font-bold text-[#147be2] dark:text-blue-400 mb-4 flex items-center">
              <span className="mr-2">🌍</span>
              Étudier à l'étranger : et pourquoi pas en Roumanie ?
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Étudier à l'étranger, c'est vivre une expérience unique, enrichissante et formatrice. 
              Et parmi les destinations européennes les plus accessibles et avantageuses, 
              la Roumanie se distingue comme un choix stratégique pour les étudiants francophones et internationaux.
            </p>
          </div>

          {/* Education Section */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-[#147be2] dark:text-blue-400 mb-4 flex items-center">
              <span className="mr-2">🎓</span>
              Un enseignement européen et multilingue
            </h3>
            <p className="mb-4 dark:text-gray-300">
              Membre de l'Union européenne, la Roumanie applique le système Licence–Master–Doctorat (LMD). 
              Les diplômes roumains sont reconnus dans toute l'Europe et dans de nombreux pays du monde.
            </p>
            <p className="font-semibold mb-2 dark:text-gray-300">
              Les universités roumaines proposent des formations dans plusieurs langues d'enseignement :
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4 dark:text-gray-300 ">
              <li className="">Roumain (langue nationale)</li>
              <li className="">Français (dans de nombreuses filières, notamment santé, droit, sciences sociales)</li>
              <li className="">Anglais (très présent dans les filières médicales, techniques et économiques)</li>
              <li className="">Allemand (offert dans certaines universités, notamment en Transylvanie)</li>
              <li className="">Hongrois (dans les régions où la communauté magyare est présente)</li>
            </ul>
          </div>

          {/* Cost Section */}
          <div className="mb-12 p-6 bg-blue-50 dark:bg-gray-800 rounded-xl transition-colors duration-300">
            <h3 className="text-2xl font-bold text-[#147be2] dark:text-blue-400 mb-4 flex items-center">
              <span className="mr-2">💶</span>
              Un pays aux coûts très abordables
            </h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Étudier en Roumanie, c'est aussi profiter d'un excellent rapport qualité-prix :
            </p>
            <ul className="list-disc pl-6 space-y-2  ">
              <li className="text-gray-700 dark:text-gray-300">Frais de scolarité modérés comparés à d'autres pays de l'UE</li>
              <li className="text-gray-700 dark:text-gray-300">Coût de la vie bas : logement, transport, restauration adaptés au budget étudiant</li>
              <li className="text-gray-700 dark:text-gray-300">Logements universitaires accessibles</li>
              <li className="text-gray-700 dark:text-gray-300">Possibilité de bourses nationales et européennes</li>
            </ul>
          </div>

          {/* Multicultural Section */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-[#147be2] dark:text-blue-400 mb-4 flex items-center">
              <span className="mr-2">🌐</span>
              Un carrefour multiculturel
            </h3>
            <p className="mb-4 dark:text-gray-300">
              Les campus roumains accueillent chaque année des dizaines de milliers d'étudiants étrangers, 
              venus d'Europe, d'Afrique, du Moyen-Orient ou d'Asie. Les programmes comme Erasmus+ sont disponibles 
              et favorisent les échanges et la mobilité internationale.
            </p>
            <p className="dark:text-gray-300">
              Depuis mars 2024, la Roumanie fait partie de l'espace Schengen, ce qui facilite la circulation 
              libre en Europe pour les étudiants.
            </p>
          </div>

          {/* Support Section */}
          <div className="mb-12 p-6 bg-blue-50 dark:bg-gray-800 rounded-xl transition-colors duration-300">
            <h3 className="text-2xl font-bold text-[#147be2] dark:text-blue-400 mb-4 flex items-center">
              <span className="mr-2">🤝</span>
              Un accompagnement personnalisé
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              De nombreuses universités roumaines disposent de services dédiés aux étudiants internationaux : 
              aide administrative, cours de langue, intégration culturelle, orientation académique. 
              Vous êtes accompagné à chaque étape, de la candidature à l'installation sur place.
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 dark:border-gray-700 my-8"></div>

          {/* Conclusion */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-[#147be2] dark:text-blue-400 mb-4 flex items-center justify-center">
              <span className="mr-2">✈️</span>
              La Roumanie, une vraie opportunité
            </h3>
            <p className="mb-6 text-lg dark:text-gray-300">
              Si vous cherchez à étudier en Europe dans un cadre multilingue, ouvert et abordable, 
              la Roumanie est un excellent choix.
            </p>
            <p className="font-semibold dark:text-gray-300">
              Contactez-nous pour en savoir plus sur les filières, les langues disponibles, 
              les universités partenaires et les démarches à suivre.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}