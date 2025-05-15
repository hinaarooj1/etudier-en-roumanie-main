import React from "react";

export default function page() {
  return (
    <div className="mt-10 mb-10 p-6 ">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-blue-900 text-center">
            Études de Médecine vétérinaire en Roumanie
          </h1>
          <p className="text-center text-lg  mt-4"></p>
        </header>
        <div className="my-4">
          <p className="mb-5">
            Les Études de Médecine vétérinaire en Roumanie sont offertes par les
            Facultés de médecine vétérinaire au sein des Universités des
            sciences agricoles et de médicine vétérinaire de Bucarest, d’Iasi
            (Ion Ionescu de la Brad), de Timisoara et de Cluj Napoca. Les études
            de médecine vétérinaires universitaires ou de Doctorat (PhD) en
            Roumanies sont disponibles en français, anglais et Roumain.
          </p>
          <p className="mb-5">
            Les études universitaires de médecine vétérinaires sont de 6 ans et
            débouchent sur le diplôme de Doctorat en Médecine Vétérinaire. Elles
            sont disponibles en Français, anglais ou Roumain. Les diplômés en
            médecine vétérinaires peuvent continuer leurs études en Doctorat ou
            commencer leur carrière.
          </p>
          <p className="mb-5">
            Les études d’agriculture, Sciences et Biotechnologies animales,
            Horticulture et de science et la technologie de l’alimentation sont
            organisées sur 4 ans pour le niveau licence et 2 ans pour le Master,
            qui peuvent être suivies de Doctorat de 3 ans. Elles sont
            disponibles en Français et / en Roumain.
          </p>
        </div>
        <h2 className="text-indigo-700 text-xl font-bold">
          Facultés de Médecine vétérinaire en Roumanie
        </h2>
        <p className="mb-5">
          Les facultés de Médecine Vétérinaire (sciences vétérinaire) organisent
          les études de médecine vétérinaire en Roumain, Français ou anglais
          selon les offres universitaires.
        </p>
        <ul className="list-disc pl-5 mb-5">
          <li>
            Facultés de Médecine vétérinaire de l’université Titu Maiorescu de
            Bucarest
          </li>
          <li>
            Facultés de Médecine vétérinaire de l’Université Spiru Haret de
            Bucarest
          </li>
          <li>Facultés de Médecine vétérinaire de l’USAMV de Bucarest</li>
          <li>Facultés de Médecine vétérinaire de l’USAMV de Cluj Napoca</li>
          <li>
            Facultés de Médecine vétérinaire de l’USAMV Ion Ionesco de la Brad
            d'Iasi
          </li>
          <li>
            Facultés de Médecine vétérinaire de l’USAMV Banat de Timisoara
          </li>
        </ul>
        <p className="mb-5">
          Toutes les facultés de médecine vétérinaires ont des Cliniques
          Vétérinaires où les étudiants reçoivent les formations cliniques
          pratiques en participant activement à tous les exercices supervisés
          par nos professionnels spécialistes qui sont également professeurs de
          l'université.
        </p>
        <p className="mb-5">
          La profession de médecine vétérinaire est règlementée par le{" "}
          <a
            href="https://cmvro.ro/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Collège roumain des médecins vétérinaires
          </a>
          . Toutes les six universités offrent des programmes de médecine
          vétérinaires qui sont accréditées par l'UE conformément à la directive
          européenne 2005/36 / CE et par{" "}
          <a
            href="http://www.aracis.ro/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            ARACIS
          </a>
          . Le diplôme de vétérinaire en Roumanie est conforme à la norme
          européenne et l'utilisation du titre de "médecin vétérinaire" ou "DMV"
          est implicitement autorisée pour les diplômés de ces facultés.
        </p>
        <h3 className="text-blue-800 text-lg font-bold">Admissions</h3>
        <p className="mb-5">
          L’admission pour faire les études de médecine vétérinaire dans la
          faculté de médecine vétérinaire se fait par sélection des dossiers
          d’application ou par dossier d'application et interview. Pour devenir
          vétérinaire en Roumanie, les étudiants doivent suivre un programme de
          6 ans d’études de médecine vétérinaires.
        </p>
        <h3 className="text-blue-800 text-lg font-bold">Frais de scolarité</h3>
        <p className="mb-5">
          Les frais de scolarité pour faire les études de médecine vétérinaire
          en Roumanie varient de 3.200 à 5000 euros / an, selon les Universités
          et la langue d’enseignement.
        </p>
      </div>
    </div>
  );
}
