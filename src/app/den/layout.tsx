
import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { DenMenuBar } from "../_components/menu-bar";
import { DenNavigationMenu } from "./_components/DenNavigationMenu";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "SOIL",
  description: "SOIL t3",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};


export default function DenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

      <div className="container relative">
        
          <DenNavigationMenu />
          {children}
        
     
        
        {/* <DenMenuBar /> */}
        {/* <TRPCReactProvider> */}
           
        {/* </TRPCReactProvider> */}
      

      </div>
  );
}
