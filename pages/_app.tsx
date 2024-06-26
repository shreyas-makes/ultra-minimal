import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Prose, withProse } from "@nikolovlazar/chakra-ui-prose";
import Layout from "../components/Layout";
import { ReactElement, ReactNode } from "react";
import { DefaultSeo } from "next-seo";
import posthog from "posthog-js";
import React from "react";
import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";

function Callout({ children }: { children: ReactNode }) {
  return (
    <Box
      p={4}
      bg="blue.50"
      borderWidth="1px"
      borderColor="blue.400"
      borderRadius="md"
      mb={4}
    >
      {children}
    </Box>
  );
}

const theme = extendTheme(
  {
    fonts: {
      heading: "Verdana, sans-serif",
      body: "Verdana, serif",
    },
  },
  withProse({
    baseStyle: {
      h1: {
        mt: 4,
        mb: 4,
        fontSize: ["xl", "3xl", "4xl"],
      },
      h2: {
        mt: 4,
        mb: 4,
        fontSize: ["lg", "2xl"],
      },
      "h3, h4, h5, h6": {
        mt: 4,
        mb: 4,
        fontSize: ["lg", "xl"],
      },
      p: {
        my: 6,
        fontSize: ["sm", "lg", "xl"],
        fontWeight: "500",
        lineHeight: "1.5em",
        wordSpacing: "0.01em",
      },
      a: {
        color: "blue.400",
        fontWeight: "900",
      },
      li: {
        my: 4,
        fontSize: ["sm", "lg", "xl"],
        fontWeight: "500",
        lineHeight: "1.5em",
        wordSpacing: "0.01em",
      },
    },
  }),
);

const getDefaultLayout = (page: ReactElement) => (
  <Layout>
    <Prose>{page}</Prose>
  </Layout>
);

export default function App({
  Component,
  pageProps,
}: AppProps & { Component: React.ComponentType }) {
  const router = useRouter();
  const getLayout = Component.getLayout || getDefaultLayout;

  React.useEffect(() => {
    const handleRouteChange = () => {
      console.log("Route change completed");
      posthog.capture("$pageview");
    };
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
              url: "https://shreyasprakash.com/public/og-image-dark.jpg",
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
