import { Box } from "@chakra-ui/react";
import NextImage from "next/image";

const ChakraNextImage = ({ src, alt, ...rest }) => {
  return (
    <Box position="relative" {...rest}>
      <NextImage src={src} alt={alt} layout="fill" objectFit="cover" />
    </Box>
  );
};

export default ChakraNextImage;
