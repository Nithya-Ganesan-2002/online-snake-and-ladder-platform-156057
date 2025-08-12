# Supabase Integration

## Overview
The Snake and Ladder game frontend integrates with Supabase for user authentication and real-time game state management.

## Environment Variables
The following environment variables are required for Supabase integration:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Authentication
- User signup with email/password
- Email verification with magic link
- User signin with email/password
- Session management

## Database Schema Requirements
### Users Table
- id: uuid (primary key)
- email: string
- created_at: timestamp
- last_sign_in: timestamp

### Games Table
- id: uuid (primary key)
- created_at: timestamp
- status: enum ('waiting', 'in_progress', 'completed')
- winner_id: uuid (foreign key to users.id)

### Game_Players Table
- id: uuid (primary key)
- game_id: uuid (foreign key to games.id)
- user_id: uuid (foreign key to users.id)
- position: integer
- turn_order: integer
- joined_at: timestamp

### Leaderboard View
```sql
CREATE VIEW leaderboard AS
SELECT 
  u.id,
  u.email,
  COUNT(g.id) FILTER (WHERE g.winner_id = u.id) as wins,
  COUNT(g.id) as total_games,
  ROUND(COUNT(g.id) FILTER (WHERE g.winner_id = u.id)::numeric / NULLIF(COUNT(g.id), 0) * 100, 2) as win_percentage
FROM users u
LEFT JOIN game_players gp ON u.id = gp.user_id
LEFT JOIN games g ON gp.game_id = g.id AND g.status = 'completed'
GROUP BY u.id, u.email
ORDER BY wins DESC, win_percentage DESC;
```

## Real-time Subscriptions
- Game state changes
- Player movements
- Turn updates
- Chat messages

## Security Rules
- Only authenticated users can create/join games
- Only game participants can update game state
- Public read access for leaderboard
- Protected write access for game moves

## API Integration Points
1. Authentication:
   - signUp: Create new user account
   - signIn: Authenticate existing user
   - signOut: End user session

2. Game Management:
   - createGame: Start new game session
   - joinGame: Join existing game
   - updateGameState: Update game progress
   - endGame: Complete game and update scores

3. Real-time Updates:
   - subscribeToGameChanges: Listen for game state updates
   - subscribeToPlayerMoves: Track player positions
   - subscribeToChatMessages: Real-time chat updates
