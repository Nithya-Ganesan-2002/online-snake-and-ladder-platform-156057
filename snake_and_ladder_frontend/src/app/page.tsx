'use client'

import { Box, Flex, Heading } from '@chakra-ui/react'
import { GameBoard } from '@/components/GameBoard'
import { GameControls } from '@/components/GameControls'
import { PlayerList } from '@/components/PlayerList'
import { AuthForms } from '@/components/AuthForms'
import { LoadingState } from '@/components/LoadingState'
import { useAuth } from '@/context/AuthContext'
import { useEffect, useState } from 'react'

export default function Home() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <LoadingState />
  }

  if (!user) {
    return <AuthForms />
  }

  return (
    <Box minH="100vh" bg="gray.50" p={4}>
      <Heading
        textAlign="center"
        color="brand.primary"
        mb={8}
        fontSize="3xl"
      >
        Snake and Ladder Game
      </Heading>
      
      <Flex
        className="game-container"
        alignItems="flex-start"
        gap={8}
      >
        <Box flex={1}>
          <GameBoard />
          <Box mt={4}>
            <GameControls />
          </Box>
        </Box>
        
        <Box w="300px">
          <PlayerList />
        </Box>
      </Flex>
    </Box>
  )
}
