'use client'

import { Box, Spinner, Text } from '@chakra-ui/react'

export const LoadingState = () => {
  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={4}
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="brand.primary"
        size="xl"
      />
      <Text color="brand.primary" fontSize="lg">
        Loading...
      </Text>
    </Box>
  )
}
