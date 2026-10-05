# FortunaPlay - Interview Preparation Guide

## 🎯 Project Overview

**FortunaPlay** is a chance-based gaming platform built with React.js, Node.js, Express, and MongoDB. The platform features two interactive games (Mines and Dice) with a virtual currency system, leaderboard functionality, and personalized user dashboards.

---

## 🏗️ Architecture Overview

### **Tech Stack**
- **Frontend**: React.js 18, React Router v6, Material-UI, Tailwind CSS, Axios, Chance.js
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT Authentication
- **Database**: MongoDB Atlas (Cloud)
- **Development**: Vite (Frontend), Nodemon (Backend)

### **Project Structure**

```
Backend:
├── index.js (Express server setup)
├── models/
│   ├── user.model.js (User schema)
│   └── bets.model.js (Bet history schema)
├── controllers/
│   ├── user.controller.js (Auth & user operations)
│   ├── bets.controller.js (Bet creation & history)
│   └── topusers.controller.js (Leaderboard)
├── routes/
│   ├── user.routes.js
│   └── bets.routes.js
├── middlewares/
│   └── authenticatejwt.js (JWT verification)
└── db/
    └── dbconnect.js (MongoDB connection)

Frontend:
├── src/
│   ├── App.jsx (Router setup)
│   ├── components/
│   │   ├── games/
│   │   │   ├── dice.jsx
│   │   │   └── mines.jsx
│   │   ├── landing.jsx (Public leaderboard)
│   │   ├── home.jsx (User dashboard)
│   │   └── [auth components]
│   └── custhook/ (Custom hooks for API calls)
```

---

## 🔑 Key Features & Implementation

### **1. Virtual Currency System (1000 Points)**
- **Implementation**: Default 1000 points on user registration
- **Regeneration**: Points reset to 1000 when depleted (handled client-side)
- **Storage**: Stored in MongoDB `User` model (`points` field)
- **Update Flow**: 
  - Client updates balance → `Balupdate` hook → `/api/update` endpoint → MongoDB update

**Code Reference**: `user.model.js` (line 13-16), `user.controller.js` (updateamt function)

### **2. Two Interactive Games**

#### **Dice Game**
- **Mechanics**: 
  - User selects probability threshold (2-98%)
  - Random number (0-100) generated using Chance.js
  - Win if random >= threshold
  - Multiplier calculated: `(1 - 0.01) / probability`
- **UI**: Material-UI Slider for probability selection
- **Betting**: User inputs bet amount (max = current points)

**Code Reference**: `dice.jsx`

#### **Mines Game**
- **Mechanics**:
  - 5x5 grid (25 cells)
  - 1 randomly placed mine
  - User reveals cells one by one
  - Multiplier increases as more cells are revealed: `25 / (remaining_cells + 1)`
  - Win by cashing out before hitting mine
  - Lose if mine is revealed
- **UI**: Grid-based interface with visual feedback

**Code Reference**: `mines.jsx`

### **3. Leaderboard Functionality**
- **Implementation**: 
  - Public endpoint: `/api/top` (GET)
  - Queries top 10 users by points (descending)
  - Displayed on landing page
- **Database Query**: `User.find().sort({points: -1}).limit(10)`

**Code Reference**: `topusers.controller.js`, `landing.jsx`

### **4. Personalized Dashboard**
- **Features**:
  - Game history (last 10 bets)
  - Total plays (wins + losses)
  - nt
  - Loss Win coucount
  - Current balance
  - Username display
- **Data Flow**:
  - Protected route with JWT authentication
  - Loads user data via `/api/safe` endpoint
  - Recent bets via `/api/bets/recent` endpoint

**Code Reference**: `home.jsx`, `user.controller.js` (safe route)

### **5. Authentication System**
- **JWT-based**: Token stored in HTTP-only cookies
- **Endpoints**:
  - `/api/register` (POST) - User registration
  - `/api/login` (GET) - User login
  - `/api/logout` (POST) - Clear cookie
- **Middleware**: `authenticateJwt` verifies token on protected routes
- **Security**: HTTP-only cookies prevent XSS attacks

**Code Reference**: `authenticatejwt.js`, `user.controller.js`

### **6. Bet History System**
- **Storage**: Each bet stored in `bets.model.js`
- **Fields**: `placedby` (User ref), `amount`, `game`, `multiplier`, `timestamps`
- **History Limit**: Maintains last 10 bets (auto-deletes older ones when >20)
- **Display**: Recent bets shown in user dashboard

**Code Reference**: `bets.controller.js`, `bets.model.js`

---

## 💡 Technical Decisions & Rationale

### **1. Why JWT with HTTP-only Cookies?**
- **Security**: HTTP-only cookies prevent JavaScript access (XSS protection)
- **Stateless**: No server-side session storage needed
- **Scalability**: Works across multiple servers

### **2. Why React Context for State Management?**
- **Scope**: Limited to user session data (points, wins, losses)
- **Simplicity**: No need for Redux for this use case
- **Performance**: Shared state between game components and dashboard

**Code Reference**: `home.jsx` (SharedContext)

### **3. Why Chance.js for Random Generation?**
- **Reliability**: Better than Math.random() for gaming
- **Seedable**: Can be extended for testing/debugging
- **Cross-platform**: Consistent randomness

### **4. Why MongoDB?**
- **Flexibility**: Easy schema evolution (user stats, bet history)
- **Relationships**: Simple references between User and Bet models
- **Scalability**: MongoDB Atlas for cloud hosting

### **5. Why Vite?**
- **Performance**: Fast HMR (Hot Module Replacement)
- **Modern**: ES modules support
- **Lightweight**: Faster builds than Create React App

---

## 🎤 Common Interview Questions & Answers

### **Q1: Walk me through your project architecture.**

**Answer**: 
"I built FortunaPlay as a full-stack MERN application. The frontend uses React with React Router for navigation, Material-UI and Tailwind for styling. The backend is Express.js with MongoDB for data persistence. I implemented JWT authentication using HTTP-only cookies for security. The application follows a RESTful API pattern with separate routes for user operations and betting operations. State management uses React Context API for sharing user session data across components."

### **Q2: How does the virtual currency system work?**

**Answer**:
"Each user starts with 1000 points upon registration, stored in the MongoDB User model. When a user places a bet, the points are deducted immediately. If they win, the winnings (bet amount × multiplier) are added back. The balance is updated in real-time on the frontend and synced with the backend via the `/api/update` endpoint. When points reach zero, the system can regenerate them to 1000 points."

### **Q3: Explain the game mechanics for both games.**

**Answer**:
"**Dice Game**: Users select a probability threshold between 2-98% using a slider. A random number (0-100) is generated. If the random number is greater than or equal to the threshold, the user wins. The multiplier is calculated as `(1 - house edge) / probability`, so lower probabilities yield higher multipliers.

**Mines Game**: A 5lier increases as more safe cells are revealed (formula: `25 / (remaining_cells + 1)`). Users can cash out at any time to wx5 grid contains one randomly placed mine. Users reveal cells one by one. The multipin, or lose if they reveal the mine."

### **Q4: How did you implement the leaderboard?**

**Answer**:
"I created a public GET endpoint `/api/top` that queries the User collection, sorts by points in descending order, and limits results to 10 users. This endpoint is called on the landing page load using React Router's loader function. The data is displayed in a table showing username and points."

### **Q5: How do you handle authentication and authorization?**

**Answer**:
"I use JWT tokens stored in HTTP-only cookies. When a user registers or logs in, a JWT is generated with their username and password, then set as an HTTP-only cookie. For protected routes, I created an `authenticateJwt` middleware that verifies the token from cookies, extracts user data, and attaches it to the request object. This prevents XSS attacks since JavaScript cannot access HTTP-only cookies."

### **Q6: What security measures did you implement?**

**Answer**:
"1. **HTTP-only cookies** for JWT storage (XSS protection)
2. **CORS configuration** to restrict API access to frontend origin only
3. **JWT verification** on all protected routes
4. **Input validation** on bet amounts (cannot exceed current balance)
5. **Error handling** with try-catch blocks to prevent information leakage"

### **Q7: How do you track game history?**

**Answer**:
"Every bet is stored in a separate `Bet` model with references to the user, bet amount, game type, multiplier, and timestamp. When a user places a bet, it's created via the `/api/bets/create` endpoint. The system maintains the last 10 bets by automatically deleting older entries when the count exceeds 20. The dashboard fetches recent bets via `/api/bets/recent` endpoint."

### **Q8: What challenges did you face and how did you solve them?**

**Answer**:
"**Challenge 1**: State synchronization between game components and dashboard
- **Solution**: Used React Context API to share user state (points, wins, losses) across components

**Challenge 2**: Real-time balance updates
- **Solution**: Created custom hooks (`Balupdate`) that sync balance changes to backend immediately after each game action

**Challenge 3**: Maintaining bet history without database bloat
- **Solution**: Implemented automatic cleanup logic that keeps only the last 10 bets per user"

### **Q9: How would you scale this application?**

**Answer**:
"1. **Database**: Add indexes on `points` field for faster leaderboard queries, implement pagination
2. **Caching**: Use Redis to cache leaderboard data (updates every few minutes)
3. **Load Balancing**: Deploy multiple backend instances behind a load balancer
4. **CDN**: Serve static frontend assets via CDN
5. **WebSockets**: For real-time leaderboard updates instead of polling
6. **Database Sharding**: If user base grows significantly, shard by user ID"

### **Q10: What improvements would you make?**

**Answer**:
"1. **Password Hashing**: Currently passwords are stored in plain text - would implement bcrypt
2. **Input Validation**: Add server-side validation using libraries like Joi or express-validator
3. **Error Handling**: More specific error messages and proper HTTP status codes
4. **Testing**: Add unit tests for game logic and integration tests for API endpoints
5. **Rate Limiting**: Prevent API abuse with rate limiting middleware
6. **Environment Variables**: Move secrets (JWT key, DB connection) to environment variables
7. **TypeScript**: Migrate to TypeScript for better type safety
8. **Responsive Design**: Improve mobile experience"

---

## 🔍 Code Walkthrough Points

### **Backend Highlights**

1. **User Model** (`user.model.js`):
   - Schema with username (unique), password, points (default 1000), wins, losses
   - Timestamps enabled for created/updated tracking

2. **Bet Model** (`bets.model.js`):
   - References User via ObjectId
   - Stores game type, amount, multiplier
   - Timestamps for chronological ordering

3. **Authentication Middleware** (`authenticatejwt.js`):
   - Extracts token from cookies
   - Verifies with JWT secret
   - Attaches user data to request object

4. **Bet History Cleanup** (`bets.controller.js` lines 16-27):
   - Maintains last 10 bets per user
   - Deletes oldest bets when count > 20

### **Frontend Highlights**

1. **React Router Setup** (`App.jsx`):
   - Uses loader functions for data fetching
   - Nested routes for games under `/home`
   - Error boundaries for error handling

2. **Context API** (`home.jsx`):
   - SharedContext provides user state to all child components
   - Avoids prop drilling

3. **Dice Game Logic** (`dice.jsx`):
   - Dynamic multiplier calculation based on probability
   - Real-time balance updates
   - Input validation (cannot bet more than balance)

4. **Mines Game Logic** (`mines.jsx`):
   - 2D array state management for grid
   - Dynamic multiplier increases with each safe reveal
   - Reset functionality after win/loss

---

## 🚀 Deployment Considerations

### **Current Setup**
- Frontend: `localhost:5173` (Vite dev server)
- Backend: `localhost:4000` (Express)
- Database: MongoDB Atlas (cloud)

### **Production Deployment**
- Frontend: Vercel, Netlify, or AWS S3 + CloudFront
- Backend: Heroku, AWS EC2, or Railway
- Environment variables for:
  - MongoDB connection string
  - JWT secret key
  - CORS origin URLs
  - Port numbers

---

## 📝 Quick Reference: API Endpoints

### **User Routes** (`/api`)
- `POST /register` - Register new user
- `GET /login` - Login user
- `POST /logout` - Logout user
- `GET /top` - Get top 10 users (public)
- `GET /safe` - Get current user data (protected)
- `POST /update` - Update user balance (protected)
- `POST /win` - Update win count (protected)
- `POST /loss` - Update loss count (protected)

### **Bet Routes** (`/api/bets`)
- `POST /create` - Create new bet (protected)
- `POST /recent` - Get recent bets (protected)

---

## ✅ Final Checklist Before Interview

- [ ] Understand every line of code in your project
- [ ] Be able to explain why you made each technical decision
- [ ] Know the database schema and relationships
- [ ] Understand the authentication flow
- [ ] Be ready to discuss improvements and scaling
- [ ] Have the project running locally (if asked to demo)
- [ ] Know the exact tech stack versions
- [ ] Be prepared to write code snippets (game logic, API endpoints)

---

## 🎯 Key Talking Points

1. **Full-stack capability**: Built both frontend and backend from scratch
2. **Security awareness**: Implemented JWT with HTTP-only cookies
3. **State management**: Used Context API appropriately for the use case
4. **Database design**: Proper schema design with references
5. **User experience**: Real-time updates, responsive UI
6. **Code organization**: Separated concerns (models, controllers, routes)
7. **Error handling**: Try-catch blocks throughout
8. **Modern stack**: React 18, Express, MongoDB, Vite

---

**Good luck with your interview! 🚀**

