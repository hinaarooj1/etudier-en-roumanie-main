import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersonalInfoSection } from "./procuration/PersonalInfoSection";
import { ExpensesSection } from "./procuration/ExpensesSection";
import { ServicesSection } from "./procuration/ServicesSection";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

import useSWR, { mutate } from "swr";
const ProcurationForm = ({ onSubmit }) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ["personal", "delegate", "expenses", "services"];

  const methods = useForm({
    defaultValues: {
      delegator: {
        firstName: "",
        lastName: "",
        nationality: "",
        country: "",
        passportNumber: "",
        gender: undefined,
      },
      delegate: {
        firstName: "INGAUTA POPESCU CLOTAIRE JONAS",
        lastName: "",
        nationality: "roumaine",
        idSeries: "RK",
        idNumber: "876692",
        address: "Calea Grivitei, No. 232, bloc 2, sc. E, etaj 4, apt. 147, sector 1, 010713 Bucarest, Roumanie",
        gender: "HOMME",
        phone: "+40-311 016 865",
        website: "www.etudes-en-roumanie.net",
        bankName: "BANCA TRANSILVANIA – ROUMANIE",
        iban: "RO68BTRLEURCRT0CJ1417401",
        swift: "BTRLRO22"
      },
      date: new Date().toISOString().split('T')[0],
      city: "",
      expenses: {
        medicalAnalysis: 190,
        stayFee: 260,
        consularFees: 120,
        bankStatement: 4000,
        healthInsurance: 150,
        healthInsuranceTax: 208,
      },
      services: {
        selectedPack: "COMPLET",
        preInscriptionFee: 750,
        inscriptionFee: 750,
        evaluationFee: 250,
        agencyAdvance: 500,
      }
    },
  });

  const { register, handleSubmit, formState: { errors }, control, trigger } = methods;

  // const onSubmitForm = (data) => {
  //   console.log('datassas: ', data);
  //   try { 
  //     toast({
  //       title: "Succès",
  //       description: "Votre procuration a été générée."
  //     });
  //   } catch (error) {
  //     toast({
  //       title: "Erreur",
  //       description: "Une erreur est survenue lors de la génération du document.",
  //       variant: "destructive"
  //     });
  //   }
  // };
  const onSubmitForm = async (data) => {
   
    try {
      // Optimistic update - add the new procuration to local state immediately
      mutate(
        "/api/procurations",
        (currentData) => ({
          ...currentData,
          data: [...(currentData?.data || []), {
            ...data,
            id: Date.now().toString(), // Temporary ID
            createdAt: new Date().toISOString(),
            status: 'pending' // Mark as pending until confirmed
          }]
        }),
        false // Don't revalidate yet
      );
  
      // Send the actual POST request
      const response = await fetch('/api/procurations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include auth headers if needed
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        throw new Error('Failed to create procuration');
      }
  
      const result = await response.json();
  
      // Update the optimistic data with the server response
      mutate(
        "/api/procurations",
        (currentData) => ({
          ...currentData,
          data: currentData.data.map(item => 
            item.status === 'pending' 
              ? { ...result, status: 'confirmed' } 
              : item
          )
        }),
        true // Revalidate to ensure we have fresh data
      );
  
      toast({
        title: "Succès",
        description: "Votre procuration a été générée avec succès.",
        variant: "default"
      });
  
      // Reset form after successful submission
      methods.reset();
      setCurrentStep(0);
  
    } catch (error) {
      // Revert the optimistic update on error
      mutate(
        "/api/procurations",
        (currentData) => ({
          ...currentData,
          data: currentData.data.filter(item => item.status !== 'pending')
        }),
        true
      );
  
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de la génération du document.",
        variant: "destructive"
      });
    }
  };
  const nextStep = async () => {
    // Validate current step before proceeding
    let isValid = false;
    
    switch (currentStep) {
      case 0: // personal
        isValid = await trigger(["delegator.firstName", "delegator.lastName", "delegator.nationality", 
                               "delegator.country", "delegator.passportNumber", "city", "date"]);
        break;
      case 1: // delegate
        isValid = await trigger(["delegate.firstName", "delegate.lastName"]);
        break;
      case 2: // expenses
        isValid = true; // No required fields in expenses
        break;
      default:
        isValid = true;
    }

    if (isValid && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="space-y-2 mb-6">
        <h1 className="text-2xl font-bold text-center text-[#1A365D]">Procuration Spéciale</h1>
        <p className="text-sm text-gray-500 text-center">
          Étape {currentStep + 1} sur {steps.length}
        </p>
      </div>

      <FormProvider {...methods}>
        <form  onSubmit={(e) => {
    e.preventDefault(); // Prevent page reload
    // Your custom logic here
  }}  className="space-y-8">
          <Tabs value={steps[currentStep]} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal" onClick={() => setCurrentStep(0)}>
                Délégateur
              </TabsTrigger>
              <TabsTrigger value="delegate" onClick={() => setCurrentStep(1)}>
                Mandataire
              </TabsTrigger>
              <TabsTrigger value="expenses" onClick={() => setCurrentStep(2)}>
                Dépenses
              </TabsTrigger>
              <TabsTrigger value="services" onClick={() => setCurrentStep(3)}>
                Services
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4">
              <PersonalInfoSection 
                type="delegator"
                control={control}
                errors={errors}
                register={register}
              />

              <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
                <h2 className="text-lg font-semibold text-[#1A365D] mb-4">Informations complémentaires</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Ville</Label>
                    <Input 
                      {...register("city", { required: true })}
                      placeholder="Ville de signature"
                      className="border-gray-300"
                    />
                    {errors?.city && (
                      <p className="text-xs text-red-500">Ce champ est requis</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input 
                      type="date"
                      {...register("date", { required: true })}
                      className="border-gray-300"
                    />
                    {errors?.date && (
                      <p className="text-xs text-red-500">Ce champ est requis</p>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="delegate" className="space-y-4">
              <PersonalInfoSection 
                type="delegate"
                control={control}
                errors={errors}
                register={register}
              />
            </TabsContent>

            <TabsContent value="expenses" className="space-y-4">
              <ExpensesSection register={register} />
            </TabsContent>

            <TabsContent value="services" className="space-y-4">
              <ServicesSection control={control} register={register} />
            </TabsContent>
          </Tabs>

          <div className="flex justify-between">
            {currentStep > 0 && (
              <Button 
                type="button"
                variant="outline"
                onClick={prevStep}
                className="bg-white text-[#1A365D] border-[#1A365D] hover:bg-gray-50"
              >
                Précédent
              </Button>
            )}
            
            {currentStep < steps.length - 1 ? (
              <Button 
                type="button"
                onClick={nextStep}
                className="ml-auto bg-[#1A365D] hover:bg-[#2A466D] text-white"
              >
                Suivant
              </Button>
            ) : (
              <Button  onClick={handleSubmit(onSubmitForm)}
                type="submit"
                className="ml-auto bg-[#1A365D] hover:bg-[#2A466D] text-white"
              > 
                Générer la procuration
              </Button>
            )}
          </div>
        </form>
      </FormProvider>
    </Card>
  );
};

export default ProcurationForm;