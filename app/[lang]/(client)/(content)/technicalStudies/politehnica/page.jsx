import React from "react";

export default function page() {
  return (
    <div className="mt-10 mb-10 p-6 ">
      <div className="max-w-4xl mx-auto">
        {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> */}
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-blue-900 text-center">
            Université Polytechnique de Bucarest
          </h1>
          <p className="text-center text-lg mt-4">
            La plus grande université technique de Roumanie, jouant un rôle clé
            dans la formation de spécialistes techniques.
          </p>
        </header>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">
            Chiffres clés :
          </h2>
          <ul className="list-disc pl-6 ">
            <li>
              <strong>13 facultés</strong> offrant une large gamme de
              formations.
            </li>
            <li>
              <strong>28 résidences universitaires</strong> accueillant environ
              11 500 étudiants.
            </li>
            <li>
              Programmes proposés en <strong>licence</strong>,{" "}
              <strong>master</strong>, et <strong>doctorat</strong>.
            </li>
            <li>
              Cours dispensés en <strong>anglais</strong>,{" "}
              <strong>français</strong>, et <strong>allemand</strong> pour une
              ouverture internationale.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">
            Programmes en langues étrangères
          </h2>

          <div className="mb-6">
            <h3 className="text-xl font-medium text-blue-700 mb-2">
              Études de licence :
            </h3>
            <ul className="list-disc pl-6 ">
              <li>
                <strong>Faculté d’Ingénierie en Langues Étrangères :</strong>
              </li>
              <ul className="pl-6">
                <li>
                  Génie électronique et télécommunications (Anglais, Français,
                  Allemand).
                </li>
                <li>
                  Ordinateurs et technologies de l’information (Anglais,
                  Français).
                </li>
                <li>Génie mécanique (Anglais, Français, Allemand).</li>
                <li>Génie chimique (Anglais, Français).</li>
                <li>Ingénierie des matériaux (Anglais, Français).</li>
                <li>
                  Ingénierie économique - domaines électrique, électronique et
                  énergétique (Allemand).
                </li>
                <li>Ingénierie économique - domaine mécanique (Allemand).</li>
              </ul>
              <li>
                <strong>Faculté d’Ingénierie Aérospatiale :</strong>
              </li>
              <ul className="pl-6">
                <li>Navigation aérienne (Anglais).</li>
              </ul>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-medium text-blue-700 mb-2">
              Études de master :
            </h3>
            <ul className="list-disc pl-6 ">
              <li>
                <strong>Faculté d’Ingénierie en Langues Étrangères :</strong>
              </li>
              <ul className="pl-6">
                <li>Administration des affaires (Anglais).</li>
                <li>Bioinformatique (Anglais).</li>
                <li>Technologie de traduction automatique (Français).</li>
                <li>Gestion et administration internationales (Allemand).</li>
                <li>Ingénierie des systèmes industriels (Français).</li>
                <li>Ingénierie des logiciels (Anglais).</li>
                <li>Mécatronique et bionique (Allemand).</li>
              </ul>
              <li>
                <strong>Faculté d’Automatique et Informatique :</strong>
              </li>
              <ul className="pl-6">
                <li>Intelligence artificielle (Anglais).</li>
              </ul>
              <li>
                <strong>
                  Faculté d’Électronique, Télécommunications et Technologies de
                  l’Information :
                </strong>
              </li>
              <ul className="pl-6">
                <li>Microélectronique avancée (Anglais).</li>
              </ul>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">
            Facultés principales :
          </h2>
          <ol className="list-decimal pl-6 ">
            <li>Faculté d’Ingénierie Électrique.</li>
            <li>Faculté Énergétique.</li>
            <li>Faculté des Sciences Informatiques.</li>
            <li>
              Faculté d’Électronique, Télécommunications et Technologies de
              l’Information.
            </li>
            <li>Faculté de Génie Mécanique et Mécatronique.</li>
            <li>
              Faculté d’Ingénierie et Management des Systèmes Technologiques.
            </li>
            <li>Faculté d’Ingénierie des Systèmes Biotechniques.</li>
            <li>Faculté des Transports.</li>
            <li>Faculté d’Ingénierie Aérospatiale.</li>
            <li>Faculté des Sciences et Ingénierie des Matériaux.</li>
          </ol>
        </section>
      </div>
    </div>
  );
}
