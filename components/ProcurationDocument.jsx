import React, { useState,useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Printer, ChevronLeft, ChevronRight, FileDown } from "lucide-react";
import { generateProcurationPDF } from "@/services/pdfService";

const ProcurationDocument = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 6;

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');
  };

  const downloadPDF = async () => {
    if (isClient) {
      const { generateProcurationPDF } = await import("@/services/pdfService");
      const pdf = generateProcurationPDF(data);
      pdf.save('procuration.pdf');
    }
  };

  const handlePrint = () => {
    if (isClient) {
      window.print();
    }
  };

  if (!isClient) {
    return null;
    // Or return a loading skeleton if you prefer:
    // return <div className="w-full max-w-4xl mx-auto p-8 space-y-6 h-[800px] bg-gray-100 animate-pulse" />;
  }

  return (
    <Card className="w-full max-w-4xl mx-auto p-8 space-y-6 relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {currentPage === 1 && "PROCURATION SPÉCIALE"}
          {currentPage === 2 && "AVENANT À LA PROCURATION"}
          {currentPage === 3 && "CONTRAT DE PRESTATION DE SERVICES"}
          {currentPage === 4 && "SUITE DU CONTRAT"}
          {currentPage === 5 && "SUITE DU CONTRAT"}
          {currentPage === 6 && "AVENANT AU CONTRAT"}
        </h1>
        <div className="space-x-2">
          <Button variant="outline" onClick={downloadPDF}>
            <FileDown className="w-4 h-4 mr-2" />
            Télécharger PDF
          </Button>
          <Button variant="outline"onClick={handlePrint}>
            <Printer className="w-4 h-4 mr-2" />
            Imprimer
          </Button>
        </div>
      </div>

      <div className="space-y-6 text-[#333333] procuration-content">
        {currentPage === 1 && (
          <div className="page-content">
            <p className="text-justify">
              Je soussigné(e), {data.delegator.lastName} {data.delegator.firstName}, 
              citoyen(ne) du/(de l') {data.delegator.nationality}, domicilié(e) au/en {data.delegator.country}, 
              titulaire du passeport No. {data.delegator.passportNumber},
            </p>

            <p className="text-justify">
              délègue par la présente monsieur/madame {data.delegate.lastName} {data.delegate.firstName}, 
              de nationalité {data.delegate.nationality}, pièce d'identité nationale roumaine 
              série {data.delegate.idSeries}, No. {data.delegate.idNumber}, demeurant 
              à {data.delegate.address},
            </p>

            <p className="text-justify">
              pour me représenter en Roumanie auprès des autorités compétentes (toutes les Universités, 
              la Banque, le Ministère de l'Éducation Nationale, les Notariats et autres autorités) en vue 
              de solliciter en mes lieux et places une inscription aux études de Médecine générale en Roumanie, 
              retirer en mes lieux et places la lettre d'acceptation en original et de Réclamer.
            </p>

            <p className="text-justify">
              Dans ce but, mon mandataire me représentera devant les organes compétents, formulera des 
              demandes, déposera les documents nécessaires (la copie de mon passeport, la copie de tous 
              les documents nécessaires à mon inscription, la copie des preuves de paiement de tout frais), 
              fournira les coordonnées de son compte bancaire, signant en mon nom et à ma place, partout 
              où cela sera nécessaire, dans les limites du présent mandat, sa signature étant opposable à 
              la mienne.
            </p>

            <p className="text-justify">
              La présente procuration n'est pas transmissible et est valable jusqu'à la réalisation de 
              son objet par le mandataire.
            </p>

            <div className="mt-8">
              <p>{data.city}, le {formatDate(data.date)}</p>
              <div className="mt-4 grid grid-cols-1 gap-8">
                <div>
                  <p className="font-semibold">{data.delegator.lastName} {data.delegator.firstName}</p>
                  <p className="mt-4">LU ET COMPRIS</p>
                  <p className="mt-8">(signature): _________________</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentPage === 2 && (
          <div className="page-content">
            <h2 className="text-xl font-semibold mb-4">AVENANT À LA PROCURATION</h2>
            <p className="text-justify mb-4">
              Je précise que mon mandataire a le droit de soumettre mon dossier à l'Université 
              et de récupérer ma Lettre d'Acceptation en original de l'université. En même temps, 
              j'ai pris connaissance du fait que lors de mon inscription aux études, je dois payer les frais 
              suivants pour la délivrance du permis de résidence pour des études avec lesquelles je suis d'accord.
            </p>
            
            <p className="mb-4">À mon arrivée en Roumanie, j'ai besoin des frais suivants pour la délivrance d'un titre de séjour afin d'étudier :</p>
            <ul className="list-none mb-4 space-y-2">
              <li>Analyses médicales : {data.expenses.medicalAnalysis} lei (+/- {Math.round(data.expenses.medicalAnalysis / 4.7)} €)</li>
              <li>Prix par séjour : {data.expenses.stayFee} lei (+/- {Math.round(data.expenses.stayFee / 4.7)} €)</li>
              <li>Frais consulaires : {data.expenses.consularFees} € (payés en lei au taux de change de la Banque Nationale de Roumanie au jour du paiement)</li>
              <li>Relevé de compte dans une banque roumaine (justificatif des moyens de subsistance pour les études) : {data.expenses.bankStatement} €</li>
              <li>Pour les citoyens âgés de plus de 26 ans - Assurance maladie privée en Roumanie - environ {data.expenses.healthInsurance} lei / an (+/- {Math.round(data.expenses.healthInsurance / 4.7)} €/an)</li>
              <li>Taxe à la Caisse d'Assurance Maladie de la Région d'Arges (après réception du titre de séjour) : {data.expenses.healthInsuranceTax} lei / mois (+/- {Math.round(data.expenses.healthInsuranceTax / 3.5)} €/mois)</li>
            </ul>

            <p className="text-justify mb-4">
              Les taxes ont été fixées pour 2023 et peuvent varier en fonction du salaire moyen en Roumanie au début de chaque année.
            </p>

            <p className="text-justify mb-4">
              Je suis informé du fait que les analyses médicales seront répétées en Roumanie et que si j'ai une hépatite (A, B ou C) 
              ou une tuberculose (TBC), je serai expulsé. Raison pour laquelle je vais tâcher de faire les bonnes analyses dans mon pays d'origine.
            </p>

            <p className="text-justify mb-4">
              Je déclare être d'accord que les autorités de Roumanie soient autorisées par leurs structures, de traiter mes données à caractère personnel 
              pendant la procédure de mon inscription aux études en Roumanie, conformément aux dispositions légales en vigueur, en qualité d'autorité 
              de spécialité, tout en respectant les dispositions du Règlement (UE) 679/2016 du Parlement Européen et du Conseil du 27 avril 2016 
              concernant le traitement des données à caractère personnel et concernant la libre circulation de ces dernières données et de l'abrogation 
              de la Directive 95/46/CE.
            </p>

            <div className="mt-8">
              <p>{data.city}, le {formatDate(data.date)}</p>
              <div className="mt-4 grid grid-cols-1 gap-8">
                <div>
                  <p className="font-semibold">{data.delegator.lastName} {data.delegator.firstName}</p>
                  <p className="mt-4">LU ET COMPRIS</p>
                  <p className="mt-8">(signature): _________________</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentPage === 3 && (
          <div className="page-content">
            <div className="mb-6">
              <p className="text-center font-semibold mb-2">Services d'Aide à l'inscription</p>
              <p className="text-center text-sm mb-1">{data.delegate.address}</p>
              <p className="text-center text-sm">Tél. +40-311 016 865; www.etudes-en-roumanie.net</p>
            </div>

            <h2 className="text-xl font-semibold mb-4 text-center">Contrat de prestation de services d'accompagnement pour l'inscription et à l'installation en Roumanie</h2>
            
            <p className="mb-4">Entre les soussignés :</p>
            <p className="text-justify mb-4">
              Monsieur {data.delegate.lastName} {data.delegate.firstName}, personne physique autorisée, de nationalité {data.delegate.nationality}, 
              pièce d'identité nationale roumaine série {data.delegate.idSeries}, No. {data.delegate.idNumber}, demeurant à Bucarest, Roumanie, 
              BANCA TRANSILVANIA – ROUMANIE, Compte bancaire, IBAN: RO68BTRLEURCRT0CJ1417401, Code SWIFT: BTRLRO22, 
              ci-après dénommé « Prestataire de services » ou « le Prestataire », d'une part,
            </p>

            <p className="text-justify mb-4">
              et Mme/Mr. {data.delegator.lastName} {data.delegator.firstName}, ressortissant(e) de l'{data.delegator.nationality}, 
              passeport No. {data.delegator.passportNumber}, demeurant au/en {data.delegator.country}, 
              ci-après désignée « Le Bénéficiaire » ou « bénéficiaire », d'autre part,
            </p>

            <p className="mb-4">Il a été convenu ce qui suit :</p>

            <h3 className="font-semibold mb-2">Article premier - Objet</h3>
            <p className="text-justify mb-4">
              Le présent contrat est un contrat de prestation de conseils et services ayant pour objet le mandat de :
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Préparer la pré-inscription du bénéficiaire : le conseiller, l'informer, l'orienter pendant la constitution de son dossier, lui fournir les formulaires nécessaires, les lui remplir ;</li>
              <li>Déposer et suivre le dossier de pré-inscription aux études à l'université choisie par le bénéficiaire avec son aide en vue de la réservation d'une place auprès de cette dernière université et de l'obtention d'une lettre d'acceptation / de reconnaissances des études initiales du bénéficiaire,</li>
              <li>Envoyer la lettre ou une copie certifiée de celle-ci au bénéficiaire.</li>
            </ul>
            
            <p className="font-semibold mb-4">Ce service sera dénommé SERVICE PACK PREINSCRIPTION</p>
            
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Préparer l'inscription du bénéficiaire : lui réservant un logement ;</li>
              <li>Accueillir le bénéficiaire à son arrivée, l'accompagner au logement réservé ;</li>
              <li>Lui faire faire une visite guidée de la ville et le tour de la cité universitaire ;</li>
              <li>L'accompagner aux démarches d'inscription finale et d'obtention de la carte de séjour (constitution du dossier de demande de séjour : ouverture d'un compte bancaire pour obtention d'une preuve de substance, etc.).</li>
            </ul>
            
            <p className="font-semibold mb-4">Ce service sera dénommé SERVICE PACK INSCRIPTION.</p>
            <p className="font-semibold mb-4">L'option comprenant les deux sera dénommée PACK COMPLET.</p>
            
            <p className="text-justify mb-4">
              Le prestataire fera toutes les démarches utiles et nécessaires pour mener à bien ce mandat, formulera des demandes, 
              paiera les taxes en lieux et places du client, sa signature étant opposable à celle du bénéficiaire.
            </p>

            <h3 className="font-semibold mb-2">Article 2 – Durée</h3>
            <p className="text-justify mb-4">
              Ce contrat est passé pour une durée s'étendant jusqu'à la fin des inscriptions de l'année académique 2024/2025. 
              Il prendra effet ce {formatDate(data.date)} et arrivera à son terme le 31/12/2024.
            </p>
          </div>
        )}

        {currentPage === 4 && (
          <div className="page-content">
            <h3 className="font-semibold mb-2">Article 3 - Exécution de la prestation</h3>
            <p className="text-justify mb-4">
              Le prestataire s'engage à mener à bien la tâche précisée à l'Article premier conformément aux règles de l'art 
              et de la meilleure manière. À cet effet, il constituera l'équipe nécessaire à la réalisation du mandat et 
              informera régulièrement le client sur l'évolution de sa mission.
            </p>

            <h4 className="font-semibold mb-2">3.1 Obligation de collaborer</h4>
            <p className="text-justify mb-4">
              Le bénéficiaire tiendra à la disposition du prestataire toutes les informations et documents pouvant contribuer 
              à la bonne réalisation de l'objet du présent contrat. À cette fin, le bénéficiaire assurera personnellement 
              le dialogue avec le prestataire dans les diverses étapes du mandat contracté. Le bénéficiaire paiera les 
              honoraires dus à temps et dans le respect des conditions contractuelles.
            </p>

            <h3 className="font-semibold mb-2">Article 4 - Nature des obligations</h3>
            <p className="text-justify mb-4">
              Pour l'accomplissement des diligences et prestations prévues à l'Article premier ci-dessus, le Prestataire 
              s'engage à donner ses meilleurs soins, conformément aux règles de l'art. La présente obligation, n'est, 
              de convention expresse, que pure obligation de moyens.
            </p>

            <h3 className="font-semibold mb-2">Article 5 - Responsabilité du Prestataire</h3>
            <p className="text-justify mb-4">
              La responsabilité du Prestataire n'est pas engagée dans la mesure où le préjudice que subirait le bénéficiaire 
              n'est pas causé par une faute intentionnelle ou lourde du Prestataire.
            </p>

            <h3 className="font-semibold mb-2">Article 6 – Paiement</h3>
            <p className="text-justify mb-4">
              En contrepartie de la réalisation des prestations définies à l'Article premier ci-dessus, le bénéficiaire 
              versera au prestataire la somme forfaitaire stipulée dans l'annexe au présent contrat.
            </p>

            <h3 className="font-semibold mb-2">Article 7 - Résiliation. Sanction</h3>
            <p className="text-justify mb-4">
              Tout manquement de l'une ou l'autre des parties aux obligations qu'elle a en charge, ci-dessus, 
              entraînera, si bon semble au créancier de l'obligation inexécutée, la résiliation de plein droit 
              au présent contrat, quinze jours après mise en demeure d'exécuter par lettre recommandée avec 
              accusé de réception demeurée sans effet, sans préjudice de tous dommages et intérêts.
            </p>
          </div>
        )}

        {currentPage === 5 && (
          <div className="page-content">
            <h3 className="font-semibold mb-2">Article 8 - Clause de hardship</h3>
            <p className="text-justify mb-4">
              Les parties reconnaissent que le présent accord ne constitue pas une base équitable et raisonnable 
              de leur coopération. Dans le cas où les données sur lesquelles est basé cet accord sont modifiées 
              dans des proportions telles que l'une ou l'autre des parties rencontre des difficultés sérieuses 
              et imprévisibles, elles se consulteront mutuellement et devront faire preuve de compréhension 
              mutuelle en vue de faire les ajustements qui apparaîtraient nécessaires à la suite de circonstances 
              qui n'étaient pas raisonnablement prévisibles à la date de conclusion du présent accord et ce, 
              afin que renaissent les conditions d'un accord équitable.
            </p>
            
            <p className="text-justify mb-4">
              La partie qui considère que les conditions énoncées au paragraphe ci-dessus sont remplies en avisera 
              l'autre partie par lettre recommandée avec accusé de réception, en précisant la date et la nature du 
              ou des événements à l'origine du changement allégué par elle en chiffrant le montant du préjudice 
              financier actuel ou à venir et en faisant une proposition de dédommagement pour remédier à ce changement.
            </p>

            <h3 className="font-semibold mb-2">Article 9 - Force majeure</h3>
            <p className="text-justify mb-4">
              On entend par force majeure des événements de guerre déclarés ou non déclarés, de grève générale de travail, 
              de maladies épidémiques, de mise en quarantaine, d'incendie, de crues exceptionnelles, d'accidents ou 
              d'autres événements indépendants de la volonté des deux parties. Aucune des deux parties ne sera tenue 
              responsable du retard constaté en raison des événements de force majeure.
            </p>
            
            <p className="text-justify mb-4">
              En cas de force majeure, constatée par l'une des parties, celle-ci doit en informer l'autre partie par écrit 
              dans les meilleurs délais par écrit, email. L'autre partie disposera de dix jours pour la constater. 
              Les délais prévus pour la livraison seront automatiquement décalés en fonction de la durée de la force majeure.
            </p>

            <h3 className="font-semibold mb-2">Article 10 - Loi applicable. Texte original</h3>
            <p className="text-justify mb-4">
              Le contrat est régi par la loi du pays où le prestataire a son siège social (Roumanie). 
              Le texte en format électronique du présent contrat fait foi comme texte original.
            </p>

            <h3 className="font-semibold mb-2">Article 11 - Compétence</h3>
            <p className="text-justify mb-4">
              Toutes contestations qui découlent du présent contrat ou qui s'y rapportent seront tranchées définitivement 
              suivant le règlement de Conciliation et d'Arbitrage de la Chambre de Commerce Internationale sans aucun recours 
              aux tribunaux ordinaires par un ou plusieurs arbitres nommés conformément à ce règlement et dont la sentence 
              a un caractère obligatoire. Le tribunal arbitral sera juge de sa propre compétence et de la validité de 
              la convention d'arbitrage.
            </p>

            <div className="mt-8">
              <p>Fait le {formatDate(data.date)}, en 2 (deux) exemplaires.</p>
              <div className="mt-4 grid grid-cols-2 gap-8">
                <div>
                  <p className="font-semibold">Le prestataire</p>
                  <p>{data.delegate.lastName} {data.delegate.firstName}</p>
                </div>
                <div>
                  <p className="font-semibold">Le Bénéficiaire</p>
                  <p>{data.delegator.lastName} {data.delegator.firstName}</p>
                  <p className="mt-4">LU ET COMPRIS</p>
                  <p className="mt-8">(Signature): _________________</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentPage === 6 && (
          <div className="page-content">
            <h2 className="text-xl font-semibold mb-4">AVENANT au Contrat de prestation de service d'aide à l'inscription aux études en Roumanie</h2>
            
            <h3 className="font-semibold mb-2">Payement</h3>
            <p className="text-justify mb-4">
              En contrepartie de la réalisation des prestations définies à l'Article premier ci-dessus, le client versera 
              au prestataire la somme forfaitaire (la taxe de traitement du dossier inclus), le tout ventilé de la manière suivante :
            </p>
            
            <p className="font-semibold mb-2">A. Pack Pré-inscription : {data.services.preInscriptionFee}€</p>
            <ul className="list-disc pl-6 mb-4">
              <li>
                {data.services.evaluationFee}€ constituant le montant de la taxe non remboursable d'évaluation plus la traduction et légalisation en langue 
                roumaine du dossier, plus {data.services.agencyAdvance}€ d'avance sur les honoraires de l'agence soient {data.services.preInscriptionFee}€ à la signature du présent 
                contrat et à l'envoi du dossier par le bénéficiaire au prestataire ;
              </li>
            </ul>
            
            <p className="font-semibold mb-2">B. Pack Inscription : {data.services.inscriptionFee}€</p>
            <ul className="list-disc pl-6 mb-4">
              <li>
                {data.services.inscriptionFee}€ à la délivrance de l'admission (la lettre d'acceptation) avant d'enclencher la procédure de demande de visa.
              </li>
            </ul>
            
            <p className="font-semibold mb-2">C. Pack complet : {data.services.preInscriptionFee + data.services.inscriptionFee}€</p>
            <ul className="list-disc pl-6 mb-4">
              <li>
                {data.services.evaluationFee}€ constituant le montant de la taxe non remboursable d'évaluation plus la traduction et légalisation en langue 
                roumaine du dossier, plus {data.services.agencyAdvance}€ d'avance sur les honoraires de l'agence soient {data.services.preInscriptionFee}€ à la signature du présent 
                contrat et à l'envoi du dossier par le bénéficiaire au prestataire ;
              </li>
              <li>
                {data.services.inscriptionFee}€ à la délivrance de l'admission (la lettre d'acceptation) avant d'enclencher la procédure de demande de visa.
              </li>
            </ul>
            
            <p className="text-justify mb-4">
              Les sommes prévues ci-dessus seront payées en ligne par carte de débit/crédit (en cliquant tout simplement ce qui est souligné), 
              par virement bancaire, par RIA avant l'arrivée du bénéficiaire, droits et taxes en sus.
            </p>
            
            <p className="mb-4">Rayez les options qui ne vous conviennent pas avant de signer.</p>
            
            <div className="mt-8">
              <p>Fait le {formatDate(data.date)}, en 2 (deux) exemplaires.</p>
              <div className="mt-4 grid grid-cols-2 gap-8">
                <div>
                  <p className="font-semibold">Le prestataire</p>
                  <p>{data.delegate.lastName} {data.delegate.firstName}</p>
                </div>
                <div>
                  <p className="font-semibold">Le Bénéficiaire</p>
                  <p>{data.delegator.lastName} {data.delegator.firstName}</p>
                  <p className="mt-4">LU ET COMPRIS</p>
                  <p className="mt-8">(Signature): _________________</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center mt-8">
        <Button 
          variant="outline" 
          onClick={prevPage} 
          disabled={currentPage === 1}
          className="flex items-center"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Page précédente
        </Button>
        <div className="text-sm text-gray-500">
          Page {currentPage} sur {totalPages}
        </div>
        <Button 
          variant="outline" 
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="flex items-center"
        >
          Page suivante
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </Card>
  );
};

export default ProcurationDocument;