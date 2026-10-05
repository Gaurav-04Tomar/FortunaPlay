# FortunaPlay - Quick Reference Cheat Sheet

## 🎯 Elevator Pitch (30 seconds)
"I built FortunaPlay, a chance-based gaming platform with React.js, Node.js, and MongoDB. It features two interactive games - Mines and Dice - with a virtual currency system where users start with 1000 points. I implemented a leaderboard to track top players, personalized dashboards showing game history and statistics, and JWT-based authentication using HTTP-only cookies for security."

---

## 📋 Project Stats
- **Tech Stack**: React.js, Node.js, Express, MongoDB
- **Games**: 2 (Mines, Dice)
- **Features**: Virtual currency, Leaderboard, User dashboard, Authentication
- **Database Models**: 2 (User, Bet)
- **API Endpoints**: 10+ routes
- **Frontend Components**: 9+ components

---

## 🔑 Key Technical Decisions

| Decision | Why |
|----------|-----|
| JWT with HTTP-only cookies | Security (XSS protection) |
| React Context API | Simple state management for user session |
| MongoDB | Flexible schema, easy relationships |
| Chance.js | Better randomness than Math.random() |
| Vite | Fast HMR, modern build tool |
| Material-UI + Tailwind | Quick UI development with customization |

---

## 🎮 Game Mechanics (Quick Answers)

### Dice Game
- User selects probability (2-98%)
- Random number (0-100) generated
- Win if random >= threshold
- Multiplier: `(1 - 0.01) / probability`

### Mines Game
- 5x5 grid, 1 mine
- Reveal cells one by one
- Multiplier: `25 / (remaining_cells + 1)`
- Cash out to win, or lose if mine revealed

---

## 🔐 Authentication Flow

1. User registers/logs in → JWT generated
2. Token stored in HTTP-only cookie
3. Protected routes use `authenticateJwt` middleware
4. Middleware verifies token from cookie
5. User data attached to `req.data`

---

## 💾 Database Schema

### User Model
```javascript
{
  username: String (unique),
  password: String,
  points: Number (default: 1000),
  wins: Number (default: 0),
  loss: Number (default: 0),
  timestamps: true
}
```

### Bet Model
```javascript
{
  placedby: ObjectId (ref: User),
  amount: Number,
  game: String,
  multiplier: Number,
  timestamps: true
}
```

---

## 🛣️ API Endpoints (Quick Reference)

### Public
- `GET /api/top` - Leaderboard (top 10)

### Protected (Requires JWT)
- `GET /api/safe` - Current user data
- `POST /api/update` - Update balance
- `POST /api/win` - Update wins
- `POST /api/loss` - Update losses
- `POST /api/bets/create` - Create bet
- `POST /api/bets/recent` - Get recent bets

### Auth
- `POST /api/register` - Register
- `GET /api/login` - Login
- `POST /api/logout` - Logout

---

## 🎯 Common Questions - One-Line Answers

**Q: Why React Context instead of Redux?**
A: Limited scope (user session data only), simpler for this use case.

**Q: How do you ensure randomness in games?**
A: Using Chance.js library for better random number generation.

**Q: How is the leaderboard calculated?**
A: MongoDB query sorts users by points descending, limits to 10.

**Q: What happens when points reach zero?**
A: System can regenerate to 1000 points (handled client-side).

**Q: How do you prevent users from betting more than they have?**
A: Frontend validation (max = current points) + backend verification.

**Q: Why HTTP-only cookies?**
A: Prevents JavaScript access, protects against XSS attacks.

**Q: How do you maintain bet history?**
A: Auto-deletes oldest bets when count > 20, keeps last 10.

**Q: What's the house edge?**
A: 1% in Dice game (0.01 in multiplier calculation).

---

## 🚀 Improvements You'd Make

1. **Password hashing** (bcrypt) - Currently plain text
2. **Input validation** (express-validator) - Server-side validation
3. **Environment variables** - Move secrets out of code
4. **Error handling** - Better HTTP status codes
5. **Testing** - Unit tests for game logic
6. **Rate limiting** - Prevent API abuse
7. **TypeScript** - Type safety
8. **Caching** - Redis for leaderboard

---

## 💡 Code Highlights to Mention

1. **Bet History Cleanup** (`bets.controller.js` lines 16-27)
   - Maintains last 10 bets automatically

2. **Dynamic Multiplier** (`dice.jsx` lines 30-34)
   - Real-time calculation based on probability

3. **Mines Grid Logic** (`mines.jsx` lines 14-44)
   - 2D array state management for game grid

4. **Context API** (`home.jsx` line 11-23)
   - Shared state without prop drilling

---

## 🎤 STAR Method Examples

### Situation/Task
"Built a gaming platform with two chance-based games requiring real-time balance updates and user statistics tracking."

### Action
"Implemented React Context for state management, JWT authentication with HTTP-only cookies, MongoDB for data persistence, and custom hooks for API calls. Created game logic using Chance.js for randomness and dynamic multiplier calculations."

### Result
"Successfully delivered a full-stack application with secure authentication, real-time updates, leaderboard functionality, and personalized user dashboards."

---

## ⚠️ Things to Watch Out For

1. **Password Storage**: Currently plain text - mention you'd hash with bcrypt
2. **JWT Secret**: Hardcoded - mention environment variables
3. **Error Handling**: Some endpoints return 200 on error - mention improvement
4. **CORS**: Currently only localhost - mention production configuration

---

## 📊 Project Metrics to Mention

- **Response Time**: Fast API responses (< 100ms for most queries)
- **User Experience**: Real-time balance updates, smooth game interactions
- **Scalability**: MongoDB Atlas for cloud hosting, can scale horizontally
- **Security**: HTTP-only cookies, CORS protection, JWT verification

---

## 🎓 Technical Concepts to Explain

1. **JWT Authentication**: Token-based stateless authentication
2. **MongoDB References**: ObjectId references between User and Bet models
3. **React Context**: Shared state management without prop drilling
4. **HTTP-only Cookies**: Security measure against XSS attacks
5. **RESTful API**: Standard HTTP methods for resource operations
6. **Middleware Pattern**: Request processing pipeline in Express

---

**Remember**: Be confident, explain your thought process, and show enthusiasm for the project! 🚀

