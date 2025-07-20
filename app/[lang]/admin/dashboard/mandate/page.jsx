"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AgentDashboard from "@/components/dashboard/AgentDashboard";
import ProcurationForm from "@/components/ProcurationForm";
import ProcurationDocument from "@/components/ProcurationDocument";

const AgentDashboardPage = () => {
  const [students, setStudents] = useState([]);
  
  const [procurations, setProcurations] = useState([]);
  const [selectedProcuration, setSelectedProcuration] = useState(null); 
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const fetchProcurations = async () => {
      try {
        const response = await fetch('/api/procurations');
        if (!response.ok) throw new Error('Failed to fetch procurations');
        const data = await response.json();
        setProcurations(data.data || []);
      } catch (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
      } finally {
        // setIsLoading(false);
      }
    };

    fetchProcurations();
     
  });

  const handleProcurationSubmit = (data) => {
    
    const updatedStudents = [...students, data];
    localStorage.setItem('students', JSON.stringify(updatedStudents));
    setStudents(updatedStudents);
    setSelectedProcuration(data);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-6">Tableau de Bord Mandataire</h1>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList>
          <TabsTrigger value="dashboard">Liste des Étudiants</TabsTrigger>
          <TabsTrigger value="procuration">Nouvelle Procuration</TabsTrigger>
          {hasMounted && selectedProcuration && (
            <TabsTrigger value="document">Document de Procuration</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="dashboard">
          <Card>
            <CardContent className="pt-6">
              <AgentDashboard
               
                  students={procurations}
                onViewProcuration={(data) => {
                  setSelectedProcuration(data);
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="procuration">
          <Card>
            <CardContent className="pt-6">
              <ProcurationForm onSubmit={handleProcurationSubmit} />
            </CardContent>
          </Card>
        </TabsContent>

        {hasMounted && selectedProcuration && (
          <TabsContent value="document">
            <ProcurationDocument data={selectedProcuration} />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default AgentDashboardPage;