import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Prose, withProse } from "@nikolovlazar/chakra-ui-prose";
import Layout from "../components/Layout";
import { ReactElement } from "react";
import { DefaultSeo } from "next-seo";
import posthog from "posthog-js";
import React from "react";
import { useRouter } from "next/router";

const theme = extendTheme(
  {
    fonts: {
      heading: "Verdana, sans-serif",
      body: "Verdana, sans-serif",
    },
  },
  withProse({
    baseStyle: {
      "h1": {
        mt: 4,
        mb: 4,
        fontSize: "3xl", // Reduced from original size
      },
      "h2": {
        mt: 4,
        mb: 4,
        fontSize: "2xl", // Reduced from original size
      },
      "h3, h4, h5, h6": {
        mt: 4,
        mb: 4,
        fontSize: "xl", // Reduced from original size
      },
      p: {
        my: 3,
        fontSize: "l", // Reduced from original size
      },
      a: {
        color: "blue.900",
      },
    },
  })
);

const getDefaultLayout = (page: ReactElement) => (
  <Layout>
    <Prose>{page}</Prose>
  </Layout>
);

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const getLayout = Component.getLayout || getDefaultLayout;

  React.useEffect(() => {
    const handleRouteChange = () => posthog.capture("$pageview");
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]); 

  return (
    <ChakraProvider theme={theme}>
      <DefaultSeo
        title="Shreyas Prakash"
        description="I'm Shreyas, a designer and aspiring technical generalist. I'm also a product manager at Noora Health."
        openGraph={{
          title: "Shreyas",
          description:
            "I'm Shreyas, a designer and aspiring technical generalist. I'm also a product manager at Noora Health.",
          images: [
            {
              url: "https://adammaj.com/og-image-dark.jpg",
              type: "image/jpeg",
            },
          ],
          siteName: "Shreyas Prakash",
        }}
      />
      {getLayout(<Component {...pageProps} />)}
    </ChakraProvider>
  );
}
