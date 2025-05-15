import { Nunito, Oswald } from "next/font/google";

export const fontNunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const fontOswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald", // Make sure to set the correct variable
});
