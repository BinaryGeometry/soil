import "~/styles/globals.css";

import "@uploadthing/react/styles.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";

import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes';

import { Toaster } from "~/components/ui/sonner"


import { TopNav } from "~/app/_components/top-nav";

import { CSPostHogProvider } from '~/app/_analytics/provider'




const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "SOIL",
  description: "SOIL t3",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
// import TopNav

export default function RootLayout({
  children,
  modal
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <ClerkProvider appearance={{
      baseTheme: dark
    }}>
    <CSPostHogProvider>
      

    <html lang="en">
      <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
      
      <body className={`font-sans ${inter.variable} dark`}>
        <div className=" h-screen grid grid-rows-[auto,1fr]">
          <TopNav></TopNav>
          <main className="overflow-y-scroll">
            {children}
          </main>
        </div>
        {modal}
        <Toaster />
        
        <div id="modal-root" />
        {/* <TRPCReactProvider> */}
        {/* </TRPCReactProvider> */}
      
      </body>
    </html>
    </CSPostHogProvider>
    </ClerkProvider>
  );
}
