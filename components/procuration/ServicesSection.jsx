import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const ServicesSection = ({ control, register }) => {
  return (
    <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
      <h2 className="text-lg font-semibold text-[#1A365D] mb-4">Services et Packs</h2>

      <div className="space-y-2 mb-4">
        <Label htmlFor="services.selectedPack">Sélectionnez votre pack</Label>
        <FormField
          control={control}
          name="services.selectedPack"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="border-gray-300">
                    <SelectValue placeholder="Sélectionnez un pack" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PRE_INSCRIPTION">Pack Pré-inscription</SelectItem>
                    <SelectItem value="INSCRIPTION">Pack Inscription</SelectItem>
                    <SelectItem value="COMPLET">Pack Complet</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="services.preInscriptionFee">Prix Pack Pré-inscription (€)</Label>
          <Input
            type="number"
            {...register("services.preInscriptionFee", { required: true })}
            className="border-gray-300"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="services.inscriptionFee">Prix Pack Inscription (€)</Label>
          <Input
            type="number"
            {...register("services.inscriptionFee", { required: true })}
            className="border-gray-300"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="space-y-2">
          <Label htmlFor="services.evaluationFee">Taxe d'évaluation (€)</Label>
          <Input
            type="number"
            {...register("services.evaluationFee", { required: true })}
            className="border-gray-300"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="services.agencyAdvance">Avance Agence (€)</Label>
          <Input
            type="number"
            {...register("services.agencyAdvance", { required: true })}
            className="border-gray-300"
          />
        </div>
      </div>
    </div>
  );
};
