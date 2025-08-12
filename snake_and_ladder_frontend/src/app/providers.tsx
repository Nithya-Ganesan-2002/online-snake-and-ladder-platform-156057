'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import dynamic from 'next/dynamic'

const DynamicAuthProvider = dynamic(
  () => import('@/context/AuthContext'),
  {
    ssr: false,
  }
)

const theme = extendTheme({
  colors: {
    brand: {
      primary: '#2d6a4f',
      secondary: '#40916c',
      accent: '#ffc300',
    },
  },
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <DynamicAuthProvider>
          {children}
        </DynamicAuthProvider>
      </ChakraProvider>
    </CacheProvider>
  )
}
