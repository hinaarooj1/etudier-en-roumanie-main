import React from "react";

export default function page() {
  return (
    <div>
      {" "}
      <div className="p-6 ">
        <div className="max-w-4xl mx-auto">
          <header className="mb-10">
            <h1 className="text-4xl font-bold text-blue-900 text-center">
              Universités Polytechniques en Roumanie
            </h1>
            <p className="text-center text-lg mt-4">
              Les universités polytechniques en Roumanie offrent des programmes
              de Licence (ingénierie) de 4 ans, Master de 3 ans, et Doctorat de
              3 ans en français ou en anglais.
            </p>
          </header>
          <h2 className="text-xl font-semibold text-blue-800 mb-2">
            Programmes en français
          </h2>
          <ul className="list-disc list-inside space-y-2 ">
            <li>Génie civil</li>
            <li>Ingénierie en langues étrangères</li>
            <li>Ordinateurs et technologie de l’information</li>
            <li>Génie électronique et télécommunications</li>
            <li>Technologie de traduction automatique</li>
            <li>Ingénierie des systèmes industriels</li>
            <li>Génie mécanique</li>
            <li>Génie chimique</li>
            <li>Ingénierie des matériaux</li>
            <li>Génie technique</li>
            <li>Construction d’automobile</li>
            <li>Géographie du tourisme</li>
            <li>Etc.</li>
          </ul>

          <h2 className="text-xl font-semibold text-blue-800 mt-6 mb-2">
            Inscription en Universités Polytechniques en Roumanie
          </h2>
          <p className=" mb-4">
            L’inscription pour les études de génie civil en Roumanie se fait sur
            dossier, sans concours. Le critère principal est basé sur les
            résultats des notes du baccalauréat.
          </p>
          <p className="">Le dossier d‘application doit comprendre :</p>
          <ul className="list-disc list-inside space-y-2  mt-2">
            <li>Une copie du passeport ou d’un autre document équivalent</li>
            <li>L’acte de naissance</li>
            <li>Un certificat médical</li>
            <li>Le diplôme de baccalauréat ou équivalent</li>
            <li>Le relevé des notes du baccalauréat</li>
          </ul>
          <p className="mt-4">
            Il est également nécessaire de maîtriser la langue d’instruction
            choisie.
          </p>
        </div>
      </div>
    </div>
  );
}
