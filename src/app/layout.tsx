import "~/styles/globals.css";

import "@uploadthing/react/styles.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";

import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes';

import { Toaster } from "~/components/ui/sonner"


import { TopNav } from "~/app/_components/top-nav";

import { CSPostHogProvider } from '~/app/_analytics/provider'

{/* <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png">
<link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png">
<link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png">
<link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png">
<link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png">
<link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png">
<link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png">
<link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png">
<link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="manifest" href="/manifest.json">
<meta name="msapplication-TileColor" content="#ffffff">
<meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
<meta name="theme-color" content="#ffffff"></meta>
 */}

// https://nextjs.org/docs/app/building-your-application/optimizing/fonts#with-tailwind-css


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
          {/* <main className="overflow-y-scroll"> */}
            {children}
          {/* </main> */}
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
