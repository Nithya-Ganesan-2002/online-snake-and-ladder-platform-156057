'use client'

import { useEffect, useRef } from 'react'
import { Box } from '@chakra-ui/react'
import { useGameStore } from '@/store/gameStore'

const BOARD_SIZE = 10
const CELL_SIZE = 60

export const GameBoard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { players } = useGameStore()


  const drawBoard = (ctx: CanvasRenderingContext2D) => {
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        const x = j * CELL_SIZE
        const y = (BOARD_SIZE - 1 - i) * CELL_SIZE
        
        // Alternate cell colors
        ctx.fillStyle = (i + j) % 2 === 0 ? '#f0f0f0' : '#ffffff'
        ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE)
        
        // Draw cell borders
        ctx.strokeStyle = '#e5e5e5'
        ctx.strokeRect(x, y, CELL_SIZE, CELL_SIZE)

        // Draw cell numbers
        ctx.fillStyle = '#666666'
        ctx.font = '14px Arial'
        const cellNumber = i * BOARD_SIZE + j + 1
        ctx.fillText(
          cellNumber.toString(),
          x + 5,
          y + CELL_SIZE - 5
        )
      }
    }
  }

  const drawSnakesAndLadders = (ctx: CanvasRenderingContext2D) => {
    // Snakes (red)
    const snakes = [
      { from: 98, to: 28 },
      { from: 95, to: 75 },
      { from: 92, to: 88 },
      { from: 83, to: 22 },
      { from: 73, to: 51 },
      { from: 69, to: 33 },
      { from: 64, to: 36 },
      { from: 59, to: 17 },
      { from: 55, to: 7 },
      { from: 52, to: 11 },
      { from: 48, to: 9 },
      { from: 46, to: 5 },
      { from: 44, to: 22 }
    ]

    // Ladders (green)
    const ladders = [
      { from: 8, to: 30 },
      { from: 21, to: 42 },
      { from: 28, to: 76 },
      { from: 50, to: 67 },
      { from: 71, to: 92 },
      { from: 80, to: 99 }
    ]

    // Draw snakes
    snakes.forEach(({ from, to }) => {
      drawConnection(ctx, from, to, '#ff0000')
    })

    // Draw ladders
    ladders.forEach(({ from, to }) => {
      drawConnection(ctx, from, to, '#00ff00')
    })
  }

  const drawConnection = (
    ctx: CanvasRenderingContext2D,
    from: number,
    to: number,
    color: string
  ) => {
    const fromCoord = getCoordinatesForNumber(from)
    const toCoord = getCoordinatesForNumber(to)

    ctx.beginPath()
    ctx.moveTo(
      fromCoord.x + CELL_SIZE / 2,
      fromCoord.y + CELL_SIZE / 2
    )
    ctx.lineTo(
      toCoord.x + CELL_SIZE / 2,
      toCoord.y + CELL_SIZE / 2
    )
    ctx.strokeStyle = color
    ctx.lineWidth = 3
    ctx.stroke()
  }

  const getCoordinatesForNumber = (num: number) => {
    num -= 1 // Convert to 0-based index
    const row = Math.floor(num / BOARD_SIZE)
    const col = num % BOARD_SIZE
    return {
      x: col * CELL_SIZE,
      y: (BOARD_SIZE - 1 - row) * CELL_SIZE
    }
  }

  const drawPlayers = (ctx: CanvasRenderingContext2D) => {
    players.forEach((player) => {
      const coord = getCoordinatesForNumber(player.position)
      
      // Draw player token
      ctx.beginPath()
      ctx.arc(
        coord.x + CELL_SIZE / 2,
        coord.y + CELL_SIZE / 2,
        CELL_SIZE / 4,
        0,
        2 * Math.PI
      )
      ctx.fillStyle = player.color
      ctx.fill()
      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = 2
      ctx.stroke()
    })
  }

  return (
    <Box
      className="game-board"
      position="relative"
      width={BOARD_SIZE * CELL_SIZE}
      height={BOARD_SIZE * CELL_SIZE}
    >
      <canvas
        ref={canvasRef}
        width={BOARD_SIZE * CELL_SIZE}
        height={BOARD_SIZE * CELL_SIZE}
      />
    </Box>
  )
}
