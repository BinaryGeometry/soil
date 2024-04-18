import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "SOIL",
  description: "SOIL t3",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

function TopNav() {
  return (
      <nav className="flex items-center justify-between w-full p-4 text-xl font-semibold border-b">
          <div>Soil</div>
      </nav>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} flex flex-col gap-4`}>
        <TopNav/>
        

        {/* <TRPCReactProvider> */}
          {children}
          {/* </TRPCReactProvider> */}
      
      </body>
    </html>
  );
}
