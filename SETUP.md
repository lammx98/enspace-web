# EnSpace - English Learning Platform

A modern English learning web application built with Next.js 15, featuring gamification, progress tracking, and interactive quizzes.

## 🚀 Features

### Authentication
- ✅ Email/Password login
- ✅ Google OAuth login
- ✅ JWT token authentication with refresh tokens
- ✅ Protected routes with authentication middleware
- ✅ Automatic token refresh

### Learning Features
- ✅ Topic-based learning paths
- ✅ Lesson management system
- ✅ Word vocabulary with translations and examples
- ✅ Interactive quiz game with multiple choice questions
- ✅ Real-time progress tracking
- ✅ Spaced repetition learning system

### Gamification
- ✅ XP (Experience Points) system
- ✅ Daily streak tracking
- ✅ Hearts/Lives system
- ✅ Level progression
- ✅ Leaderboard (UI ready)
- ✅ Achievements and badges (UI ready)

### UI/UX
- ✅ Beautiful gradient backgrounds
- ✅ Smooth animations with Framer Motion
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Modern shadcn/ui components
- ✅ Tailwind CSS styling

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **State Management**: Zustand
- **API Client**: Axios (OpenAPI generated)
- **Authentication**: JWT with cookies-next

## 📋 Prerequisites

Before running the application, make sure you have:

1. Node.js 18+ installed
2. Backend services running:
   - genzy-auth (port 5000)
   - enspace-content (port 5001)
   - enspace-progress (port 5002)

## 🔧 Installation

1. Clone the repository
```bash
cd c:\Source\genzy\services\enspace-web
```

2. Install dependencies
```bash
npm install --legacy-peer-deps
```

3. Configure environment variables

Create a `.env.local` file in the root directory:

```env
# API URLs for client-side
NEXT_PUBLIC_API_AUTH_URL=http://localhost:5000
NEXT_PUBLIC_API_CONTENT_URL=http://localhost:5001
NEXT_PUBLIC_API_PROGRESS_URL=http://localhost:5002

# API URLs for server-side
API_AUTH_URL=http://localhost:5000
API_CONTENT_URL=http://localhost:5001
API_PROGRESS_URL=http://localhost:5002
```

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Production Build

```bash
npm run build
npm start
```

## 📁 Project Structure

```
enspace-web/
├── app/                          # Next.js App Router
│   ├── (authorized)/            # Protected routes
│   │   ├── layout.tsx           # Auth guard layout
│   │   ├── page.tsx             # Main dashboard/learning page
│   │   └── learn/               # Learning path pages
│   ├── (unauthorized)/          # Public routes
│   │   └── login/               # Login page
│   ├── auth/                    # Auth callbacks
│   │   └── callback/            # OAuth callback
│   ├── layout.tsx               # Root layout
│   └── app-provider.tsx         # App-level providers
├── api/                         # Generated API clients
│   ├── genzy-auth/             # Authentication API
│   ├── enspace-content/        # Content management API
│   └── enspace-progress/       # Progress tracking API
├── components/                  # React components
│   ├── ui/                     # shadcn/ui components
│   ├── TopicSelection.tsx      # Topic selection screen
│   ├── LearningPath.tsx        # Lesson path display
│   ├── QuizGame.tsx            # Interactive quiz
│   ├── GameHeader.tsx          # Header with stats
│   ├── DashboardHeader.tsx     # Dashboard header
│   └── ...
├── contexts/                    # React contexts
│   └── auth-context.tsx        # Authentication context
├── hooks/                       # Custom hooks
│   └── use-app.ts             # App state hook
├── lib/                        # Utility functions
│   ├── auth.ts                # Auth utilities
│   ├── setup-api-client.ts   # API client setup
│   └── setup-api-server.ts   # API server setup
└── public/                     # Static assets
```

## 🔐 Authentication Flow

1. **Login**:
   - User enters credentials or uses Google OAuth
   - Backend returns JWT token and refresh token
   - Tokens are stored in HTTP-only cookies

2. **Protected Routes**:
   - All routes under `(authorized)` require authentication
   - AuthContext checks token validity
   - Redirects to login if not authenticated

3. **Token Refresh**:
   - Automatic token refresh before expiration
   - Uses refresh token to get new access token

4. **Logout**:
   - Clears all auth cookies
   - Redirects to login page

## 📚 API Integration

The application integrates with three backend services:

### 1. genzy-auth (Authentication Service)
- User registration
- Login (email/password)
- Google OAuth
- Token refresh
- User profile

### 2. enspace-content (Content Service)
- Topics management
- Lessons by topic
- Words vocabulary
- Word translations and examples

### 3. enspace-progress (Progress Service)
- Learning progress tracking
- Study sessions
- Review system (spaced repetition)
- User statistics (streak, XP, level)

## 🎮 Features Implementation

### Quiz Game
- Fetches words from selected lesson
- Generates multiple choice questions
- Tracks correct/incorrect answers
- Updates progress via API
- Shows feedback and explanations

### Progress Tracking
- Tracks each word learned
- Implements spaced repetition algorithm
- Records review sessions
- Calculates daily XP and streak

### Dashboard
- Displays user statistics
- Shows current streak
- Daily XP progress bar
- Level and rank display

## 🎨 UI Components

The application uses shadcn/ui components:
- Buttons, Cards, Dialogs
- Dropdown Menus
- Avatars, Badges
- Progress bars
- Input fields
- And more...

## 🔄 State Management

- **Zustand**: For app-level state (active topic)
- **React Context**: For authentication state
- **React Hooks**: For component-level state

## 📱 Responsive Design

The application is fully responsive:
- Mobile: Optimized layout, touch-friendly
- Tablet: Adaptive grid layout
- Desktop: Full feature display with leaderboard

## 🚧 Development

### Adding New Features

1. **New API Endpoint**:
   - Regenerate API clients using openapi-typescript-codegen
   ```bash
   npx openapi --input http://localhost:5001/openapi/v1.json --output api/enspace-content --client axios --useOptions
   ```

2. **New Component**:
   - Create component in `components/`
   - Import and use in pages

3. **New Page**:
   - Add route in `app/` directory
   - Use file-based routing

## 🐛 Troubleshooting

### API Connection Issues
- Ensure all backend services are running
- Check API URLs in `.env.local`
- Verify CORS settings on backend

### Authentication Issues
- Clear browser cookies
- Check token expiration
- Verify JWT secret matches backend

### Build Errors
- Run `npm install --legacy-peer-deps`
- Clear `.next` folder and rebuild
- Check Node.js version compatibility

## 📄 License

This project is private and confidential.

## 👨‍💻 Author

EnSpace Development Team

---

**Happy Learning! 📚✨**
