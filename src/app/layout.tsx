import "@/styles/globals.css";
import getServerSession from "@/utils/getServerSession";
import React from "react";
import Logo from "./(layout)/Logo";
import NavMenu from "./(layout)/NavMenu";
import SessionStatus from "./(layout)/SessionStatus";
import TRPCClientProvider from "./(layout)/TRPCClientProvider";
import { headers } from "next/headers";

export const metadata = {
  viewport: "width=device-width, initial-scale=1",
  description: "Gym tracker app built using Next.js 13 with app directory",
  keywords: "gym progress app Next.js 13",
  themeColor: "#3B82F6",
  icons: "/icon.svg",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  const cookieHeader = headers().get("cookie") ?? "";

  return (
    <TRPCClientProvider cookieHeader={cookieHeader}>
      <html lang="en">
        <body>
          <div className="grid grid-rows-[auto_1fr] min-h-screen px-4 w-[clamp(20rem,80vw,80rem)] mx-auto">
            <header className="grid grid-cols-[1fr_max-content_1fr] place-items-center justify-between h-24">
              <Logo />
              <NavMenu />
              <SessionStatus session={session} />
            </header>
            <div className="grid">{children}</div>
          </div>
        </body>
      </html>
    </TRPCClientProvider>
  );
}
