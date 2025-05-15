import React from "react";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const PersonalInfoSection = ({ type, control, errors, register }) => {
  const title =
    type === "delegator"
      ? "Informations du délégateur"
      : "Informations du mandataire";
  const person = type === "delegator" ? "delegator" : "delegate";

  return (
    <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
      <h2 className="text-lg font-semibold text-[#1A365D] mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor={`${person}.lastName`}>Nom</Label>
          <Input
            {...register(`${person}.lastName`, { required: true })}
            placeholder="Nom de famille"
            className="border-gray-300"
          />
          {errors?.[person]?.lastName && (
            <p className="text-xs text-red-500">Ce champ est requis</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${person}.firstName`}>Prénom</Label>
          <Input
            {...register(`${person}.firstName`, { required: true })}
            placeholder="Prénom"
            className="border-gray-300"
          />
          {errors?.[person]?.firstName && (
            <p className="text-xs text-red-500">Ce champ est requis</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${person}.firstName`}>Email</Label>
          <Input
            {...register(`${person}.firstName`, { required: true })}
            placeholder="Email"
            className="border-gray-300"
          />
          {errors?.[person]?.firstName && (
            <p className="text-xs text-red-500">Ce champ est requis</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="space-y-2">
          <Label htmlFor={`${person}.nationality`}>Nationalité</Label>
          <Input
            {...register(`${person}.nationality`, { required: true })}
            placeholder="Nationalité"
            className="border-gray-300"
          />
          {errors?.[person]?.nationality && (
            <p className="text-xs text-red-500">Ce champ est requis</p>
          )}
        </div>
        {type === "delegator" ? (
          <div className="space-y-2">
            <Label htmlFor={`${person}.country`}>Pays de résidence</Label>
            <Input
              {...register(`${person}.country`, { required: true })}
              placeholder="Pays de résidence"
              className="border-gray-300"
            />
            {errors?.[person]?.country && (
              <p className="text-xs text-red-500">Ce champ est requis</p>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            <Label htmlFor={`${person}.idSeries`}>Série CNI roumaine</Label>
            <Input
              {...register(`${person}.idSeries`, { required: true })}
              placeholder="Série de la carte d'identité"
              className="border-gray-300"
            />
            {errors?.[person]?.idSeries && (
              <p className="text-xs text-red-500">Ce champ est requis</p>
            )}
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {type === "delegator" ? (
          <div className="space-y-2">
            <Label htmlFor={`${person}.passportNumber`}>Numéro de passeport</Label>
            <Input
              {...register(`${person}.passportNumber`, { required: true })}
              placeholder="Numéro de passeport"
              className="border-gray-300"
            />
            {errors?.[person]?.passportNumber && (
              <p className="text-xs text-red-500">Ce champ est requis</p>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            <Label htmlFor={`${person}.idNumber`}>Numéro CNI</Label>
            <Input
              {...register(`${person}.idNumber`, { required: true })}
              placeholder="Numéro de la carte d'identité"
              className="border-gray-300"
            />
            {errors?.[person]?.idNumber && (
              <p className="text-xs text-red-500">Ce champ est requis</p>
            )}
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor={`${person}.gender`}>Sexe</Label>
          <FormField
            control={control}
            name={`${person}.gender`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="Sélectionnez le sexe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="HOMME">Homme</SelectItem>
                      <SelectItem value="FEMME">Femme</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          {errors?.[person]?.gender && (
            <p className="text-xs text-red-500">Ce champ est requis</p>
          )}
        </div>
      </div>
      {type === "delegate" && (
        <div className="space-y-2 mt-4">
          <Label htmlFor={`${person}.address`}>Adresse</Label>
          <Input
            {...register(`${person}.address`, { required: true })}
            placeholder="Adresse complète"
            className="border-gray-300"
          />
          {errors?.[person]?.address && (
            <p className="text-xs text-red-500">Ce champ est requis</p>
          )}
        </div>
      )}
    </div>
  );
};
