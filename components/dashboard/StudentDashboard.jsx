import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { generateProcurationPDF } from "@/services/pdfService";

const StudentDashboard = ({ data, onEditClick }) => {
  // Helper function to format currency
  const formatCurrency = (amount, currency) => {
    return `${amount} ${currency}`;
  };

  const downloadPDF = () => {
    const pdf = generateProcurationPDF(data);
    pdf.save('procuration.pdf');
  };

  // Calculate total based on selected pack
  const getPackTotal = () => {
    switch (data.services.selectedPack) {
      case "PRE_INSCRIPTION":
        return data.services.preInscriptionFee;
      case "INSCRIPTION":
        return data.services.inscriptionFee;
      case "COMPLET":
        return data.services.preInscriptionFee + data.services.inscriptionFee;
      default:
        return 0;
    }
  };

  // Get pack name
  const getPackName = () => {
    switch (data.services.selectedPack) {
      case "PRE_INSCRIPTION":
        return "Pack Pré-inscription";
      case "INSCRIPTION":
        return "Pack Inscription";
      case "COMPLET":
        return "Pack Complet";
      default:
        return "Non défini";
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Tableau de bord étudiant</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Service sélectionné</CardTitle>
            <CardDescription>Type de pack</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-semibold">{getPackName()}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Coût total</CardTitle>
            <CardDescription>Montant à payer</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{formatCurrency(getPackTotal(), "€")}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Mandataire</CardTitle>
            <CardDescription>Coordonnées</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-medium">{data.delegate.lastName} {data.delegate.firstName}</p>
            <p className="text-sm text-gray-500 mt-1">{data.delegate.address}</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Procuration</CardTitle>
          <CardDescription>Résumé de votre procuration</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Informations personnelles</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
                <div>
                  <p className="text-sm text-gray-500">Nom complet</p>
                  <p>{data.delegator.lastName} {data.delegator.firstName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Nationalité</p>
                  <p>{data.delegator.nationality}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pays de résidence</p>
                  <p>{data.delegator.country}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Numéro de passeport</p>
                  <p>{data.delegator.passportNumber}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold">Dépenses à prévoir</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
                <div>
                  <p className="text-sm text-gray-500">Analyses médicales</p>
                  <p>{formatCurrency(data.expenses.medicalAnalysis, "lei")} (~{formatCurrency(Math.round(data.expenses.medicalAnalysis / 4.7), "€")})</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Prix par séjour</p>
                  <p>{formatCurrency(data.expenses.stayFee, "lei")} (~{formatCurrency(Math.round(data.expenses.stayFee / 4.7), "€")})</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Frais consulaires</p>
                  <p>{formatCurrency(data.expenses.consularFees, "€")}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Relevé bancaire à prévoir</p>
                  <p>{formatCurrency(data.expenses.bankStatement, "€")}</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-between items-center pt-4 border-t">
              <div>
                <p className="text-sm text-gray-500">Lieu et date</p>
                <p>{data.city}, {new Date(data.date).toLocaleDateString('fr-FR')}</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={onEditClick}>
                  Modifier les informations
                </Button>
                <Button className="flex items-center gap-2" onClick={downloadPDF}>
                  <FileDown className="w-4 h-4" /> 
                  Télécharger la procuration
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDashboard;2