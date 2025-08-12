'use client'

import { Button } from '@chakra-ui/react'
import { useGameStore } from '@/store/gameStore'

export const Dice = () => {
  const { diceValue, setDiceValue, isRolling, setIsRolling } = useGameStore()

  const rollDice = () => {
    if (isRolling) return

    setIsRolling(true)
    
    // Animate dice roll
    let rolls = 0
    const maxRolls = 10
    const rollInterval = setInterval(() => {
      const newValue = Math.floor(Math.random() * 6) + 1
      setDiceValue(newValue)
      
      rolls++
      if (rolls >= maxRolls) {
        clearInterval(rollInterval)
        setIsRolling(false)
      }
    }, 100)
  }

  return (
    <Button
      className="dice"
      onClick={rollDice}
      isDisabled={isRolling}
      bg="white"
      border="2px"
      borderColor="brand.primary"
      color="brand.primary"
      w="60px"
      h="60px"
      borderRadius="md"
      _hover={{ transform: 'scale(1.05)' }}
    >
      {diceValue}
    </Button>
  )
}
