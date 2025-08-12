import { create } from 'zustand'

interface Player {
  id: string
  name: string
  position: number
  color: string
}

interface GameState {
  players: Player[]
  currentPlayer: string | null
  diceValue: number
  isRolling: boolean
  gameStarted: boolean
  winner: string | null
  addPlayer: (player: Player) => void
  removePlayer: (playerId: string) => void
  setDiceValue: (value: number) => void
  setIsRolling: (rolling: boolean) => void
  movePlayer: (playerId: string, newPosition: number) => void
  setCurrentPlayer: (playerId: string) => void
  startGame: () => void
  setWinner: (playerId: string) => void
  resetGame: () => void
}

export const useGameStore = create<GameState>((set) => ({
  players: [],
  currentPlayer: null,
  diceValue: 1,
  isRolling: false,
  gameStarted: false,
  winner: null,

  addPlayer: (player) =>
    set((state) => ({ players: [...state.players, player] })),

  removePlayer: (playerId) =>
    set((state) => ({
      players: state.players.filter((p) => p.id !== playerId),
    })),

  setDiceValue: (value) => set({ diceValue: value }),

  setIsRolling: (rolling) => set({ isRolling: rolling }),

  movePlayer: (playerId, newPosition) =>
    set((state) => ({
      players: state.players.map((p) =>
        p.id === playerId ? { ...p, position: newPosition } : p
      ),
    })),

  setCurrentPlayer: (playerId) => set({ currentPlayer: playerId }),

  startGame: () => set({ gameStarted: true }),

  setWinner: (playerId) => set({ winner: playerId }),

  resetGame: () =>
    set({
      players: [],
      currentPlayer: null,
      diceValue: 1,
      isRolling: false,
      gameStarted: false,
      winner: null,
    }),
}))
