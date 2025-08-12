'use client'

import {
  Box,
  Text,
  List,
  ListItem,
  Badge
} from '@chakra-ui/react'
import { useGameStore } from '@/store/gameStore'

export const PlayerList = () => {
  const { players, currentPlayer } = useGameStore()

  return (
    <Box className="sidebar">
      <Text
        fontSize="xl"
        fontWeight="bold"
        mb={4}
        color="brand.primary"
      >
        Players
      </Text>
      <List spacing={3}>
        {players.map((player) => (
          <ListItem
            key={player.id}
            p={3}
            bg={
              currentPlayer === player.id
                ? 'brand.primary'
                : 'gray.50'
            }
            color={
              currentPlayer === player.id
                ? 'white'
                : 'gray.800'
            }
            borderRadius="md"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text>{player.name}</Text>
            <Badge
              colorScheme={
                currentPlayer === player.id
                  ? 'green'
                  : 'gray'
              }
            >
              Position: {player.position}
            </Badge>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
