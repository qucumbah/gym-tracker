import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import type { AppType, AppProps } from "next/app";
import Layout from "@/components/common/Layout";
import { trpc } from "@/utils/trpc";

export type NextPageWithCustomLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithCustomLayout;
};

const getDefaultLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

const MyApp: AppType = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? getDefaultLayout;
  return (
    <SessionProvider session={pageProps.session}>
      {getLayout(<Component {...pageProps} />)}
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
