import "@/styles/globals.css";
import getServerSession from "@/util/getServerSession";
import React from "react";
import Logo from "./(layout)/Logo";
import NavMenu from "./(layout)/NavMenu";
import SessionStatus from "./(layout)/SessionStatus";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body>
        <div className="grid grid-rows-[auto_1fr] min-h-screen px-4 w-[clamp(20rem,80vw,80rem)] sm:w-3/4 mx-auto">
          <header className="grid grid-cols-[1fr_max-content_1fr] place-items-center justify-between h-24">
            <Logo />
            <NavMenu />
            <SessionStatus session={session} />
          </header>
          <div className="grid">{children}</div>
        </div>
      </body>
    </html>
  );
}
