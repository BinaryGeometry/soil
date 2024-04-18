import "~/styles/globals.css";

import "@uploadthing/react/styles.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";

import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes';


import { TopNav } from "~/app/_components/top-nav";

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
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider appearance={{
      baseTheme: dark
    }}>
    <html lang="en">
      <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
      
      <body className={`font-sans ${inter.variable} flex flex-col gap-4`}>
        <TopNav></TopNav>
        

        {/* <TRPCReactProvider> */}
          {children}
          {/* </TRPCReactProvider> */}
      
      </body>
    </html>
    </ClerkProvider>
  );
}
