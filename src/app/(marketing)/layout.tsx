import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "SOIL mush rooms",
  description: "SOIL mush rooms",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>

<header className="full-width">MushRooms</header>
        {/* <TRPCReactProvider></TRPCReactProvider> */}
        {children}
      </div>
  );
}
