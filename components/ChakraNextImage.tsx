import { Box, BoxProps } from "@chakra-ui/react";
import NextImage from "next/image";

interface ChakraNextImageProps extends BoxProps {
  src: string;
  alt: string;
}

const ChakraNextImage: React.FC<ChakraNextImageProps> = ({
  src,
  alt,
  ...rest
}) => {
  return (
    <Box position="relative" {...rest}>
      <NextImage src={src} alt={alt} layout="fill" objectFit="cover" />
    </Box>
  );
};

export default ChakraNextImage;
