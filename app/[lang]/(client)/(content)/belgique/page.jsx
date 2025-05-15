import React from "react";

export default function page() {
  return (
    <div className="mt-10 mb-10 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-blue-900 text-center">
            Médecine en Belgique
          </h1>
          <p className="text-center text-lg  mt-4">
            Médecine en Belgique en français ou en flamand, 6 ans d’études
            universitaires de médecine et 3 à 6 ans d’internat. Formalités et
            procédures d’inscription en médecine en Belgique : concours mais non
            contraignant.
          </p>
        </header>

        <h2 className="text-lg font-bold text-blue-800 mb-2">
          Etudes de médicine en Belgique
        </h2>
        <p className="mb-4">
          Les études de médecine en Belgique sont les plus longues du pays. Les
          études Universitaires de médecine sont composées de deux cycles
          universitaires (bachelier et master) totalisant 6 ans (à partir de
          l'année académique 2012-2013, auparavant sept ans) pour obtenir le
          grade de docteur en médecine. Les études postuniversitaires ou de
          spécialisation (internat) en médecine en Belgique comptent au minimum
          3 ans pour devenir par exemple médecin généraliste et d'un maximum de
          6 ans pour certaines spécialités telles que la chirurgie. Les études
          complètes s'étalent donc au minimum sur 9 ans pour les généralistes et
          au maximum sur 12 ans pour certaines spécialités. Le Médecin assistant
          clinicien candidat spécialiste (MACCS), ainsi appelé l’étudiant en
          spécialisation en médecine en Belgique, doit donc faire entre 3 et 6
          ans après ses études universitaires.
        </p>
        <h2 className="text-lg font-bold text-blue-800 mb-2">
          Facultés de médecine en Belgique
        </h2>
        <p className="mb-4">
          La Belgique comptes une dizaine d’universités ou facultés de médecine.
          Les études de médecine en Belgique sont disponibles soit en Français,
          soit en Flamand. La liste des universités ayant les facultés de
          médecine en Belgique en laques française sont dans la partie
          francophone de la Belgique.
        </p>
        <h3 className="text-lg font-bold text-blue-800 mb-2">
          Universités et facultés de médecine en Belgique en Français
        </h3>
        <p className="mb-4">
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Université Libre de Bruxelles – Faculté de médecine</li>
            <li>
              Université Catholique de Louvain - Faculté de médecine et de
              médecine dentaires
            </li>
            <li>Université de Liège - Faculté de médecine</li>
            <li>Université de Mons - Faculté de médecine</li>
            <li>
              Facultés universitaires Notre-Dame de la Paix - Faculté de
              médecine
            </li>
          </ul>
        </p>
        <h3 className="text-lg font-bold text-blue-800 mb-2">
          Universités et facultés de médecine en Belgique en Flamand
        </h3>
        <p className="mb-4">
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Universiteit Antwerpen - Faculté de médecine</li>
            <li>
              Vrije Universiteit Brussel - Faculté de médecine et de pharmacie
            </li>
            <li>
              Universiteit Gent - Faculté de médecine et de sciences de la vie
            </li>
            <li>Universiteit Hasselt - Faculté de médecine</li>
            <li>Katholieke Universiteit Leuven - Faculté de médecine</li>
          </ul>
        </p>
      </div>
    </div>
  );
}
