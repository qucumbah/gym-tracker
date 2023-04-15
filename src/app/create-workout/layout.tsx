import "@/styles/globals.css";
import getServerSession from "@/utils/getServerSession";
import React from "react";

export const metadata = {
  title: "Create Workout",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await getServerSession({ required: true });

  return children;
}
