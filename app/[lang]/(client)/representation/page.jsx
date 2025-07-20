"use client";
import { fetcher } from "@/lib/utils/fetcher";
import useSWR from "swr";
import { Globe, Mail, Phone, MapPin, Info, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function RepresentationPage() {
  const { data, error, isLoading } = useSWR("/api/representation", fetcher);

  // Enhanced loading state with spinning loader
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-[60vh] flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
          <p className="text-lg text-muted-foreground">
            Chargement des représentations...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          Représentations Internationales
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Notre réseau de partenaires à travers le monde pour vous servir au mieux
        </p>
      </div>

      {/* Error State */}
      {error && (
        <div className="text-center py-12">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <Info className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            Erreur de chargement
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {error.message || "Impossible de charger les données"}
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => mutate("/api/representation")}
          >
            Réessayer
          </Button>
        </div>
      )}

      {/* Empty State */}
      {!error && data?.data.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <Globe className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            Aucune représentation trouvée
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Notre réseau international est en cours de développement
          </p>
        </div>
      )}

      {/* Success State */}
      {!error && data?.data.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 justify-center lg:grid-cols-3 gap-6">
          {data.data.map((rep) => (
            <Card key={rep.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 text-blue-600">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold">
                      {rep.country || "Pays non spécifié"}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">GO INTERNATIONAL</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {rep.email ? (
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 mt-0.5 text-blue-500 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <a
                        href={`mailto:${rep.email}`}
                        className="text-sm font-medium hover:text-blue-600 hover:underline"
                      >
                        {rep.email}
                      </a>
                    </div>
                  </div>
                ) : null}

                {rep.phone ? (
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 mt-0.5 text-blue-500 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Téléphone</p>
                      <a
                        href={`tel:${rep.phone}`}
                        className="text-sm font-medium hover:text-blue-600 hover:underline"
                      >
                        {rep.phone}
                      </a>
                    </div>
                  </div>
                ) : null}

                {rep.website ? (
                  <div className="flex items-start gap-3">
                    <Globe className="h-5 w-5 mt-0.5 text-blue-500 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Site Web</p>
                      <a
                        href={rep.website.startsWith('http') ? rep.website : `https://${rep.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium hover:text-blue-600 hover:underline"
                      >
                        {rep.website.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  </div>
                ) : null}

                {rep.address ? (
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 mt-0.5 text-blue-500 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Adresse</p>
                      <p className="text-sm font-medium">{rep.address}</p>
                    </div>
                  </div>
                ) : null}

                {rep.details ? (
                  <div className="pt-2 border-t">
                    <p className="text-sm text-muted-foreground">Détails</p>
                    <p className="text-sm">{rep.details}</p>
                  </div>
                ) : null}
              </CardContent>
              {rep.email && (
                <CardFooter className="flex justify-end">
                  <Button variant="outline" size="sm" asChild>
                    <a href={`mailto:${rep.email}`}>Contacter</a>
                  </Button>
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}