'use client'

import { useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  useToast,
} from '@chakra-ui/react'
import { useAuth } from '@/context/AuthContext'

export const AuthForms = () => {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { signIn, signUp } = useAuth()
  const toast = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isSignUp) {
        await signUp(email, password)
        toast({
          title: 'Check your email',
          description: 'We sent you a confirmation link.',
          status: 'success',
        })
      } else {
        await signIn(email, password)
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: (error as Error).message,
        status: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={8}
      p={6}
      borderRadius="lg"
      boxShadow="lg"
      bg="white"
    >
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <Text
            fontSize="2xl"
            fontWeight="bold"
            color="brand.primary"
          >
            {isSignUp ? 'Create Account' : 'Sign In'}
          </Text>

          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="green"
            width="full"
            isLoading={loading}
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>

          <Button
            variant="link"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp
              ? 'Already have an account? Sign In'
              : "Don't have an account? Sign Up"}
          </Button>
        </VStack>
      </form>
    </Box>
  )
}
