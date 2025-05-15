import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const AgentDashboard = ({ students, onViewProcuration }) => {
  // Helper function to format currency
  const formatCurrency = (amount, currency) => {
    return `${amount} ${currency}`;
  };

  // Calculate total revenue
  const calculateTotalRevenue = () => {
    return students.reduce((total, student) => {
      switch (student.services.selectedPack) {
        case "PRE_INSCRIPTION":
          return total + student.services.preInscriptionFee;
        case "INSCRIPTION":
          return total + student.services.inscriptionFee;
        case "COMPLET":
          return total + student.services.preInscriptionFee + student.services.inscriptionFee;
        default:
          return total;
      }
    }, 0);
  };

  // Get pack status display
  const getPackStatus = (pack) => {
    switch (pack) {
      case "PRE_INSCRIPTION":
        return <Badge className="bg-blue-500">Pré-inscription</Badge>;
      case "INSCRIPTION":
        return <Badge className="bg-green-500">Inscription</Badge>;
      case "COMPLET":
        return <Badge className="bg-purple-500">Pack Complet</Badge>;
      default:
        return <Badge className="bg-gray-500">Non défini</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Tableau de bord du mandataire</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Étudiants</CardTitle>
            <CardDescription>Nombre total d'étudiants</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{students.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Revenue</CardTitle>
            <CardDescription>Montant total des services</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{formatCurrency(calculateTotalRevenue(), "€")}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Packs</CardTitle>
            <CardDescription>Répartition des packs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span>Pré-inscription:</span>
                <span>{students.filter(s => s.services.selectedPack === "PRE_INSCRIPTION").length}</span>
              </div>
              <div className="flex justify-between">
                <span>Inscription:</span>
                <span>{students.filter(s => s.services.selectedPack === "INSCRIPTION").length}</span>
              </div>
              <div className="flex justify-between">
                <span>Complet:</span>
                <span>{students.filter(s => s.services.selectedPack === "COMPLET").length}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Liste des étudiants</CardTitle>
          <CardDescription>Liste des étudiants avec leurs procurations</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Nationalité</TableHead>
                <TableHead>Pack</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {student.delegator.lastName} {student.delegator.firstName}
                  </TableCell>
                  <TableCell>{student.delegator.nationality}</TableCell>
                  <TableCell>{getPackStatus(student.services.selectedPack)}</TableCell>
                  <TableCell>{new Date(student.date).toLocaleDateString('fr-FR')}</TableCell>
                  <TableCell>
                    {formatCurrency(
                      student.services.selectedPack === 'COMPLET' 
                        ? student.services.preInscriptionFee + student.services.inscriptionFee
                        : student.services.selectedPack === 'PRE_INSCRIPTION'
                        ? student.services.preInscriptionFee
                        : student.services.inscriptionFee,
                      '€'
                    )}
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => onViewProcuration(student)}
                      className="flex items-center gap-1"
                    >
                      <FileText className="h-4 w-4" />
                      Voir Procuration
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {students.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    Aucun étudiant inscrit
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentDashboard;