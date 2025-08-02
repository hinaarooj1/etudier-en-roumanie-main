import { jsPDF } from "jspdf";

const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const MARGIN = 20;
const CONTENT_WIDTH = PAGE_WIDTH - (2 * MARGIN);
const LINE_HEIGHT = 5;
const PARAGRAPH_SPACING = 5;

export const generateProcurationPDF = (data) => {
  const pdf = new jsPDF({
    format: 'a4',
    unit: 'mm'
  });

  pdf.setFont("helvetica");
  pdf.setFontSize(11);

  const addFormattedText = (text, y, options = {}) => {
    const { fontStyle = 'normal', fontSize = 11, align = 'left', maxWidth = CONTENT_WIDTH } = options;
    pdf.setFont("helvetica", fontStyle);
    pdf.setFontSize(fontSize);
    const lines = pdf.splitTextToSize(text, maxWidth);
    if (y + (lines.length * LINE_HEIGHT) > PAGE_HEIGHT - MARGIN) {
      pdf.addPage();
      y = MARGIN;
    }
    pdf.text(lines, MARGIN, y, { align });
    return y + (lines.length * LINE_HEIGHT);
  };

  const addBulletPoint = (text, y) => {
    pdf.text('•', MARGIN, y);
    return addFormattedText(text, y + 3, { maxWidth: CONTENT_WIDTH - 5 });
  };

  pdf.setFontSize(14);
  pdf.setFont("helvetica", "bold");
  pdf.text("PROCURATION SPÉCIALE", PAGE_WIDTH/2, 25, { align: "center" });
  
  let yPosition = 35;

  yPosition = addFormattedText(
    `Je soussigné(e), ${data.delegator.lastName} ${data.delegator.firstName}, citoyen(ne) du/(de l') ${data.delegator.nationality}, domicilié(e) au/en ${data.delegator.country}, titulaire du passeport No. ${data.delegator.passportNumber},`,
    yPosition
  );

  yPosition = addFormattedText(
    `délègue par la présente monsieur/madame ${data.delegate.lastName} ${data.delegate.firstName}, de nationalité ${data.delegate.nationality}, pièce d'identité nationale roumaine série ${data.delegate.idSeries}, No. ${data.delegate.idNumber}, demeurant à ${data.delegate.address},`,
    yPosition + LINE_HEIGHT
  );

  const mainText = `pour me représenter en Roumanie auprès des autorités compétentes (toutes les Universités, la Banque, le Ministère de l'Éducation Nationale, les Notariats et autres autorités) en vue de solliciter en mes lieux et places une inscription aux études de Médecine générale en Roumanie, retirer en mes lieux et places la lettre d'acceptation en original et de Réclamer.`;
  yPosition = addFormattedText(mainText, yPosition + LINE_HEIGHT);

  const purposeText = `Dans ce but, mon mandataire me représentera devant les organes compétents, formulera des demandes, déposera les documents nécessaires (la copie de mon passeport, la copie de tous les documents nécessaires à mon inscription, la copie des preuves de paiement de tout frais), fournira les coordonnées de son compte bancaire, signant en mon nom et à ma place, partout où cela sera nécessaire, dans les limites du présent mandat, sa signature étant opposable à la mienne.`;
  yPosition = addFormattedText(purposeText, yPosition + LINE_HEIGHT);

  yPosition = addFormattedText(
    "La présente procuration n'est pas transmissible et est valable jusqu'à la réalisation de son objet par le mandataire.",
    yPosition + LINE_HEIGHT
  );

  yPosition += 20;
  pdf.text(`${data.city}, le ${formatDate(data.date)}`, MARGIN, yPosition);
  pdf.text(`${data.delegator.lastName} ${data.delegator.firstName}`, MARGIN, yPosition + 10);
  pdf.text("LU ET COMPRIS", MARGIN, yPosition + 20);
  pdf.text("(signature): _________________", MARGIN, yPosition + 30);

  pdf.addPage();
  pdf.setFontSize(14);
  pdf.setFont("helvetica", "bold");
  pdf.text("AVENANT À LA PROCURATION", PAGE_WIDTH/2, 25, { align: "center" });
  
  yPosition = 35;
  
  yPosition = addFormattedText(
    "Je précise que mon mandataire a le droit de soumettre mon dossier à l'Université et de récupérer ma Lettre d'Acceptation en original de l'université. En même temps, j'ai pris connaissance du fait que lors de mon inscription aux études, je dois payer les frais suivants pour la délivrance du permis de résidence pour des études avec lesquelles je suis d'accord.",
    yPosition
  );
  
  yPosition = addFormattedText(
    "À mon arrivée en Roumanie, j'ai besoin des frais suivants pour la délivrance d'un titre de séjour afin d'étudier :", 
    yPosition + LINE_HEIGHT
  );
  
  yPosition = addFormattedText(
    `1. Analyses médicales : ${data.expenses.medicalAnalysis} lei (+/- ${Math.round(data.expenses.medicalAnalysis / 4.7)} €)`,
    yPosition + LINE_HEIGHT
  );
  yPosition = addFormattedText(
    `2. Prix par séjour : ${data.expenses.stayFee} lei (+/- ${Math.round(data.expenses.stayFee / 4.7)} €)`,
    yPosition + LINE_HEIGHT
  );
  yPosition = addFormattedText(
    `3. Frais consulaires : ${data.expenses.consularFees} € (payés en lei au taux de change de la Banque Nationale de Roumanie au jour du paiement)`,
    yPosition + LINE_HEIGHT
  );
  yPosition = addFormattedText(
    `4. Relevé de compte dans une banque roumaine (justificatif des moyens de subsistance pour les études) : ${data.expenses.bankStatement} €`,
    yPosition + LINE_HEIGHT
  );
  yPosition = addFormattedText(
    `5. Pour les citoyens âgés de plus de 26 ans - Assurance maladie privée en Roumanie - environ ${data.expenses.healthInsurance} lei / an (+/- ${Math.round(data.expenses.healthInsurance / 4.7)} €/an)`,
    yPosition + LINE_HEIGHT
  );
  yPosition = addFormattedText(
    `6. Taxe à la Caisse d'Assurance Maladie de la Région d'Arges (après réception du titre de séjour) : ${data.expenses.healthInsuranceTax} lei / mois (+/- ${Math.round(data.expenses.healthInsuranceTax / 3.5)} €/mois)`,
    yPosition + LINE_HEIGHT
  );
  
  yPosition = addFormattedText(
    "Les taxes ont été fixées pour 2023 et peuvent varier en fonction du salaire moyen en Roumanie au début de chaque année.",
    yPosition + LINE_HEIGHT
  );
  
  yPosition = addFormattedText(
    "Je suis informé du fait que les analyses médicales seront répétées en Roumanie et que si j'ai une hépatite (A, B ou C) ou une tuberculose (TBC), je serai expulsé. Raison pour laquelle je vais tâcher de faire les bonnes analyses dans mon pays d'origine.",
    yPosition + LINE_HEIGHT
  );
  
  yPosition = addFormattedText(
    "Je déclare être d'accord que les autorités de Roumanie soient autorisées par leurs structures, de traiter mes données à caractère personnel pendant la procédure de mon inscription aux études en Roumanie, conformément aux dispositions légales en vigueur, en qualité d'autorité de spécialité, tout en respectant les dispositions du Règlement (UE) 679/2016 du Parlement Européen et du Conseil du 27 avril 2016 concernant le traitement des données à caractère personnel et concernant la libre circulation de ces dernières données et de l'abrogation de la Directive 95/46/CE.",
    yPosition + LINE_HEIGHT
  );
  
  yPosition += 20;
  pdf.text(`${data.city}, le ${formatDate(data.date)}`, MARGIN, yPosition);
  pdf.text(`${data.delegator.lastName} ${data.delegator.firstName}`, MARGIN, yPosition + 10);
  pdf.text("LU ET COMPRIS", MARGIN, yPosition + 20);
  pdf.text("(signature): _________________", MARGIN, yPosition + 30);

  pdf.addPage();
  pdf.setFontSize(14);
  pdf.setFont("helvetica", "bold");
  pdf.text("CONTRAT DE PRESTATION DE SERVICES", PAGE_WIDTH/2, 25, { align: "center" });
  
  yPosition = 35;
  
  pdf.text("Services d'Aide à l'inscription", PAGE_WIDTH/2, yPosition, { align: "center" });
  pdf.text(data.delegate.address, PAGE_WIDTH/2, yPosition + 7, { align: "center" });
  pdf.text("Tél. +40-311 016 865; www.etudes-en-roumanie.net", PAGE_WIDTH/2, yPosition + 14, { align: "center" });
  
  yPosition += 25;
  pdf.setFont("helvetica", "bold");
  yPosition = addFormattedText("Contrat de prestation de services d'accompagnement pour l'inscription et à l'installation en Roumanie", yPosition);
  pdf.setFont("helvetica", "normal");
  
  yPosition = addFormattedText("Entre les soussignés :", yPosition + LINE_HEIGHT);
  
  yPosition = addFormattedText(
    `Monsieur ${data.delegate.lastName} ${data.delegate.firstName}, personne physique autorisée, de nationalité ${data.delegate.nationality}, pièce d'identité nationale roumaine série ${data.delegate.idSeries}, No. ${data.delegate.idNumber}, demeurant à Bucarest, Roumanie, BANCA TRANSILVANIA – ROUMANIE, Compte bancaire, IBAN: RO68BTRLEURCRT0CJ1417401, Code SWIFT: BTRLRO22, ci-après dénommé « Prestataire de services » ou « le Prestataire », d'une part,`,
    yPosition + LINE_HEIGHT
  );
  
  yPosition = addFormattedText(
    `et Mme/Mr. ${data.delegator.lastName} ${data.delegator.firstName}, ressortissant(e) de l'${data.delegator.nationality}, passeport No. ${data.delegator.passportNumber}, demeurant au/en ${data.delegator.country}, ci-après désignée « Le Bénéficiaire » ou « bénéficiaire », d'autre part,`,
    yPosition + LINE_HEIGHT
  );
  
  yPosition = addFormattedText("Il a été convenu ce qui suit :", yPosition + LINE_HEIGHT);
  
  pdf.setFont("helvetica", "bold");
  yPosition = addFormattedText("Article premier - Objet", yPosition + LINE_HEIGHT);
  pdf.setFont("helvetica", "normal");
  
  yPosition = addFormattedText("Le présent contrat est un contrat de prestation de conseils et services ayant pour objet le mandat de :", yPosition + LINE_HEIGHT);
  
  yPosition = addBulletPoint("Préparer la pré-inscription du bénéficiaire : le conseiller, l'informer, l'orienter pendant la constitution de son dossier, lui fournir les formulaires nécessaires, les lui remplir ;", yPosition + LINE_HEIGHT);
  yPosition = addBulletPoint("Déposer et suivre le dossier de pré-inscription aux études à l'université choisie par le bénéficiaire avec son aide en vue de la réservation d'une place auprès de cette dernière université et de l'obtention d'une lettre d'acceptation / de reconnaissances des études initiales du bénéficiaire,", yPosition);
  yPosition = addBulletPoint("Envoyer la lettre ou une copie certifiée de celle-ci au bénéficiaire.", yPosition);
  
  pdf.setFont("helvetica", "bold");
  yPosition = addFormattedText("Ce service sera dénommé SERVICE PACK PREINSCRIPTION", yPosition + LINE_HEIGHT);
  pdf.setFont("helvetica", "normal");
  
  yPosition = addBulletPoint("Préparer l'inscription du bénéficiaire : lui réservant un logement ;", yPosition + LINE_HEIGHT);
  yPosition = addBulletPoint("Accueillir le bénéficiaire à son arrivée, l'accompagner au logement réservé ;", yPosition);
  yPosition = addBulletPoint("Lui faire faire une visite guidée de la ville et le tour de la cité universitaire ;", yPosition);
  yPosition = addBulletPoint("L'accompagner aux démarches d'inscription finale et d'obtention de la carte de séjour (constitution du dossier de demande de séjour : ouverture d'un compte bancaire pour obtention d'une preuve de substance, etc.).", yPosition);
  
  pdf.setFont("helvetica", "bold");
  yPosition = addFormattedText("Ce service sera dénommé SERVICE PACK INSCRIPTION.", yPosition + LINE_HEIGHT);
  yPosition = addFormattedText("L'option comprenant les deux sera dénommée PACK COMPLET.", yPosition + LINE_HEIGHT);
  pdf.setFont("helvetica", "normal");
  
  yPosition = addFormattedText(
    "Le prestataire fera toutes les démarches utiles et nécessaires pour mener à bien ce mandat, formulera des demandes, paiera les taxes en lieux et places du client, sa signature étant opposable à celle du bénéficiaire.",
    yPosition + LINE_HEIGHT
  );
  
  pdf.setFont("helvetica", "bold");
  yPosition = addFormattedText("Article 2 – Durée", yPosition + LINE_HEIGHT);
  pdf.setFont("helvetica", "normal");
  
  yPosition = addFormattedText(
    `Ce contrat est passé pour une durée s'étendant jusqu'à la fin des inscriptions de l'année académique 2024/2025. Il prendra effet ce ${formatDate(data.date)} et arrivera à son terme le 31/12/2024.`,
    yPosition + LINE_HEIGHT
  );

  pdf.addPage();
  pdf.setFontSize(14);
  pdf.setFont("helvetica", "bold");
  pdf.text("SUITE DU CONTRAT", PAGE_WIDTH/2, 25, { align: "center" });
  
  pdf.setFontSize(11);
  yPosition = 35;
  
  pdf.setFont("helvetica", "bold");
  yPosition = addFormattedText("Article 3 - Exécution de la prestation", yPosition);
  pdf.setFont("helvetica", "normal");
  
  yPosition = addFormattedText(
    "Le prestataire s'engage à mener à bien la tâche précisée à l'Article premier conformément aux règles de l'art et de la meilleure manière. À cet effet, il constituera l'équipe nécessaire à la réalisation du mandat et informera régulièrement le client sur l'évolution de sa mission.",
    yPosition + LINE_HEIGHT
  );
  
  pdf.setFont("helvetica", "bold");
  yPosition = addFormattedText("3.1 Obligation de collaborer", yPosition + LINE_HEIGHT);
  pdf.setFont("helvetica", "normal");
  
  yPosition = addFormattedText(
    "Le bénéficiaire tiendra à la disposition du prestataire toutes les informations et documents pouvant contribuer à la bonne réalisation de l'objet du présent contrat. À cette fin, le bénéficiaire assurera personnellement le dialogue avec le prestataire dans les diverses étapes du mandat contracté. Le bénéficiaire paiera les honoraires dus à temps et dans le respect des conditions contractuelles.",
    yPosition + LINE_HEIGHT
  );
  
  pdf.setFont("helvetica", "bold");
  yPosition = addFormattedText("Article 4 - Nature des obligations", yPosition + LINE_HEIGHT);
  pdf.setFont("helvetica", "normal");
  
  yPosition = addFormattedText(
    "Pour l'accomplissement des diligences et prestations prévues à l'Article premier ci-dessus, le Prestataire s'engage à donner ses meilleurs soins, conformément aux règles de l'art. La présente obligation, n'est, de convention expresse, que pure obligation de moyens.",
    yPosition + LINE_HEIGHT
  );
  
  pdf.setFont("helvetica", "bold");
  yPosition = addFormattedText("Article 5 - Responsabilité du Prestataire", yPosition + LINE_HEIGHT);
  pdf.setFont("helvetica", "normal");
  
  yPosition = addFormattedText(
    "La responsabilité du Prestataire n'est pas engagée dans la mesure où le préjudice que subirait le bénéficiaire n'est pas causé par une faute intentionnelle ou lourde du Prestataire.",
    yPosition + LINE_HEIGHT
  );
  
  pdf.setFont("helvetica", "bold");
  yPosition = addFormattedText("Article 6 – Paiement", yPosition + LINE_HEIGHT);
  pdf.setFont("helvetica", "normal");
  
  yPosition = addFormattedText(
    "En contrepartie de la réalisation des prestations définies à l'Article premier ci-dessus, le bénéficiaire versera au prestataire la somme forfaitaire stipulée dans l'annexe au présent contrat.",
    yPosition + LINE_HEIGHT
  );
  
  pdf.setFont("helvetica", "bold");
  yPosition = addFormattedText("Article 7 - Résiliation. Sanction", yPosition + LINE_HEIGHT);
  pdf.setFont("helvetica", "normal");
  
  yPosition = addFormattedText(
    "Tout manquement de l'une ou l'autre des parties aux obligations qu'elle a en charge, ci-dessus, entraînera, si bon semble au créancier de l'obligation inexécutée, la résiliation de plein droit au présent contrat, quinze jours après mise en demeure d'exécuter par lettre recommandée avec accusé de réception demeurée sans effet, sans préjudice de tous dommages et intérêts.",
    yPosition + LINE_HEIGHT
  );

  pdf.addPage();
  pdf.setFontSize(14);
  pdf.setFont("helvetica", "bold");
  pdf.text("SUITE DU CONTRAT", PAGE_WIDTH/2, 25, { align: "center" });
  
  pdf.setFontSize(11);
  yPosition = 35;
  
  pdf.setFont("helvetica", "bold");
  yPosition = addFormattedText("Article 8 - Clause de hardship", yPosition);
  pdf.setFont("helvetica", "normal");
  
  yPosition = addFormattedText(
    "Les parties reconnaissent que le présent accord ne constitue pas une base équitable et raisonnable de leur coopération. Dans le cas où les données sur lesquelles est basé cet accord sont modifiées dans des proportions telles que l'une ou l'autre des parties rencontre des difficultés sérieuses et imprévisibles, elles se consulteront mutuellement et devront faire preuve de compréhension mutuelle en vue de faire les ajustements qui apparaîtraient nécessaires à la suite de circonstances qui n'étaient pas raisonnablement prévisibles à la date de conclusion du présent accord et ce, afin que renaissent les conditions d'un accord équitable.",
    yPosition + LINE_HEIGHT
  );
  
  yPosition = addFormattedText(
    "La partie qui considère que les conditions énoncées au paragraphe ci-dessus sont remplies en avisera l'autre partie par lettre recommandée avec accusé de réception, en précisant la date et la nature du ou des événements à l'origine du changement allégué par elle en chiffrant le montant du préjudice financier actuel ou à venir et en faisant une proposition de dédommagement pour remédier à ce changement.",
    yPosition + LINE_HEIGHT
  );
  
  pdf.setFont("helvetica", "bold");
  yPosition = addFormattedText("Article 9 - Force majeure", yPosition + LINE_HEIGHT);
  pdf.setFont("helvetica", "normal");
  
  yPosition = addFormattedText(
    "On entend par force majeure des événements de guerre déclarés ou non déclarés, de grève générale de travail, de maladies épidémiques, de mise en quarantaine, d'incendie, de crues exceptionnelles, d'accidents ou d'autres événements indépendants de la volonté des deux parties. Aucune des deux parties ne sera tenue responsable du retard constaté en raison des événements de force majeure.",
    yPosition + LINE_HEIGHT
  );
  
  yPosition = addFormattedText(
    "En cas de force majeure, constatée par l'une des parties, celle-ci doit en informer l'autre partie par écrit dans les meilleurs délais par écrit, email. L'autre partie disposera de dix jours pour la constater. Les délais prévus pour la livraison seront automatiquement décalés en fonction de la durée de la force majeure.",
    yPosition + LINE_HEIGHT
  );
  
  pdf.setFont("helvetica", "bold");
  yPosition = addFormattedText("Article 10 - Loi applicable. Texte original", yPosition + LINE_HEIGHT);
  pdf.setFont("helvetica", "normal");
  
  yPosition = addFormattedText(
    "Le contrat est régi par la loi du pays où le prestataire a son siège social (Roumanie). Le texte en format électronique du présent contrat fait foi comme texte original.",
    yPosition + LINE_HEIGHT
  );
  
  pdf.setFont("helvetica", "bold");
  yPosition = addFormattedText("Article 11 - Compétence", yPosition + LINE_HEIGHT);
  pdf.setFont("helvetica", "normal");
  
  yPosition = addFormattedText(
    "Toutes contestations qui découlent du présent contrat ou qui s'y rapportent seront tranchées définitivement suivant le règlement de Conciliation et d'Arbitrage de la Chambre de Commerce Internationale sans aucun recours aux tribunaux ordinaires par un ou plusieurs arbitres nommés conformément à ce règlement et dont la sentence a un caractère obligatoire. Le tribunal arbitral sera juge de sa propre compétence et de la validité de la convention d'arbitrage.",
    yPosition + LINE_HEIGHT
  );
  
  yPosition += 20;
  pdf.text(`Fait le ${formatDate(data.date)}, en 2 (deux) exemplaires.`, MARGIN, yPosition);
  
  pdf.text("Le prestataire", MARGIN, yPosition + 10);
  pdf.text(`${data.delegate.lastName} ${data.delegate.firstName}`, MARGIN, yPosition + 20);
  
  pdf.text("Le Bénéficiaire", PAGE_WIDTH - MARGIN - 50, yPosition + 10);
  pdf.text(`${data.delegator.lastName} ${data.delegator.firstName}`, PAGE_WIDTH - MARGIN - 50, yPosition + 20);
  pdf.text("LU ET COMPRIS", PAGE_WIDTH - MARGIN - 50, yPosition + 30);
  pdf.text("(Signature): _________________", PAGE_WIDTH - MARGIN - 50, yPosition + 40);

  pdf.addPage();
  pdf.setFontSize(14);
  pdf.setFont("helvetica", "bold");
  pdf.text("AVENANT AU CONTRAT", PAGE_WIDTH/2, 25, { align: "center" });
  
  pdf.setFontSize(11);
  yPosition = 35;
  
  pdf.setFont("helvetica", "bold");
  yPosition = addFormattedText("AVENANT au Contrat de prestation de service d'aide à l'inscription aux études en Roumanie", yPosition);
  
  yPosition = addFormattedText("Payement", yPosition + LINE_HEIGHT);
  pdf.setFont("helvetica", "normal");
  
  yPosition = addFormattedText(
    "En contrepartie de la réalisation des prestations définies à l'Article premier ci-dessus, le client versera au prestataire la somme forfaitaire (la taxe de traitement du dossier inclus), le tout ventilé de la manière suivante :",
    yPosition + LINE_HEIGHT
  );
  
  pdf.setFont("helvetica", "bold");
  yPosition = addFormattedText(`A. Pack Pré-inscription : ${data.services.preInscriptionFee}€`, yPosition + LINE_HEIGHT);
  pdf.setFont("helvetica", "normal");
  
  yPosition = addFormattedText(
    `${data.services.evaluationFee}€ constituant le montant de la taxe non remboursable d'évaluation plus la traduction et légalisation en langue roumaine du dossier, plus ${data.services.agencyAdvance}€ d'avance sur les honoraires de l'agence soient ${data.services.preInscriptionFee}€ à la signature du présent contrat et à l'envoi du dossier par le bénéficiaire au prestataire ;`,
    yPosition + LINE_HEIGHT
  );
  
  pdf.setFont("helvetica", "bold");
  yPosition = addFormattedText(`B. Pack Inscription : ${data.services.inscriptionFee}€`, yPosition + LINE_HEIGHT);
  pdf.setFont("helvetica", "normal");
  
  yPosition = addFormattedText(
    `${data.services.inscriptionFee}€ à la délivrance de l'admission (la lettre d'acceptation) avant d'enclencher la procédure de demande de visa.`,
    yPosition + LINE_HEIGHT
  );
  
  pdf.setFont("helvetica", "bold");
  yPosition = addFormattedText(`C. Pack complet : ${data.services.preInscriptionFee + data.services.inscriptionFee}€`, yPosition + LINE_HEIGHT);
  pdf.setFont("helvetica", "normal");
  
  yPosition = addFormattedText(
    `${data.services.evaluationFee}€ constituant le montant de la taxe non remboursable d'évaluation plus la traduction et légalisation en langue roumaine du dossier, plus ${data.services.agencyAdvance}€ d'avance sur les honoraires de l'agence soient ${data.services.preInscriptionFee}€ à la signature du présent contrat et à l'envoi du dossier par le bénéficiaire au prestataire ;`,
    yPosition + LINE_HEIGHT
  );
  
  yPosition = addFormattedText(
    `${data.services.inscriptionFee}€ à la délivrance de l'admission (la lettre d'acceptation) avant d'enclencher la procédure de demande de visa.`,
    yPosition + LINE_HEIGHT
  );
  
  yPosition = addFormattedText(
    "Les sommes prévues ci-dessus seront payées en ligne par carte de débit/crédit (en cliquant tout simplement ce qui est souligné), par virement bancaire, par RIA avant l'arrivée du bénéficiaire, droits et taxes en sus.",
    yPosition + LINE_HEIGHT
  );
  
  yPosition = addFormattedText("Rayez les options qui ne vous conviennent pas avant de signer.", yPosition + LINE_HEIGHT);
  
  yPosition += 10;
  pdf.text(`Fait le ${formatDate(data.date)}, en 2 (deux) exemplaires.`, MARGIN, yPosition);
  
  pdf.text("Le prestataire", MARGIN, yPosition + 10);
  pdf.text(`${data.delegate.lastName} ${data.delegate.firstName}`, MARGIN, yPosition + 20);
  
  pdf.text("Le Bénéficiaire", PAGE_WIDTH - MARGIN - 50, yPosition + 10);
  pdf.text(`${data.delegator.lastName} ${data.delegator.firstName}`, PAGE_WIDTH - MARGIN - 50, yPosition + 20);
  pdf.text("LU ET COMPRIS", PAGE_WIDTH - MARGIN - 50, yPosition + 30);
  pdf.text("(Signature): _________________", PAGE_WIDTH - MARGIN - 50, yPosition + 40);

  return pdf;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric' 
  }).replace(/\//g, '-');
};