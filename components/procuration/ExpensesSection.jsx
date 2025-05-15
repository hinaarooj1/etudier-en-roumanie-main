import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const ExpensesSection = ({ register }) => {
  return (
    <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
      <h2 className="text-lg font-semibold text-[#1A365D] mb-4">Dépenses courantes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expenses.medicalAnalysis">Analyses médicales (lei)</Label>
          <Input 
            type="number"
            {...register("expenses.medicalAnalysis", { required: true })}
            className="border-gray-300"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="expenses.stayFee">Prix par séjour (lei)</Label>
          <Input 
            type="number"
            {...register("expenses.stayFee", { required: true })}
            className="border-gray-300"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="space-y-2">
          <Label htmlFor="expenses.consularFees">Frais consulaires (€)</Label>
          <Input 
            type="number"
            {...register("expenses.consularFees", { required: true })}
            className="border-gray-300"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="expenses.bankStatement">Relevé de compte bancaire (€)</Label>
          <Input 
            type="number"
            {...register("expenses.bankStatement", { required: true })}
            className="border-gray-300"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="space-y-2">
          <Label htmlFor="expenses.healthInsurance">Assurance maladie privée (lei/an)</Label>
          <Input 
            type="number"
            {...register("expenses.healthInsurance", { required: true })}
            className="border-gray-300"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="expenses.healthInsuranceTax">Taxe à la Caisse d'Assurance Maladie (lei/mois)</Label>
          <Input 
            type="number"
            {...register("expenses.healthInsuranceTax", { required: true })}
            className="border-gray-300"
          />
        </div>
      </div>
    </div>
  );
};
