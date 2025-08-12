'use client'

import { Box, Button, HStack } from '@chakra-ui/react'
import { Dice } from './Dice'
import { useGameStore } from '@/store/gameStore'

export const GameControls = () => {
  const { gameStarted, startGame, resetGame } = useGameStore()

  return (
    <Box
      p={4}
      bg="white"
      borderRadius="md"
      shadow="sm"
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap={4}
    >
      {!gameStarted ? (
        <Button
          colorScheme="green"
          onClick={startGame}
        >
          Start Game
        </Button>
      ) : (
        <HStack spacing={4}>
          <Dice />
          <Button
            colorScheme="red"
            variant="outline"
            onClick={resetGame}
          >
            Reset Game
          </Button>
        </HStack>
      )}
    </Box>
  )
}
